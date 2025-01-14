import axios from "axios";
import { createContext, useState } from "react";
import { ReactNode } from "react";

export const MovieContext = createContext({
  movie: [],
  fetchMovieDetail: (id: number) => {},
});

const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movie, setMovie] = useState([]);

  const fetchMovieDetail = (id: number) => {
    axios.get(`${import.meta.env.VITE_URL_TMDB}/movie/${id}?api_key=${import.meta.env.VITE_KEY_TMDB}&language=fr-FR`).then((response) => {
      setMovie(response.data);
    });
  };

  return <MovieContext.Provider value={{ movie, fetchMovieDetail }}>{children}</MovieContext.Provider>;
};

export default MovieProvider;
