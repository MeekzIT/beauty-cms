import axios from "axios";
import { keys } from "../../keys";
import { GET_ADMIN, LOGIN_ACTION, SET_AUTH } from "../types";
import { HOME_PAGE } from "../../routing/pats";
import Swal from "sweetalert2";

export const loginAction = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/admin/login`, data)
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: LOGIN_ACTION,
            payload: {
              isAuth: true,
              data: response.data.data,
              isSuper: response.data.data.role,
            },
          });
          localStorage.setItem("isAuth", JSON.stringify(true));
          localStorage.setItem(
            "isSuper",
            JSON.stringify(response.data.data.role)
          );
          localStorage.setItem(
            "email",
            JSON.stringify(response.data.data.email)
          );
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.data.token)
          );
          window.location.href = HOME_PAGE;
        } else
          Swal.fire({
            position: "center",
            iconColor: "#1d37de",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            title: "Неправильные Данные",
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const setAuthAction = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_AUTH, payload: data });
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/admin/logout`,
        { email: keys.email },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.succes) {
          // dispatch({ type: SET_AUTH, payload: false });
          localStorage.removeItem("isAuth");
          localStorage.removeItem("isSuper");
          localStorage.removeItem("token");
          localStorage.clear();
          window.location.href = "/";
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const getMe = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/admin`, {
        params: {
          email: keys.email,
        },
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: LOGIN_ACTION,
          payload: {
            isAuth: true,
            data: response.data.data,
            isSuper: response.data.data.role,
          },
        });
        localStorage.setItem("isAuth", JSON.stringify(true));
        localStorage.setItem(
          "isSuper",
          JSON.stringify(response.data.data.role)
        );
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getAdmin = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/admin/get-admin`, {
        params: {
          email: keys.email,
        },
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ADMIN,
          payload: {
            data: response.data.data,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
