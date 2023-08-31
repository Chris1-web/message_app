import React from "react";
import ReactDOM from "react-dom/client";
import Navigation from "./components/Navigation";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        path: "login",
        element: (
          <p>
            Login Page <Link to="/sign-up">Go to sign up page</Link>{" "}
          </p>
        ),
      },
      {
        path: "sign-up",
        element: (
          <p>
            Sign up Page. <Link to="/login">Go to Login Page</Link>
          </p>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
