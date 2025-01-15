import { Link } from "react-router";
import Movie from "../types/Movie";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div key={movie.id} className="flex flex-col items-center gap-y-3 relative group cursor-pointer">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <div className="flex flex-row justify-around px-1">
        <h2 className="text-white">
          {movie.title} - {new Date(movie.release_date).toLocaleDateString()}
        </h2>
      </div>
      <Link
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex justify-center items-center text-white text-xl font-bold backdrop-blur"
        to={`/movie/${movie.id}`}
      >
        Voir plus
      </Link>
    </div>
  );
};

MovieCard.propTypes = {};

export default MovieCard;
