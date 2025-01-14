import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import Movie from "./types/Movie";
import MovieProvider from "./context/movieProvider";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [categoryMovie, setCategoryMovie] = useState("popular");
  const [movieSearch, setMovieSearch] = useState("");

  const filteredMovies = movies.filter((movie: Movie) => movie.title.toLowerCase().includes(movieSearch.toLowerCase()));

  function fetchMovies() {
    axios
      .get(`${import.meta.env.VITE_URL_TMDB}/${categoryMovie}?api_key=${import.meta.env.VITE_KEY_TMDB}&language=fr-FR`)
      .then((response) => {
        console.log(response.data.results);

        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des films:", error);
      });
  }

  function findTitle() {
    switch (categoryMovie) {
      case "popular":
        return "Populaire";
      case "now_playing":
        return "En cours de diffusion";
      case "top_rated":
        return "Les mieux notés";
      case "upcoming":
        return "À venir";
      default:
        return "Populaire";
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [categoryMovie]);

  return (
    <MovieProvider>
      <div className="px-10">
        <div className="flex flex-row gap-x-2 py-10">
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-25 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setCategoryMovie(e.target.value)}
            value={categoryMovie}
          >
            <option value="popular">Populaire</option>
            <option value="now_playing">En cours de diffusion</option>
            <option value="top_rated">Les mieux notés</option>
            <option value="upcoming">À venir</option>
          </select>
          <input
            type="text"
            value={movieSearch}
            onChange={(e) => setMovieSearch(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <h1 className="text-2xl">{findTitle()}</h1>
        <div className="grid grid-cols-10 py-10 gap-10">
          {filteredMovies.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
        </div>
      </div>
    </MovieProvider>
  );
}

export default MoviesList;
