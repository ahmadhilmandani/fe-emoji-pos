import { createBrowserRouter } from "react-router";
import LoginIndex from "../pages/Login/Index";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginIndex,
  },
]);
