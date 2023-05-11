import { useEffect, useState } from "react";
import axios from "axios";
interface useGetDiscoverMoviesProps {}
interface Genre {
  id: number;
  name: string;
}

interface Genres {
  genres: Genre[];
}
interface IResultData {
  poster_path: string | null;
  adult: boolean;
  media_type: string;

  overview: string;
  release_date: string;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}
export interface IMovies {
  page: number;
  results: IResultData[];
  total_results: number;
  total_pages: number;
}
export interface ICutPages {
  first: number;
  last: number;
}
const useGetDiscoverMovies = () => {
  const [genres, setGenres] = useState<Genres>();
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  const [movies, setMovies] = useState<IMovies | undefined>();
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
