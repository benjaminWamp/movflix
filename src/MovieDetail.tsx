import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useMovieContext } from "./context/movieProvider";
import MovieCard from "./components/MovieCard";

const MovieDetail = () => {
  const { id } = useParams();
  const [actors, setActors] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const { fetchMovieDetail, movie } = useMovieContext();

  useEffect(() => {
    if (id) {
      fetchMovieDetail(id);
      axios.get(`${import.meta.env.VITE_URL_TMDB}/${id}/credits?api_key=${import.meta.env.VITE_KEY_TMDB}`).then((response) => {
        setActors(response.data.cast.slice(0, 10));
      });
      axios.get(`${import.meta.env.VITE_URL_TMDB}/${id}/similar?api_key=${import.meta.env.VITE_KEY_TMDB}`).then((response) => {
        setSimilarMovies(response.data);
      });
    }
  }, [fetchMovieDetail, id]);

  function formatDuration(minutes: number) {
    const hours = Math.floor(minutes / 60); // Obtient le nombre entier d'heures
    const remainingMinutes = minutes % 60; // Obtient le nombre de minutes restantes
    return `${hours.toString().padStart(2, "0")}h${remainingMinutes.toString().padStart(2, "0")}`;
  }

  return (
    <>
      {!movie ? (
        <div>Chargement...</div>
      ) : (
        <div className="flex gap-4">
          <div className="w-1/3">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" className="rounded-lg shadow-lg" />
          </div>
          <div className="w-2/3 flex flex-col justify-between">
            <div className="pt-5">
              <h1 className="text-4xl font-bold text-white mb-1">
                {movie.title} - {new Date(movie.release_date).getFullYear()}
              </h1>
              <p className="text-xl text-white mb-1">
                {new Date(movie.release_date).toLocaleDateString()} -{" "}
                {movie.genres
                  ? movie.genres
                      .map((genre) => {
                        return genre.name;
                      })
                      .toString()
                  : ""}{" "}
                - {formatDuration(movie.runtime)}
              </p>
              <p className="text-white mb-1">
                Titre originale : {movie.original_title} - {movie.original_language.toUpperCase()}
              </p>
              <div className="flex items-center gap-4 my-4 mb-1 text-white">
                <span>{movie.vote_average}/10</span>
              </div>
              <p className="text-white mb-1">{movie.overview}</p>
            </div>
            <button className="mt-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-40">
              Ajouter à la liste de souhait
            </button>
            <h2 className="text-white text-xl my-10">Liste des acteurs</h2>
            <div className="flex flex-row flex-wrap gap-10">
              {actors ? (
                actors.map((actor) => (
                  <div className="flex flex-col justify-center" key={actor.id}>
                    <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor} className="w-32 h-48 object-cover rounded-lg mx-auto mb-4" />
                    <p className="text-white">{actor.name}</p>
                  </div>
                ))
              ) : (
                <p>Aucun acteur trouvé</p>
              )}
            </div>
            <div className="flex flex-row flex-wrap gap-10">
              {similarMovies ? similarMovies.map((similarMovie) => <MovieCard key={similarMovie.id} movie={similarMovie} />) : <p>Aucun titre similaire</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
