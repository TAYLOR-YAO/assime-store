import axios from "axios";
import setStoreToken from "./setStoreToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_STORE,
  STORE_LOADING
} from "../Config/types";
// Register User
export const registerStore = (storeData, history) => dispatch => {
  axios
    .post("/api/stores/enroll", storeData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginStore = storeData => dispatch => {
  axios
    .post("/api/stores/login", storeData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("store_jwtToken", token);
      // Set token to Auth header
      setStoreToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentStore(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentStore = decoded => {
  return {
    type: SET_CURRENT_STORE,
    payload: decoded
  };
};
// User loading
export const setStoreLoading = () => {
  return {
    type: STORE_LOADING
  };
};
// Log user out
export const logoutStore = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("store_jwtToken");

  // Remove auth header for future requests
  setStoreToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentStore({}));

};
