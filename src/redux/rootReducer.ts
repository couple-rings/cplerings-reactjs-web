import { combineReducers } from "redux";
import authReducer from "./slice/auth.slice";
import districtReducer from "./slice/district.slice";
import routeReducer from "./slice/route.slice";
import conversationReducer from "./slice/conversation.slice";
import messageReducer from "./slice/message.slice";
import designReducer from "./slice/design.slice";
import cartReducer from "./slice/cart.slice";
import configReducer from "./slice/config.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  district: districtReducer,
  route: routeReducer,
  conversation: conversationReducer,
  message: messageReducer,
  design: designReducer,
  cart: cartReducer,
  config: configReducer,
});
