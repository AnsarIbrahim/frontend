import { combineReducers } from "redux";
import { authReducer as auth } from "./auth";

export default combineReducers({
  auth,
});
