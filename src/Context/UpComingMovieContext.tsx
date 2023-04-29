import { IPMovies, IUComingMovies } from "../Components/Movies/Interface";
import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

export interface MyContextInterface {
  idR: number | null;
  setIdR: (idR: number | null) => void;
  upComingMovies: IUComingMovies | undefined;
  setUpComingMovies: (movies: IPMovies) => void;
  page: number;
  setPage: (page: any | number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  sortAscending: boolean;
  setSortAscending: (sortAscending: boolean) => void;
  showAll: boolean;
  setShowAll: (addMore: boolean) => void;
}

const UpComingMovieContext = createContext<MyContextInterface>({
  idR: null,
  setIdR: () => {},
  upComingMovies: undefined,
  setUpComingMovies: () => {},
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

export const UpComingMovieProvider = ({ children }: MovieProviderProps) => {
  const [upComingMovies, setUpComingMovies] = useState<
    IUComingMovies | undefined
  >();
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [sortAscending, setSortAscending] = useState<boolean>(false);

  const [idR, setIdR] = useState<number | null>(null);
  useEffect(() => {
    async function getUpcomingMovies() {
      let api_key = "d39c2fb1b1580a4f6618a3b23b2f7093";
      try {
        // `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=${page}`
        const response = await axios.get<IUComingMovies>(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=${page}`
        );
        setUpComingMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getUpcomingMovies();
  }, [page, showAll]);

  return (
    <UpComingMovieContext.Provider
      value={{
        upComingMovies,
        setUpComingMovies,
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
    </UpComingMovieContext.Provider>
  );
};

export default UpComingMovieContext;
