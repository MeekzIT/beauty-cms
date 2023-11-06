import HomePage from "../Pages/home/Home";
import { HOME_PAGE, LOGIN_PAGE, USER_PAGE } from "./pats";
import LoginPage from "../Pages/login/Login";
import User from "../Pages/user/User";

export const isAuthPages = [
  { id: 1, path: HOME_PAGE, Component: <HomePage /> },
  { id: 2, path: USER_PAGE, Component: <User /> },
];

export const notAuthPages = [{ id: 2, path: LOGIN_PAGE, Component: LoginPage }];
