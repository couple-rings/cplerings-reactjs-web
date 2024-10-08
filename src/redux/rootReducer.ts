import { combineReducers } from "redux";
import authReducer from "./slice/auth.slice";
import districtReducer from "./slice/district.slice";
import routeReducer from "./slice/route.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  district: districtReducer,
  route: routeReducer,
});
