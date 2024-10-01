import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeDefault from "src/pages/Home/Index";
import Home from "src/pages/Home/Layout";
import Register from "../Authentication/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <HomeDefault />,
      },
      {
        path: "/Register",
        element: <Register/>
      }
    ],
  },
  
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
