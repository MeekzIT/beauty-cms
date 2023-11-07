import {
  ADD_SERVICES,
  ADD_USER,
  DELETE_SERVICES,
  DELETE_USER,
  DENGER_DELETE,
  EDIT_SERVICES,
  GET_RESULTS,
  GET_SERVICES,
  GET_USERS,
} from "../types";

const initialState = {
  users: null,
  services: null,
  results: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload.data };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((i) => i.id !== action.payload),
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case GET_SERVICES:
      return { ...state, services: action.payload.data.date };
    case DELETE_SERVICES:
      return {
        ...state,
        services: state.services.filter((i) => i.id !== action.payload),
      };
    case EDIT_SERVICES:
      const editedData = state.services.map((i) =>
        i.id == action.payload.id ? action.payload : i
      );
      return {
        ...state,
        services: editedData,
      };
    case ADD_SERVICES:
      return {
        ...state,
        services: [...state.services, action.payload],
      };
    case GET_RESULTS:
      return {
        ...state,
        results: action.payload.data,
      };
    case DENGER_DELETE:
      return {
        ...state,
        users: null,
        services: null,
        results: null,
      };
    default:
      return state;
  }
};
