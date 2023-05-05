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
        <NavLink title="Popular movies." to={"/movies/popular"}>
          Popular
        </NavLink>
        <NavLink
          title="Upcoming or already released movies."
          to={"/movies/upcoming"}
        >
          Upcoming
        </NavLink>
      </div>

      <div className={`${pathname !== "/movies" && "bg-imgOff"} bg-img`}>
        <span>I am a baby.</span>
      </div>

      <Outlet />
    </div>
  );
};

export default Movies;
