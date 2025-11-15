import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">Oops!</h1>
          <p className="text-xl text-gray-400 mb-8">Something went wrong.</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
