import jwt from 'jwt-decode'
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_LOGOUT } from "../Constants/userConstants";

function userSigninReducer(state = {}, action) {
  const token = localStorage.getItem('X-ACCESS-TOKEN');
  if(token)
    return { userInfo: jwt(token) };
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
      case USER_LOGOUT:
      return {};
    default: return state;
  }
}
export {
  userSigninReducer
}