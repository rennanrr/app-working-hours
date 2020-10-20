import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { userSigninReducer } from './Reducers/userReducer';

const userInfo = localStorage.getItem("userInfo") || null;

const initialState = { userSignin: { userInfo } };
const reducer = combineReducers({
  userSignin: userSigninReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;