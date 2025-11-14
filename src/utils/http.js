import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchPopularMovies = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const fetchMovie = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
  return response.data;
};

export const searchMovies = async (debouncedTerm) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${debouncedTerm}`
  );
  return response.data.results;
};
