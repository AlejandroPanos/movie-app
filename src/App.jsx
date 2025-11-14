import { RouterProvider, createBrowserRouter } from "react-router";

import "./App.css";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";

const router = createBrowserRouter([
  { path: "/", element: <Movies /> },
  { path: "movies/:id", element: <MovieDetail /> },
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
