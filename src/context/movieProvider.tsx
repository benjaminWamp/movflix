import axios from "axios";
import { createContext, useCallback, useContext, useState } from "react";
import { ReactNode } from "react";
import Movie from "../types/Movie";

interface MovieContextType {
  movie: Movie | undefined;
  fetchMovieDetail: (id: string) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);
interface MovieProviderProps {
  children: ReactNode;
}

const MovieProvider = ({ children }: MovieProviderProps) => {
  const [movie, setMovie] = useState<Movie | undefined>();

  const fetchMovieDetail = useCallback(async (id: string) => {
    await axios.get(`${import.meta.env.VITE_URL_TMDB}/${id}?api_key=${import.meta.env.VITE_KEY_TMDB}&language=fr-FR`).then((response) => {
      setMovie(response.data);
    });
  }, []);

  return <MovieContext.Provider value={{ movie, fetchMovieDetail }}>{children}</MovieContext.Provider>;
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("Wesh");
  }

  return context;
};

export default MovieProvider;
