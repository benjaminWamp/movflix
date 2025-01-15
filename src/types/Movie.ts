export default interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  genres: Array<object>;
  original_title: string;
  original_language: string;
  vote_average: number;
  overview: string;
  runtime: number;
}
