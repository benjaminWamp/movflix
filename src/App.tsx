import { Routes, Route } from "react-router";
import Navbar from "./components/navbar";
import MoviesList from "./MoviesList";
import MovieDetail from "./MovieDetail";

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route index element={<MoviesList />} />
          <Route path="movie/id" element={<MovieDetail />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
