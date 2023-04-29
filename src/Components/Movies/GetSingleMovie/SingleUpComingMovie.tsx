import { FC, useEffect, useRef, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { BsCollectionPlay } from "react-icons/bs";
interface SingleMovieProps {}
import "./SingleMovies.scss";

import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import useGetFavorite from "../useApi/useGetFavorites";
import { BounceLoader } from "react-spinners";
import useGetRecommendations from "../useApi/useGetRecommendations";
import MovieContext from "../../../Context/MovieContext";
import UpComingMovieContext from "../../../Context/UpComingMovieContext";

interface IVideo {
  id: number;
  results: {
    object: any;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }[];
}

const UpSingleMovie: FC<SingleMovieProps> = () => {
  const { id } = useParams<string>();
  const [getvideo, setGetVideo] = useState<IVideo>();

  const { recommendations } = useGetRecommendations();

  const { setFavoriteMovies, favoriteMovies } = useGetFavorite();

  const [countTrailer, setCountTrailer] = useState<number>(0);
  const [popup, setPopup] = useState<boolean>(false);
  const [isAddedToFav, setIsAddedToFav] = useState<boolean>(false);
  const { upComingMovies } = useContext(UpComingMovieContext);
  const { idR, setIdR } = useContext(MovieContext);

  let getSingleMovie = upComingMovies?.results.filter((movie) => {
    if (movie.id === Number(id)) {
      return movie;
    }
  });
  useEffect(() => {
    setIdR(Number(id));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    favoriteMovies?.filter((movie) => {
      if (movie.id === Number(id)) {
        setIsAddedToFav(true);
      }
    });
  }, [favoriteMovies]);

  const addToFavorites = (): void => {
    if (getSingleMovie && getSingleMovie.length > 0) {
      const newFavorites = [...favoriteMovies, getSingleMovie[0]];
      setFavoriteMovies(newFavorites);
      localStorage.setItem("favoriteMovies", JSON.stringify(newFavorites));
      setIsAddedToFav(true);
    }
  };

  const removeFromFavorites = (): void => {
    const updatedFavoriteMovies = favoriteMovies.filter(
      (movie) => movie.id !== Number(id)
    );

    localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(updatedFavoriteMovies)
    );

    setFavoriteMovies(updatedFavoriteMovies);
    setIsAddedToFav(false);
  };
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    async function getVideo() {
      let api_key = "d39c2fb1b1580a4f6618a3b23b2f7093";
      try {
        const response = await axios.get<IVideo>(
          `https://api.themoviedb.org/3/movie/${Number(
            id
          )}/videos?api_key=${api_key}`
        );

        setGetVideo(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getVideo();
  }, []);

  useEffect(() => {
    if (popup) {
      document.body.style.overflowY = "hidden";
      if (iframeRef.current) {
        iframeRef.current.src = `https://www.youtube.com/embed/${getvideo?.results[countTrailer].key}`;
      }
    } else {
      document.body.style.overflowY = "auto";

      if (iframeRef.current) {
        iframeRef.current.src = ``;
        iframeRef.current.src = `https://www.youtube.com/embed/${getvideo?.results[countTrailer].key}`;
      }
    }
  }, [popup]);

  return (
    <>
      <div className="SingleMovie">
        {getSingleMovie?.length ? (
          <div className="S-MainContainer">
            <div
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${getSingleMovie[0].backdrop_path})`,
              }}
              className="backdropPath"
            >
              <div className="averageAndLanguage">
                <span
                  style={{
                    color: `${
                      getSingleMovie[0].vote_average <= 4
                        ? "#c30010"
                        : getSingleMovie[0].vote_average <= 7
                        ? "#e5de00"
                        : "#06a94d"
                    } `,
                  }}
                  className="voteS"
                >
                  {getSingleMovie[0].vote_average.toFixed(1)}
                </span>
                <span className="langS">
                  {getSingleMovie[0].original_language}
                </span>
              </div>
              <div className="bodySingleMovie">
                <div className="favBtn">
                  <button
                    title="Add to Favorite"
                    className={isAddedToFav ? "favAct" : ""}
                    onClick={() => {
                      isAddedToFav ? removeFromFavorites() : addToFavorites();
                    }}
                  >
                    <AiFillHeart
                      size={20}
                      fill={isAddedToFav ? "#d30000" : "#8c92ac"}
                    />
                  </button>
                </div>
                <h1>Title: {getSingleMovie[0].original_title}</h1>

                <p>Description: {getSingleMovie[0].overview} </p>
                <span>Release date: {getSingleMovie[0].release_date}</span>
                <div className="watchTrailer">
                  <button
                    onClick={() => {
                      setPopup(true);
                    }}
                  >
                    Watch trailer!
                  </button>
                  <div className="imgPlay">
                    <BsCollectionPlay size={18} />
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => setPopup(false)}
              className={popup ? "popupTrailer" : "popupTrailerOff"}
            >
              <div>
                <div className="closePopup">
                  {getvideo?.results.length ? (
                    <button onClick={() => setPopup(false)}>&#10006;</button>
                  ) : (
                    ""
                  )}
                </div>

                {getvideo?.results.length ? (
                  <iframe
                    ref={iframeRef}
                    src={`https://www.youtube.com/embed/${getvideo?.results[countTrailer]?.key}`}
                    title={getvideo?.results[countTrailer]?.name}
                    allowFullScreen
                    width={1350}
                    height={720}
                  />
                ) : (
                  <div className="NoneTrailer">
                    <h2>No Trailer yet! 😌</h2>
                  </div>
                )}
                <div onClick={(e) => e.stopPropagation()} className="prev-next">
                  {getvideo?.results.length ? (
                    <>
                      <button
                        className={countTrailer === 0 ? "Btnoff" : ""}
                        onClick={() => {
                          countTrailer >= 1 &&
                            setCountTrailer((prev) => prev - 1);
                        }}
                      >
                        Prev trailer
                      </button>
                      <button
                        className={
                          getvideo?.results.length - 1 === countTrailer
                            ? "Btnoff"
                            : ""
                        }
                        onClick={() => {
                          getvideo?.results.length - 1 !== countTrailer &&
                            setCountTrailer((prev) => prev + 1);
                        }}
                      >
                        Next trailer
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="loadingSinglePage">
            <BounceLoader color="#566cd3" size={110} speedMultiplier={1.7} />
          </div>
        )}
      </div>
      <div className="Recommendations">
        <div className="RecTitle">
          <h2>
            {recommendations?.results &&
            getSingleMovie &&
            getSingleMovie?.length > 0 &&
            recommendations?.results.length > 0
              ? "Recommendations:"
              : ""}
          </h2>
        </div>
        <div className="recLayout">
          {recommendations?.results.length && getSingleMovie?.length ? (
            recommendations?.results.map((movie) => (
              <div key={movie.id} className="movie">
                <div className="averageAndLanguage">
                  <span
                    style={{
                      color: `${
                        movie.vote_average <= 4
                          ? "#c30010"
                          : movie.vote_average <= 7
                          ? "#e5de00"
                          : "#06a94d"
                      } `,
                    }}
                    className="vote"
                  >
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="lang">{movie.original_language}</span>
                </div>
                <Link to={`/Movies/Recommendations/${movie.id}`}>
                  <img
                    src={`${
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : "https://marketplace.canva.com/EAE9OZ4Eh9o/1/0/1131w/canva-black-minimalist-coming-soon-poster-rmN33IHdOEM.jpg"
                    }`}
                    alt={movie.title}
                  />
                </Link>
                <p>{movie.title}</p>
              </div>
            ))
          ) : (
            <div className="RecTitle">
              <h2>
                {getSingleMovie && getSingleMovie.length > 0
                  ? "Recommendations Not yet!"
                  : ""}
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpSingleMovie;
