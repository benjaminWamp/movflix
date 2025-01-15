import { Routes, Route } from "react-router";
import Navbar from "./components/navbar";
import MoviesList from "./MoviesList";
import MovieDetail from "./MovieDetail";
import MovieProvider from "./context/movieProvider";

const App = () => {
  return (
    <>
      <MovieProvider>
        <Navbar />
        <div>
          <Routes>
            <Route index element={<MoviesList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </MovieProvider>
    </>
  );
};

export default App;
