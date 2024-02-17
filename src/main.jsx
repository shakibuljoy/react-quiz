import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Quiz from "./components/pages/Quiz";
import Results from "./components/pages/Results";
import Signup from "./components/pages/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <PublicRoute><Signup /></PublicRoute>,
      },
      {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>,
      },
      {
        path: "/quiz/:id",
        element: <ProtectedRoute><Quiz /></ProtectedRoute>,
      },
      {
        path: "/results/:id",
        element: <ProtectedRoute><Results /></ProtectedRoute>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
