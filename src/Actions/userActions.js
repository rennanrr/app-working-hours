import jwt from 'jwt-decode'
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_LOGOUT } from "../Constants/userConstants";
import Api from "../Services/Api";

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Api.post("/user/signin", { email, password });
    
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: jwt(data) });
    localStorage.setItem('X-ACCESS-TOKEN', data);
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}
const logout = () => (dispatch) => {
  localStorage.removeItem("X-ACCESS-TOKEN");
  dispatch({ type: USER_LOGOUT })
}

export { signin, logout };