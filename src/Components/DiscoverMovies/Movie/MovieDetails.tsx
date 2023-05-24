import { useParams, useNavigate } from "react-router-dom";
import useGetMovieDetails from "../DiscoverApi/useGetMovieDetails";
import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import YouTube from "react-youtube";
import "./MovieDetails.scss";
import axios from "axios";
interface MovieProps {}
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
const MovieDetails = (props: MovieProps) => {
  const { id } = useParams<string>();
  const { movie, setMovieId, loading } = useGetMovieDetails();
  const [getVideo, setGetVideo] = useState<IVideo>();
  const [modal, setModal] = useState<boolean>(false);
  const [countTrailer, setCountTrailer] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    setMovieId(id);
  }, [id]);
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
    if (modal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [modal]);

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
            <div className="backToPrevPage">
              <button onClick={() => navigate(-1)}>
                Back to Previous Page
              </button>
            </div>
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

                {!movie.homepage ? (
                  <p>The website of the movie is absent!</p>
                ) : (
                  <a href={movie.homepage} target="_blank">
                    Home page of Movie
                  </a>
                )}
                <button onClick={() => setModal(true)}>Watch trailer!</button>
              </div>
            </div>
            <div
              onClick={() => setModal(false)}
              title="close trailer window"
              className={modal ? "trailerVideoOn" : "trailerVideoOff"}
            >
              {modal ? (
                <div className="uTube">
                  {getVideo?.results.length ? (
                    <YouTube
                      videoId={getVideo?.results[countTrailer].key}
                      title={getVideo?.results[countTrailer].name}
                      opts={{
                        playerVars: {
                          controls: 1,
                        },
                        width: "1340",
                        height: "720",
                      }}
                    />
                  ) : (
                    <h2>No trailers yet! 😔</h2>
                  )}
                  {getVideo?.results.length !== 0 && (
                    <div className="handlePrevAndNextTrailer">
                      <button
                        className="clodeModal"
                        onClick={() => setModal(false)}
                      >
                        &#10008;
                      </button>

                      <button
                        title="Previous trailer"
                        disabled={countTrailer <= 0 ? true : false}
                        onClick={(e) => {
                          setCountTrailer((prev) => prev - 1),
                            e.stopPropagation();
                        }}
                      >
                        Previous Trailer
                      </button>
                      <button
                        disabled={
                          getVideo &&
                          getVideo?.results.length - 1 === countTrailer
                            ? true
                            : false
                        }
                        title="Next trailer"
                        onClick={(e) => {
                          setCountTrailer((prev) => prev + 1),
                            e.stopPropagation();
                        }}
                      >
                        Next Trailer
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default MovieDetails;
