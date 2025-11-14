import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useSearchParams } from "react-router";
import { fetchMovie } from "../utils/http";

const MovieDetail = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  const movieQuery = useQuery({
    queryKey: ["movie", params.id],
    queryFn: () => fetchMovie(params.id),
  });

  if (movieQuery.isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (movieQuery.isError) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-red-600 dark:text-red-400">
          Failed to load movie data
        </p>
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="min-h-screen bg-black text-white">
          {/* Hero background */}
          <div
            className="relative h-96 bg-cover bg-center"
            style={{
              backgroundImage: movieQuery?.data?.backdrop_path ? (
                `url(https://image.tmdb.org/t/p/w1280${movieQuery.data.backdrop_path})`
              ) : (
                <div>No backdrop available</div>
              ),
            }}
          >
            <div className="absolute inset-0 bg-linear-to-b from-black/60 to-black"></div>

            <Link
              to={search ? `/?search=${search}` : "/"}
              className="absolute top-8 left-8 text-blue-500 hover:text-blue-400 text-lg z-10"
            >
              ← Back to Movies
            </Link>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-7 items-center gap-8">
            <div className="col-start-1 col-end-7 lg:col-end-3">
              {/* Poster */}
              <img
                src={
                  movieQuery?.data?.poster_path ? (
                    `https://image.tmdb.org/t/p/w342${movieQuery.data.poster_path}`
                  ) : (
                    <div>No poster available</div>
                  )
                }
                alt={movieQuery?.data?.title}
                className="h-96 lg:h-full w-full object-cover rounded-lg shadow-2xl"
              />
            </div>

            <div className="col-span-5">
              <p className="text-blue-400 italic text-lg mb-4">
                {movieQuery?.data?.tagline}
              </p>

              <h1 className="text-6xl font-bold mb-6">
                {movieQuery?.data?.title}
              </h1>

              <div className="flex items-center gap-6 text-lg mb-8">
                <span>📅 {movieQuery?.data?.release_date.split("-")[0]}</span>
                <span>⭐ {movieQuery?.data?.vote_average.toFixed(2)}/10</span>
                <span>⏱️ {movieQuery?.data?.runtime}m</span>
              </div>

              <div className="mb-8">
                <h3 className="text-gray-400 uppercase text-sm font-semibold mb-3">
                  Genres
                </h3>
                <div className="flex gap-3">
                  {movieQuery?.data?.genres.map((g) => {
                    return (
                      <span
                        key={g.id}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm"
                      >
                        {g.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-gray-400 uppercase text-sm font-semibold mb-3">
                  Overview
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {movieQuery?.data?.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetail;
