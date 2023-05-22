import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsCollectionPlay } from "react-icons/bs";
interface FavoriteMovieProps {}
import "./SingleMovies.scss";
import axios from "axios";
import useGetFavorite from "../useApi/useGetFavorites";
import { AiFillHeart } from "react-icons/ai";

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

const Favorite: FC<FavoriteMovieProps> = () => {
  const { id } = useParams<string>();
  const [getVideo, setGetVideo] = useState<IVideo>();
  const { setFavoriteMovies, favoriteMovies } = useGetFavorite();
  const [countTrailer, setCountTrailer] = useState<number>(0);
  const [popup, setPopup] = useState<boolean>(false);
  const [isAddedToFav, setIsAddedToFav] = useState<boolean>(false);
  const navigate = useNavigate();

  let getFavoriteMovie = favoriteMovies?.filter((movie) => {
    if (movie.id === Number(id)) {
      return movie;
    }
  });

  useEffect(() => {
    favoriteMovies?.filter((movie) => {
      if (movie.id === Number(id)) {
        setIsAddedToFav(true);
      }
    });
  }, [favoriteMovies]);

  const addToFavorites = (): void => {
    if (getFavoriteMovie && getFavoriteMovie.length > 0) {
      const newFavorites = [...favoriteMovies, getFavoriteMovie[0]];
      setFavoriteMovies(newFavorites);
      localStorage.setItem("favoriteMovies", JSON.stringify(newFavorites));
      setIsAddedToFav(true);
    }
  };

  const removeFromFavorites = (): void => {
    const updatedFavoriteMovies = favoriteMovies.filter(
      (movie) => movie.id !== Number(id)
    );

    localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(updatedFavoriteMovies)
    );

    setFavoriteMovies(updatedFavoriteMovies);
    setIsAddedToFav(false);
    navigate("/Favorites");
  };

  const iframeRef = useRef<HTMLIFrameElement>(null);
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
    if (popup) {
      document.body.style.overflowY = "hidden";
      if (iframeRef.current) {
        iframeRef.current.src = `https://www.youtube.com/embed/${getVideo?.results[countTrailer].key}`;
      }
    } else {
      document.body.style.overflowY = "auto";
      if (iframeRef.current) {
        iframeRef.current.src = ``;
        iframeRef.current.src = `https://www.youtube.com/embed/${getVideo?.results[countTrailer].key}`;
      }
    }
  }, [popup]);

  return (
    <div className="SingleMovie">
      {getFavoriteMovie?.length ? (
        <div className="S-MainContainer">
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${getFavoriteMovie[0].backdrop_path})`,
            }}
            className="backdropPath"
          >
            <div className="averageAndLanguage">
              <span
                style={{
                  color: `${
                    getFavoriteMovie[0].vote_average <= 4
                      ? "#c30010"
                      : getFavoriteMovie[0].vote_average <= 7
                      ? "#e5de00"
                      : "#06a94d"
                  } `,
                }}
                className="voteS"
              >
                {getFavoriteMovie[0].vote_average.toFixed(1)}
              </span>
              <span className="langS">
                {getFavoriteMovie[0].original_language}
              </span>
            </div>
            <div className="bodySingleMovie">
              <div className="favBtn">
                <button
                  title={
                    isAddedToFav ? "Remove from Favorites" : "Add to Favorites"
                  }
                  className={isAddedToFav ? "favAct" : ""}
                  onClick={() => {
                    isAddedToFav ? removeFromFavorites() : addToFavorites();
                  }}
                >
                  <AiFillHeart
                    size={20}
                    fill={isAddedToFav ? "#d30000" : "#8c92ac"}
                  />
                </button>
              </div>
              <h1>Title: {getFavoriteMovie[0].original_title}</h1>

              <p>Description: {getFavoriteMovie[0].overview} </p>
              <span>Release date: {getFavoriteMovie[0].release_date}</span>
              <div className="watchTrailer">
                <button
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Watch trailer!
                </button>
                <div className="imgPlay">
                  <BsCollectionPlay size={18} />
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => setPopup(false)}
            className={popup ? "popupTrailer" : "popupTrailerOff"}
          >
            <div>
              <div className="closePopup">
                {getVideo?.results.length ? (
                  <button onClick={() => setPopup(false)}>&#10006;</button>
                ) : (
                  ""
                )}
              </div>

              {getVideo?.results.length ? (
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube.com/embed/${getVideo?.results[countTrailer].key}`}
                  title={getVideo?.results[countTrailer].name}
                  allowFullScreen
                  width={1350}
                  height={720}
                />
              ) : (
                <div className="NoneTrailer">
                  <h2>No Trailer yet! 😌</h2>
                </div>
              )}
              <div onClick={(e) => e.stopPropagation()} className="prev-next">
                {getVideo?.results.length ? (
                  <>
                    <button
                      className={countTrailer === 0 ? "Btnoff" : ""}
                      onClick={() => {
                        countTrailer >= 1 &&
                          setCountTrailer((prev) => prev - 1);
                      }}
                    >
                      Prev trailer
                    </button>
                    <button
                      className={
                        getVideo?.results.length - 1 === countTrailer
                          ? "Btnoff"
                          : ""
                      }
                      onClick={() => {
                        getVideo?.results.length - 1 !== countTrailer &&
                          setCountTrailer((prev) => prev + 1);
                      }}
                    >
                      Next trailer
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Favorite;
