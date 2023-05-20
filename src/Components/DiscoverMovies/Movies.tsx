import { FC } from "react";
import { IMovies, IResultData } from "../Movies/Interface";
import { AiFillHeart } from "react-icons/ai";
import useGetFavorite from "../Movies/useApi/useGetFavorites";
import "react-lazy-load-image-component/src/effects/blur.css";
import React from "react";
import LazyImage from "../LazyImage/LazyImage";
import { Link } from "react-router-dom";
import useGetMovieDetails from "./DiscoverApi/useGetMovieDetails";
interface MovieProps {
  movies: IMovies | undefined;
}

const Movies: FC<MovieProps> = React.memo(({ movies }) => {
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
  const { setMovieId } = useGetMovieDetails();
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

            <Link to={`/discover/movie/${movie.id}`}>
              <LazyImage
                src={`${
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`
                    : "https://marketplace.canva.com/EAE9OZ4Eh9o/1/0/1131w/canva-black-minimalist-coming-soon-poster-rmN33IHdOEM.jpg"
                }`}
                alt={movie.title}
              />
            </Link>
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
                  <AiFillHeart size={26} fill={"#d31000"} />
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
});

export default Movies;
