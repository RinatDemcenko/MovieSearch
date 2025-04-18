const API_KEY = "29ce29fc4b1f7653aa98cac69eddb935";
const BASE_URL = "https://api.themoviedb.org/3/";

export const fetchTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  ) 
  const data = await response.json();
  return data.results;
}

export const fetchMovieById = async (id) => {
  const response = await fetch(
    `${BASE_URL}movie/${id}?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  const data = await response.json();
  return data;
};