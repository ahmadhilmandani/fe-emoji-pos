import { createBrowserRouter } from "react-router";
import LoginIndex from "../pages/Login/Index";
import RegisterStoreIndex from "../pages/Register/Store/Index";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginIndex,
  },
  {
    path: "/register-store",
    Component: RegisterStoreIndex,
  },
]);
