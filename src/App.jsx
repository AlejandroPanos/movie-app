import { RouterProvider, createBrowserRouter } from "react-router";

import "./App.css";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  { path: "/", element: <Movies /> },
  { path: "movies/:id", element: <MovieDetail /> },
  { path: "*", element: <ErrorPage /> },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router}>
        <Movies />
      </RouterProvider>
    </>
  );
};

export default App;
