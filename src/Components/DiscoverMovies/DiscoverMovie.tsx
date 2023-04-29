import { FC, useEffect, useState } from "react";
import "./DiscoverMovie.scss";
import Movie from "./Movie";
import { PropagateLoader, RiseLoader } from "react-spinners";
import React from "react";
import useGetDiscoverMovies, { ICutPages } from "./useGetDiscoverMovies";
import { useLocation, useNavigate } from "react-router-dom";

interface DiscoverMovieProps {}

const DiscoverMovie: FC<DiscoverMovieProps> = () => {
  const {
    genres,
    selectedGenreIds,
    setSelectedGenreIds,
    movies,
    setSortSelecting,
    sortSelecting,
    loading,
    setLoading,
    currentPage,
    setCurrentPage,
    moviesPerPage,
    cutPages,
    setCutPages,
    primaryRelease,
    setPrimaryRelease,
    primaryReleaseAccept,
    setPrimaryReleaseAccept,
  } = useGetDiscoverMovies();
  //   const selectedGenres = genres?.genres.filter((gen) =>
  // 	selectedGenreIds.includes(gen.id)
  //   );
  //   const selectedGenreNames = selectedGenres?.map((gen) => gen.name);
  //   console.log(selectedGenreNames);
  const handlerAddingGenreIds = (genreId: number): void => {
    if (selectedGenreIds.includes(genreId)) {
      setSelectedGenreIds(selectedGenreIds.filter((id) => id !== genreId));
    } else {
      setSelectedGenreIds([...selectedGenreIds, genreId]);
    }
  };
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const genre = searchParams.get("genres")?.split(",").map(Number) || [];
    const resultsSorting = searchParams.get("sort_results_by") || "";
    const primaryReleaseState = searchParams.get("primary_release") || "";
    if (genre.length) {
      setSelectedGenreIds(genre);
      setSortSelecting(resultsSorting);
      setPrimaryRelease(primaryReleaseState);
    }
    if (genre.length) {
      setSelectedGenreIds(genre);
    }
    if (primaryReleaseState.length) {
      setPrimaryRelease(primaryReleaseState);
    }
    if (resultsSorting.length) {
      setSortSelecting(resultsSorting);
    }
  }, [location.search]);

  useEffect(() => {
    if (sortSelecting.length > 0 && selectedGenreIds.length > 0) {
      navigate(
        `/discover/movie?sort_results_by=${sortSelecting}&genres=${selectedGenreIds}${
          primaryRelease.length ? `&primary_release=${primaryRelease}` : ""
        }`
      );
    } else if (sortSelecting.length > 0 && selectedGenreIds.length > 0) {
      navigate(
        `/discover/movie?sort_results_by=${sortSelecting}&genres=${selectedGenreIds}`
      );
    } else if (primaryRelease.length > 0 && sortSelecting.length > 0) {
      navigate(
        `/discover/movie?sort_results_by=${sortSelecting}&primary_release=${primaryRelease}`
      );
    } else if (selectedGenreIds.length > 0 && primaryRelease.length > 0) {
      navigate(
        `/discover/movie?genres=${selectedGenreIds}&primary_release=${primaryRelease}`
      );
    } else if (sortSelecting.length > 0) {
      navigate(`/discover/movie?sort_results_by=${sortSelecting}`);
    } else if (selectedGenreIds.length > 0) {
      navigate(`/discover/movie?genres=${selectedGenreIds}`);
    } else if (primaryRelease.length > 0) {
      navigate(`/discover/movie?primary_release=${primaryRelease}`);
    } else {
      navigate(`/discover/movie`);
    }
  }, [
    selectedGenreIds,
    location.search,
    sortSelecting,
    primaryReleaseAccept,
    sortSelecting.length || selectedGenreIds.length ? "" : primaryRelease,
  ]);

  return (
    <div className="DiscoverMovie">
      <div className="DiscoverMovieContainer">
        <div className="leftSide">
          <div className="Sort">
            <div className="sortResultsBy">
              <h3>Sort Results By:</h3>
              <select
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setSortSelecting(e.target.value),
                    setLoading(true),
                    setCurrentPage(1);
                }}
              >
                <option
                  selected={sortSelecting === "popularity.desc" ? true : false}
                  value="popularity.desc"
                >
                  Popularity
                </option>
                <option
                  selected={sortSelecting === "revenue.desc" ? true : false}
                  value="revenue.desc"
                >
                  Revenue
                </option>

                <option
                  selected={sortSelecting === "vote_count.desc" ? true : false}
                  value="vote_count.desc"
                >
                  Top Rating
                </option>
              </select>
            </div>
          </div>
          <div className="Filters">
            <div className="genres">
              <h3>Genres:</h3>
              <ul>
                {genres?.genres.length ? (
                  genres?.genres.map((genre) => (
                    <li
                      style={{
                        backgroundColor: selectedGenreIds.includes(genre.id)
                          ? "#2dc6f5"
                          : "",
                      }}
                      onClick={() => {
                        handlerAddingGenreIds(genre.id),
                          setLoading(true),
                          setCurrentPage(1);
                      }}
                      key={genre.id}
                    >
                      {genre.name}
                    </li>
                  ))
                ) : (
                  <div className="loadingGenres">
                    <RiseLoader color="#33d5eb" size={20} />
                  </div>
                )}
              </ul>
            </div>
            <div className="primaryReleaseYear">
              <button
                disabled={primaryRelease === "" ? true : false}
                style={{
                  backgroundColor: primaryReleaseAccept ? "#8dbae8" : "#506cd3",
                }}
                onClick={() => {
                  setPrimaryRelease(""),
                    setPrimaryReleaseAccept((prev: boolean) => !prev),
                    setLoading(true);
                }}
              >
                All years
              </button>
              <input
                type="number"
                maxLength={4}
                minLength={4}
                min="1900"
                max="2023"
                step="1"
                value={primaryRelease}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrimaryRelease(e.target.value.slice(0, 4))
                }
              />
              <button
                disabled={
                  Number(primaryRelease) <= new Date().getFullYear() &&
                  primaryRelease !== ""
                    ? false
                    : true
                }
                style={{
                  backgroundColor: primaryReleaseAccept ? "#8dbae8" : "#506cd3",
                }}
                onClick={() => {
                  setPrimaryReleaseAccept((prev: boolean) => !prev);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="Movies">
            {loading ? (
              <div className="loadingMovies">
                <PropagateLoader color="#d65236" size={22} />
              </div>
            ) : (
              <>
                <Movie movies={movies} />
                <div className="pagination">
                  {movies &&
                    movies?.results.length > 1 &&
                    moviesPerPage
                      .slice(
                        currentPage >= 5 ? cutPages.first : 0,
                        currentPage >= 5 ? cutPages.last : 7
                      )
                      .map((p, index, array) => (
                        <span
                          style={{
                            background: p === currentPage ? "#3191be" : "",
                          }}
                          key={p}
                          onClick={() => {
                            setCurrentPage(p),
                              p !== currentPage && setLoading(true);
                            p !== currentPage &&
                              setCutPages((prev: ICutPages) => {
                                if (p < currentPage) {
                                  return {
                                    ...prev,
                                    first:
                                      prev.first -
                                      (currentPage > 3
                                        ? cutPages.last === currentPage
                                          ? 0
                                          : 2
                                        : 0),
                                    last:
                                      prev.last -
                                      (currentPage > 3 &&
                                      currentPage !== cutPages.last
                                        ? 2
                                        : 0),
                                  };
                                } else {
                                  return {
                                    ...prev,
                                    first:
                                      prev.first +
                                      (currentPage > 3 &&
                                      array.length > 6 &&
                                      currentPage > cutPages.first + 2
                                        ? 2
                                        : 0),
                                    last:
                                      prev.last +
                                      (currentPage > 3 &&
                                      currentPage > cutPages.first + 2
                                        ? 2
                                        : 0),
                                  };
                                }
                              });
                          }}
                        >
                          {p}
                        </span>
                      ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverMovie;