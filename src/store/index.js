import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { isAuthReducer } from "./reducers/auth-reducer";
import { userReducer } from "./reducers/user-reducer";
const rootReducer = combineReducers({
  auth: isAuthReducer,
  users: userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
