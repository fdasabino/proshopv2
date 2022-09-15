import { USER_CONSTANT_TYPES } from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CONSTANT_TYPES.USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_CONSTANT_TYPES.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_CONSTANT_TYPES.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_CONSTANT_TYPES.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
