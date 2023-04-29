import { useState, useEffect } from "react";
import axios from "axios";
import { IUComingMovies } from "../Interface";

const useGetUpMovieApi = () => {
  const [upComingMovies, setUpComingMovies] = useState<
    IUComingMovies | undefined
  >();
  const [loading, setLoading] = useState<boolean>(true);
  const [addMore, setAddMore] = useState<boolean>(false);

  useEffect(() => {
    async function getUpcomingMovies() {
      let api_key = "d39c2fb1b1580a4f6618a3b23b2f7093";
      try {
        const response = await axios.get<IUComingMovies>(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`
        );
        setUpComingMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getUpcomingMovies();
  }, [addMore]);

  return {
    upComingMovies,

    loading,

    addMore,

    setAddMore,
  };
};

// export default useGetUpMovieApi;
