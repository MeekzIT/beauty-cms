import { combineReducers } from "redux";
import { isAuthReducer } from "./reducers/authReducer";

export const rootReducer = combineReducers({
  isAuthReducer,
});
