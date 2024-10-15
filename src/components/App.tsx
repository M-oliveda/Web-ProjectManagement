import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";

import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import HomePage from "../pages/home";
import UserContextProvider from "./UserContextProvider";
import RootLayout from "../pages/layout";

const routes = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <StrictMode>
      <UserContextProvider>
        <RouterProvider router={routes} />
      </UserContextProvider>
    </StrictMode>
  );
}
