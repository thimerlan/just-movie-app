import { useState, useEffect } from "react";
import { IResultData } from "../Interface";

const useGetFavorite = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [favoriteMovies, setFavoriteMovies] = useState<IResultData[]>([]);

  useEffect(() => {
    // Retrieve the list of favorite movies from local storage
    const favoriteMoviesFromStorage = localStorage.getItem("favoriteMovies");

    if (favoriteMoviesFromStorage) {
      // Parse the JSON data from local storage and update state
      setFavoriteMovies(JSON.parse(favoriteMoviesFromStorage));
      setLoading(false);
    }
  }, []);

  return { favoriteMovies, setFavoriteMovies, loading };
};

export default useGetFavorite;
