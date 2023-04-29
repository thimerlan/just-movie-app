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
