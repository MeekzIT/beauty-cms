import { GET_ME, SET_AUTH } from "../types";
import { LOGIN_ACTION } from "../types";

const initialState = {
  isAuth: false,
  admin: null,
  isSuper: false,
};

export const isAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        isAuth: action.payload.isAuth,
        admin: action.payload.data,
        isSuper: action.payload.isSuper,
      };
    case SET_AUTH: {
      return {
        ...state,
        isAuth: action.payload,
      };
    }
    case GET_ME:
      return {
        ...state,
        admin: action.payload.data,
        isSuper: action.payload.isSuper,
      };

    default:
      return state;
  }
};
