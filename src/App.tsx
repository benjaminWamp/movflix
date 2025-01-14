import React from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/navbar";
import MoviesList from "./MoviesList";

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route index element={<MoviesList />} />
          <Route path="movie/:id" element={<MoviesList />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
