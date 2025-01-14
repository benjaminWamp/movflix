import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [categoryMovie, setCategoryMovie] = useState("popular");
  const [movieSearch, setMovieSearch] = useState("");

  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(movieSearch.toLowerCase()));

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

  useEffect(() => {
    fetchMovies();
  }, [categoryMovie]);

  return (
    <>
      <div className="flex flex-row gap-x-2 px-10 pt-10">
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-25 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setCategoryMovie(e.target.value)}
          value={categoryMovie}
        >
          <option selected value="popular">
            Populaire
          </option>
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
      <div className="grid grid-cols-10 p-10 gap-10">
        {filteredMovies.map((movie) => {
          return (
            <div key={movie.id} className="flex flex-col items-center gap-y-3 relative group cursor-pointer">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className="flex flex-row justify-around px-1">
                <h2>
                  {movie.title} - {new Date(movie.release_date).toLocaleDateString()}
                </h2>
              </div>
              <Link
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex justify-center items-center text-white text-xl font-bold backdrop-blur"
                to={"/movie/:id"}
              >
                Voir plus
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MoviesList;
