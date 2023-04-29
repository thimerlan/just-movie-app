import { IPMovies } from "../Components/Movies/Interface";
import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

export interface MyContextInterface {
  idR: number | null;
  setIdR: (idR: number | null) => void;
  popularMovies: IPMovies | undefined;
  setPopularMovies: (movies: IPMovies) => void;
  page: number;
  setPage: (page: any | number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  sortAscending: boolean;
  setSortAscending: (sortAscending: boolean) => void;
  showAll: boolean;
  setShowAll: (showAll: boolean) => void;
}

const MovieContext = createContext<MyContextInterface>({
  idR: null,
  setIdR: () => {},
  popularMovies: undefined,
  setPopularMovies: () => {},
  page: 1,
  setPage: () => {},
  loading: true,
  setLoading: () => {},
  sortAscending: false,
  setSortAscending: () => {},
  showAll: false,
  setShowAll: () => {},
});

type MovieProviderProps = {
  children: ReactNode;
};

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [popularMovies, setPopularMovies] = useState<IPMovies | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [idR, setIdR] = useState<number | null>(null);
  const [sortAscending, setSortAscending] = useState<boolean>(false);

  useEffect(() => {
    async function getPopularMovies() {
      let api_key = "d39c2fb1b1580a4f6618a3b23b2f7093";
      try {
        const response = await axios.get<IPMovies>(
          `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}`
        );
        setPopularMovies(response.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getPopularMovies();
  }, [page, showAll]);

  return (
    <MovieContext.Provider
      value={{
        popularMovies,
        setPopularMovies,
        page,
        setPage,
        loading,
        setLoading,
        sortAscending,
        setSortAscending,
        showAll,
        setShowAll,
        idR,
        setIdR,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
