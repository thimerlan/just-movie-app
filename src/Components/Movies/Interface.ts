export interface IResultData {
  poster_path: string | null;
  adult: boolean;
  media_type: string;

  overview: string;
  release_date: string;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}
export interface IPMovies {
  page: number;
  results: IResultData[];
  total_results: number;
  total_pages: number;
}

export interface IUComingMovies {
  page: number;
  results: IResultData[];
  total_results: number;
  total_pages: number;
}

export interface Genres {
  genres: IGenre[];
}
export interface IMovies {
  page: number;
  results: IResultData[];
  total_results: number;
  total_pages: number;
}
export interface ICutPages {
  first: number;
  last: number;
}
// MOVIE INTERFACE!!!
interface IGenre {
  id: number;
  name: string;
}

interface IProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
