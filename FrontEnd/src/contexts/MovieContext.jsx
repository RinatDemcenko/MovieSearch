import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const ProvideMovie = ({ children }) => {
  const getInitialFavs = () => {
    try {
      const storedFavs = localStorage.getItem("favs");
      if (storedFavs) {
        const parsedFavs = JSON.parse(storedFavs);
        return Array.isArray(parsedFavs) ? parsedFavs : [];
      }
      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const [favs, setFavs] = useState(getInitialFavs);

  useEffect(() => {
    try {
      localStorage.setItem("favs", JSON.stringify(favs));
    } catch (error) {
      console.error(error);
    }
  }, [favs]);

  const addFav = (movie) => {
    if (favs.some((fav) => fav.id === movie.id)) {
      return;
    }
    setFavs((prev) => [...prev, movie]);
  };

  const removeFav = (movieId) => {
    setFavs((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFav = (movieId) => {
    return favs.some((movie) => movie.id === movieId);
  };

  const value = {
    favs,
    addFav,
    removeFav,
    isFav,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};