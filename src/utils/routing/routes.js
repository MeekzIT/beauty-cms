import Login from "../../components/login/Login";
import Orders from "../../components/orders/Orders";
import { LOGIN_PAGE, ORDERS_PAGE } from "./urls";

export const isAuthPages = [
  {
    id: 1,
    path: ORDERS_PAGE,
    name: "Orders",
    Component: Orders,
    icon: <ProductionQuantityLimitsIcon />,
  },
];

export const isntAuthPages = [
  {
    id: 1,
    path: LOGIN_PAGE,
    name: "Login",
    Component: Login,
    icon: <LockOpenIcon />,
  },
];
