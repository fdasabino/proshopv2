import { combineReducers } from "redux";

//reducers
import { productReducer, productDetailsReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { userLoginReducer } from "./reducers/userReducer";

//reducers being combined into one function
export const rootReducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});
