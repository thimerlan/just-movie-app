import { FC, useState, useEffect } from "react";
import { IMovies } from "./useGetDiscoverMovies";
import { IResultData } from "../Movies/Interface";
import { AiFillHeart } from "react-icons/ai";
import useGetFavorite from "../Movies/useApi/useGetFavorites";
interface MovieProps {
  movies: IMovies | undefined;
}

const Movie: FC<MovieProps> = ({ movies }) => {
  const { setFavoriteMovies, favoriteMovies } = useGetFavorite();

  const addToFavorites = (id: number): void => {
    const movie = movies?.results.filter((mov) => mov.id === id);
    if (movie) {
      const newFavorites = [...favoriteMovies, ...movie];
      setFavoriteMovies(newFavorites);
      localStorage.setItem("favoriteMovies", JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (id: number): void => {
    const updatedFavoriteMovies = favoriteMovies.filter(
      (movie) => movie.id !== id
    );

    setFavoriteMovies(updatedFavoriteMovies);
    localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(updatedFavoriteMovies)
    );
  };

  return (
    <>
      {movies?.results.length ? (
        movies?.results.map((movie: IResultData) => (
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
                {movie.vote_average}
              </span>
              <span className="lang">{movie.original_language}</span>
            </div>

            <img
              src={`${
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                  : "https://marketplace.canva.com/EAE9OZ4Eh9o/1/0/1131w/canva-black-minimalist-coming-soon-poster-rmN33IHdOEM.jpg"
              }`}
              alt={movie.title}
            />

            <p>{movie.title}</p>
            <div className="addingToFavorite">
              {favoriteMovies.some(
                (favoriteMovie) => favoriteMovie.id === movie.id
              ) ? (
                <button
                  title="Remove from Favorites"
                  onClick={() => {
                    removeFromFavorites(movie.id);
                  }}
                >
                  <AiFillHeart size={25} fill={"#d30000"} />
                </button>
              ) : (
                <button
                  title="Add to Favorites "
                  onClick={() => {
                    addToFavorites(movie.id);
                  }}
                >
                  <AiFillHeart size={22} fill={"#8c92ac"} />
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="notFoundMovies">
          <p>No items were found that match your query :(</p>
        </div>
      )}
    </>
  );
};

export default Movie;
