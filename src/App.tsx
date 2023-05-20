import react from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  NavLink,
  Outlet,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Movies from "./Components/Movies/Movies";
import { RouterProvider } from "react-router-dom";
import PopularMovies from "./Components/Movies/Popular/PopularMovies";
import UpComingMovies from "./Components/Movies/UpComing/UpComingMovies";
import SingleMovie from "./Components/Movies/GetSingleMovie/SinglePopularMovie";
import UpSingleMovie from "./Components/Movies/GetSingleMovie/SingleUpComingMovie";
import Favorite from "./Components/Movies/GetSingleMovie/SingleFavoriteMovie";

import Favorites from "./Components/Movies/Favorites/Favorites";
import SingleRecommendations from "./Components/Movies/GetSingleMovie/SingleRecommendations";
import { MovieProvider } from "./Context/MovieContext";
import { UpComingMovieProvider } from "./Context/UpComingMovieContext";
import DiscoverMovie from "./Components/DiscoverMovies/DiscoverMovie";
import Movie from "./Components/DiscoverMovies/Movie/MovieDetails";

const Root = (): JSX.Element => {
  return (
    <nav>
      <div>
        <NavLink to={"/"}>Home</NavLink>

        <NavLink to={"/movies"}>Movies</NavLink>
        <NavLink to={"/discover/movie"}>Discovery</NavLink>
        <NavLink to={"/favorites"}>Favorites</NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </nav>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" index element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/favorites/:id" element={<Favorite />} />
        <Route path="/movies" element={<Movies />}>
          <Route path="/movies/popular" element={<PopularMovies />} />
          <Route path="/movies/popular/:id" element={<SingleMovie />} />
          <Route path="/movies/upcoming" element={<UpComingMovies />} />
          <Route path="/movies/upcoming/:id" element={<UpSingleMovie />} />
          <Route
            path="/movies/recommendations/:id"
            element={<SingleRecommendations />}
          />
        </Route>
        <Route path="/discover/movie" element={<DiscoverMovie />} />
        <Route path="/discover/movie/:id" element={<Movie />} />
      </Route>
    )
  );
  return (
    <MovieProvider>
      <UpComingMovieProvider>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </UpComingMovieProvider>
    </MovieProvider>
  );
}

export default App;
