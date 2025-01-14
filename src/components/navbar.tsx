import { NavLink } from "react-router";

const navbar = () => {
  return (
    <nav className="flex items-center justify-around p-3 mix-blend-normal bg-blend-normal bg-cyan-200">
      <NavLink to="/">
        <span className="text-3xl uppercase font-bold">mov</span>
        <span className="text-3xl uppercase font-bold text-sky-400">flix</span>
      </NavLink>
      <div className="flex gap-x-3.5">
        <NavLink to="/" className={({ isActive }) => (isActive ? "text-sky-400" : "")}>
          Liste des films
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => (isActive ? "text-sky-400" : "")}>
          Rechercher un film
        </NavLink>
        <NavLink to="/movie/1" className={({ isActive }) => (isActive ? "text-sky-400" : "")}>
          Liste de souhait
        </NavLink>
      </div>
    </nav>
  );
};

export default navbar;
