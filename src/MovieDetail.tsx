import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { MovieContext } from "./context/movieProvider";

const MovieDetail = () => {
  const { id } = useParams();

  const { fetchMovieDetail, movie } = useContext(MovieContext);

  useEffect(() => {
    fetchMovieDetail(parseInt(id));
  }, []);
  return (
    <>
      <div className="flex gap-4">
        <div className="w-1/3">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" className="rounded-lg shadow-lg" />
        </div>
        <div className="w-2/3 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold">Babygirl (2024)</h1>
            <p className="text-xl">15/01/2025 - Drame, Romance, Thriller - 1h 54m</p>
            <div className="flex items-center gap-4 my-4">
              <span className="bg-green-700 px-2 py-1 rounded-full">56% Score</span>
            </div>
            <p>Synopsis here...</p>
          </div>
          <div>
            <p>Director, Writer info...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
