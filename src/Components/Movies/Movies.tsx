import { FC, useState, useEffect } from "react";
import "./Movies.scss";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface Props {}
const Movies: FC<Props> = () => {
  const location = useLocation();
  const { pathname } = location;
  //   useEffect(() => {
  //     async function getSearchedMovies() {
  //       const res = await axios.get(
  //         "https://api.themoviedb.org/3/search/movie?api_key=d39c2fb1b1580a4f6618a3b23b2f7093&language=en-US&query=Friend&page=1&include_adult=false&year=2023"
  //       );
  //       //   console.log(res.data);
  //     }
  //     getSearchedMovies();
  //   }, []);
  return (
    <div className="genreMovies">
      <div className="typeGenre">
        <NavLink title="Popular movies." to={"/Movies/Popular"}>
          Popular
        </NavLink>
        <NavLink
          title="Upcoming or already released movies."
          to={"/Movies/UpComing"}
        >
          Upcoming
        </NavLink>
      </div>

      <div className={`${pathname !== "/Movies" && "bg-imgOff"} bg-img`}>
        <span>I am a baby.</span>
      </div>

      <Outlet />
    </div>
  );
};

export default Movies;

//   useEffect(() => {
//     const getMovieList = async () => {
//       // "https://api.themoviedb.org/3/genre/tv/list?api_key=d39c2fb1b1580a4f6618a3b23b2f7093&language=en-US"
//       //   "https://api.themoviedb.org/3/search/movie?api_key=d39c2fb1b1580a4f6618a3b23b2f7093&language=en-US&query=Hulk&page=1&include_adult=false"
//       //   "https://api.themoviedb.org/3/search/collection?api_key=d39c2fb1b1580a4f6618a3b23b2f7093&language=en-US&query=hulk&page=1"
//       //   "https://api.themoviedb.org/3/search/keyword?api_key=d39c2fb1b1580a4f6618a3b23b2f7093&query=Love&page=1"
//       const res = await axios.get(
//         "https://api.themoviedb.org/3/movie/934433/images?api_key=d39c2fb1b1580a4f6618a3b23b2f7093&language=en-US"
//       );
//       console.log(res.data);
//     };
//     // getMovieList();
//   }, []);
