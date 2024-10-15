import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";

import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import HomePage from "../pages/home";
import ProfilePage from "../pages/profile";
import { CheckoutForm, Return } from "../pages/Stripe";
import UserContextProvider from "./UserContextProvider";
import RootLayout from "../pages/layout";
import ProjectsPage from "../pages/projects";
import TasksPage from "../pages/tasks";

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
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/checkout",
        element: <CheckoutForm />,
      },
      {
        path: "/return",
        element: <Return />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
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
