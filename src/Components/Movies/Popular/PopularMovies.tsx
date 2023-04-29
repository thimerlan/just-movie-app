import { FC, useContext, useEffect } from "react";
import "./PopularMovies.scss";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { IPMovies } from "../Interface";
import axios from "axios";
import MovieContext from "../../../Context/MovieContext";
interface Props {}
const PopularMovies: FC<Props> = () => {
  const {
    popularMovies,
    loading,
    setLoading,
    sortAscending,
    setSortAscending,
    setPopularMovies,
    page,
    setPage,
    setShowAll,
    showAll,
  } = useContext(MovieContext);
  const modifiedResults = showAll
    ? popularMovies?.results.slice()
    : popularMovies?.results.slice(0, 12);

  useEffect(() => {
    window.scrollTo(0, 0);
	
  }, [popularMovies]);

  if (sortAscending && modifiedResults) {
    modifiedResults.sort((a, b) => b.vote_average - a.vote_average);
  }

  const handleSortByVotes = (): void => {
    setSortAscending(true);

    if (sortAscending && popularMovies) {
      setSortAscending(false);
      async function getPopularMovies() {
        let api_key = "d39c2fb1b1580a4f6618a3b23b2f7093";
        try {
          const response = await axios.get<IPMovies>(
            `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}`
          );
          setPopularMovies(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      getPopularMovies();
    } else {
      if (popularMovies) {
        popularMovies?.results.sort((a, b) => b.vote_average - a.vote_average);
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
      <div className="pageStatistics">
        <div className="Sorting">
          <button onClick={handleSortByVotes}>
            {sortAscending ? "Return to orginal sorting" : "Sort by Votes"}
          </button>
        </div>
        <span>Page {popularMovies?.page}</span>
        <span>Total pages {500}</span>
        <span>Total results {10000}</span>
      </div>
      <div className="contentsPopMovies">
        {modifiedResults &&
          modifiedResults.map((movie) => (
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
              <Link to={`/Movies/Popular/${movie.id}`}>
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
          ))}
        <div className="pagination">
          <div className="prev">
            <button
              disabled={page <= 1 ? true : false}
              onClick={() => {
                setLoading(true);
                setPage((prev: number) => prev - 1);
              }}
            >
              Prev
            </button>
          </div>
          <div className="next">
            <button
              disabled={page === 500 ? true : false}
              onClick={() => {
                setLoading(true);
                setPage((prev: number) => prev + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
        <div className="addMore">
          <button
            onClick={() => {
              setShowAll(showAll ? false : true);
              window.scrollTo(0, 0);
            }}
          >
            Show {showAll ? "less" : "more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularMovies;
