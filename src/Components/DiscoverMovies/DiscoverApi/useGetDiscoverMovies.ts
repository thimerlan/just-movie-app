import { useEffect, useState } from "react";
import axios from "axios";
import { IPMovies, Genres, ICutPages, IMovies } from "../../Movies/Interface";
interface useGetDiscoverMoviesProps {}

const useGetDiscoverMovies = () => {
  const [genres, setGenres] = useState<Genres>();
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  const [movies, setMovies] = useState<IPMovies | undefined>();
  const [sortSelecting, setSortSelecting] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [moviesPerPage, setMoviesPerPage] = useState<number[]>([]);
  const [cutPages, setCutPages] = useState<ICutPages>({ first: 0, last: 7 });
  const searchParams = new URLSearchParams(location.search);
  const primaryR = searchParams.get("primary_release") || "";

  const [primaryRelease, setPrimaryRelease] = useState<string>("");
  const [primaryReleaseAccept, setPrimaryReleaseAccept] =
    useState<boolean>(false);
  useEffect(() => {
    async function getDiscoverMovies() {
      try {
        const api_key = "d39c2fb1b1580a4f6618a3b23b2f7093";
        const response = await axios.get<IMovies>(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=${
            sortSelecting || "popularity.desc"
          }&page=${currentPage}&primary_release_year=${
            primaryRelease || primaryR
          }&with_genres=${selectedGenreIds.join(",")}`
        );
        setMovies(response.data);
        const totalPages: number = response.data.total_pages;
        const pagesArray: number[] = [];

        for (let i = 1; i <= totalPages; i++) {
          pagesArray.push(i);
        }

        setMoviesPerPage(pagesArray);
        !sortSelecting
          ? setTimeout(() => {
              setLoading(false);
            }, 1000)
          : setLoading(false);
        setPrimaryReleaseAccept(false);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    }

    getDiscoverMovies();
  }, [selectedGenreIds, sortSelecting, currentPage, primaryReleaseAccept]);

  useEffect(() => {
    async function getGenres() {
      const res = await axios.get<Genres>(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=d39c2fb1b1580a4f6618a3b23b2f7093&language=en-US"
      );
      setGenres(res.data);
    }
    getGenres();
  }, []);
  return {
    genres,
    selectedGenreIds,
    setSelectedGenreIds,
    movies,
    sortSelecting,
    setSortSelecting,
    loading,
    setLoading,
    currentPage,
    setCurrentPage,
    moviesPerPage,
    setMoviesPerPage,
    cutPages,
    setCutPages,
    primaryRelease,
    setPrimaryRelease,
    primaryReleaseAccept,
    setPrimaryReleaseAccept,
  };
};

export default useGetDiscoverMovies;
