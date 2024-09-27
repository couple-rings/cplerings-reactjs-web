import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeDefault from "src/pages/Home/Index";
import Home from "src/pages/Home/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <HomeDefault />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
