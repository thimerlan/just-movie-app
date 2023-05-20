import { useEffect, useState } from "react";
import axios from "axios";
import { IMovie } from "../../Movies/Interface";
const useGetMovieDetails = () => {
  const [movie, setMovie] = useState<IMovie>();
  const [movieId, setMovieId] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getMovieDetails() {
      if (movieId) {
        try {
          const apiKey = "d39c2fb1b1580a4f6618a3b23b2f7093";
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${apiKey}`
          );
          setMovie(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    }
    getMovieDetails();
  }, [movieId]);

  return { movie, setMovieId, setLoading, loading };
};
export default useGetMovieDetails;
