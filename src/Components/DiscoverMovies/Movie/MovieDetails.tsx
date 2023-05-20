import { useParams } from "react-router-dom";
import useGetMovieDetails from "../DiscoverApi/useGetMovieDetails";
import { useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import "./MovieDetails.scss";
interface MovieProps {}

const MovieDetails = (props: MovieProps) => {
  const { id } = useParams<string>();
  const { movie, setMovieId, loading } = useGetMovieDetails();
  useEffect(() => {
    setMovieId(id);
  }, [id]);

  function formatRuntime(minute: number) {
    const hours = Math.floor(minute / 60);
    const remainingMinutes = minute % 60;
    const formattedRuntime = `${hours}h ${remainingMinutes}m`;
    return formattedRuntime;
  }
  const formattedRuntime = movie ? formatRuntime(movie.runtime) : "";
  return (
    <>
      {loading ? (
        <div className="loading">
          <PropagateLoader color="#d65236" size={22} />
        </div>
      ) : (
        movie && (
          <div className="movieDetails">
            <div
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
              }}
              className="mainContent"
            >
              <div className="aboutMovie">
                <h2>{movie.title}</h2>
                <span>{movie.tagline}</span>
                <p>{movie.overview}</p>
                <ul>
                  <li>Status: {movie.status}</li>
                  <li>Time: {formattedRuntime}</li>
                  <li>Original Language: {movie.original_language}</li>
                  <li>Release Date: {movie.release_date}</li>
                  <li>Vote Average: {movie.vote_average.toFixed(1)}</li>
                  <li>Revenue: {movie.revenue.toLocaleString("en-EN")}$</li>
                </ul>
                <ul className="genres">
                  <li>Genres:</li>
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
                <a href={movie.homepage} target="_blank">
                  Home page of Movie
                </a>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default MovieDetails;
