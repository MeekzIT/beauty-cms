import HomePage from "../Pages/home/Home";
import {
  DELETED_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  USER_PAGE,
  WORK_PAGE,
} from "./pats";
import LoginPage from "../Pages/login/Login";
import User from "../Pages/user/User";
import Work from "../Pages/work/Work";
import Deleted from "../Pages/deleted/Deleted";

export const isAuthPages = [
  { id: 1, path: HOME_PAGE, Component: <HomePage /> },
  { id: 2, path: USER_PAGE, Component: <User /> },
  { id: 3, path: WORK_PAGE, Component: <Work /> },
  { id: 3, path: DELETED_PAGE, Component: <Deleted /> },
];

export const notAuthPages = [{ id: 2, path: LOGIN_PAGE, Component: LoginPage }];
