import { combineReducers } from "redux";

//reducers
import { productReducer, productDetailsReducer } from "./reducers/productReducer";

//reducers being combined into one function
export const rootReducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
});
