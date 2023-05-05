import { FC, useState } from "react";
import useGetFavorite from "../useApi/useGetFavorites";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import "./Favorites.scss";
import { AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";

interface FavoriteProps {}

const Favorite: FC<FavoriteProps> = () => {
  const { favoriteMovies, setFavoriteMovies, loading } = useGetFavorite();
  const [sortAscending, setSortAscending] = useState<boolean>(false);
  const handleSortByVotes = (): void => {
    setSortAscending(true);
    if (sortAscending) {
      const favoriteMoviesFromStorage = localStorage.getItem("favoriteMovies");
      if (favoriteMoviesFromStorage) {
        setFavoriteMovies(JSON.parse(favoriteMoviesFromStorage));
      }
      setSortAscending(false);
    } else {
      if (favoriteMovies) {
        favoriteMovies.sort((a, b) => b.vote_average - a.vote_average);
      }
    }
  };

  return loading ? (
    <div className="loading">
      <ContentLoader
        width={1300}
        height={575}
        viewBox="0 0 1250 585"
        backgroundColor="#162bcde7"
        foregroundColor="#4416cde7"
      >
        <rect x="833" y="34" rx="2" ry="2" width="60" height="8" />
        <rect x="906" y="34" rx="2" ry="2" width="60" height="8" />
        <rect x="980" y="34" rx="2" ry="2" width="60" height="8" />

        <rect x="200" y="58" rx="10" ry="15" width="254" height="427" />
        <rect x="500" y="58" rx="10" ry="15" width="254" height="427" />
        <rect x="800" y="58" rx="10" ry="15" width="254" height="427" />

        <circle cx="580" cy="536" r="10" />
        <circle cx="610" cy="535" r="12" />
        <circle cx="640" cy="535" r="10" />
        <rect x="500" y="524" rx="0" ry="0" width="52" height="18" />
        <rect x="670" y="523" rx="0" ry="0" width="52" height="18" />
        <circle cx="719.4" cy="532" r="9" />
        <circle cx="501" cy="533" r="9" />
      </ContentLoader>
    </div>
  ) : (
    <div className="ContentMovies">
      <div className="Sorting">
        {favoriteMovies.length > 0 ? (
          <button onClick={handleSortByVotes}>
            {sortAscending ? "Return to orginal sorting" : "Sort by Votes"}
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="contentsFavoriteMovies">
        {favoriteMovies.length ? (
          favoriteMovies?.map((movie: any) => (
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
                  {movie.vote_average.toFixed(1)}
                  <br />
                </span>
                <span className="lang">{movie.original_language}</span>
              </div>
              <Link to={`/favorites/${movie.id}`}>
                <img
                  src={`${
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                      : "https://marketplace.canva.com/EAE9OZ4Eh9o/1/0/1131w/canva-black-minimalist-coming-soon-poster-rmN33IHdOEM.jpg"
                  }`}
                  alt={movie.title}
                />
              </Link>
              <p>{movie.title}</p>
            </div>
          ))
        ) : (
          <div className="KeepInHeart">
            <h2>
              You currently have no favorite movies. Please add movies to your
              favorites list to keep in your heart.
            </h2>

            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 1.7 }}
            >
              <AiFillHeart size={40} fill={"#d30000"} />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
