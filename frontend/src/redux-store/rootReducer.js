import { combineReducers } from "redux";

//reducers
import { productReducer, productDetailsReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
} from "./reducers/userReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMyListReducer,
  orderPayReducer,
} from "./reducers/orderReducer";

//reducers being combined into one function
export const rootReducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,
});
