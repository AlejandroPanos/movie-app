import { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { Link, useSearchParams } from "react-router";

import { fetchPopularMovies, searchMovies } from "../utils/http";

import Header from "../components/Header";
import Nav from "../components/Nav";

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchFromURL = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(searchFromURL);
  const [debouncedTerm, setDebouncedTerm] = useState(searchFromURL);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      setSearchParams({ search: debouncedTerm });
    } else {
      setSearchParams({}); // Remove search param if empty
    }
  }, [debouncedTerm, setSearchParams]);

  const popularQuery = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: fetchPopularMovies,
    enabled: !debouncedTerm,
  });

  const searchQuery = useQuery({
    queryKey: ["movies", "search", debouncedTerm],
    queryFn: () => searchMovies(debouncedTerm),
    enabled: debouncedTerm.length > 0,
  });

  if (popularQuery.isLoading || searchQuery.isLoading) {
    return (
      <>
        <Header />
        <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex items-center justify-center p-8">
          <div className="w-10 h-10 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  if (popularQuery.isError || searchQuery.isError) {
    return (
      <>
        <Header />
        <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex items-center justify-center p-8">
          <p className="text-red-600 dark:text-red-400">Failed to load data</p>
        </div>
      </>
    );
  }

  const movies = debouncedTerm ? searchQuery?.data : popularQuery?.data;

  if (debouncedTerm && (!movies || movies.length === 0)) {
    return (
      <>
        <Header />
        <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex items-center justify-center p-8">
          <p className="text-red-600 dark:text-red-400">No results found!</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <section>
        <div className="container mx-auto p-4 my-4">
          <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => {
              return (
                <Link
                  to={`/movies/${movie.id}/?${searchParams.toString()}`}
                  key={movie.id}
                  className="relative bg-transparent dark:bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-all duration-200"
                >
                  <span className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full z-10">
                    ⭐ {movie.vote_average.toFixed(2)}
                  </span>

                  <img
                    src={
                      movie.poster_path ? (
                        `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                      ) : (
                        <div>No poster available</div>
                      )
                    }
                    alt={movie.original_title}
                    className="w-full rounded-lg h-88 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {movie.original_title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {movie.release_date.split("-")[0]}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Movies;
