import { useState, useEffect } from "react";
import axios from "axios";
import { IPMovies, IResultData } from "../Interface";

const useGetMovieApi = () => {
  const [popularMovies, setPopularMovies] = useState<IPMovies | undefined>();

  const [loading, setLoading] = useState<boolean>(true);
  const [addMore, setAddMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function getPopularMovies() {
      let api_key = "d39c2fb1b1580a4f6618a3b23b2f7093";
      try {
        const response = await axios.get<IPMovies>(
          `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}`
        );
        setPopularMovies(response.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getPopularMovies();
  }, [page]);

  return {
    popularMovies,
    setPopularMovies,
    page,
    setPage,

    loading,

    addMore,

    setAddMore,
  };
};

// export default useGetMovieApi;
