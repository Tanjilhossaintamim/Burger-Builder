import axios from "axios";
import * as actionTypes from "./ActionTypes";

const authenication_success = (userId, tokenId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { userId, tokenId },
  };
};

export const Authenication = (email, password, mode) => (dispatch) => {
  dispatch(Auth_is_loading(true));
  const auth_data = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  const API_KEY = "AIzaSyDECbI2PTSXh1qw6HIfwxhxFa_G8Pyq2ls";
  let URL = null;
  if (mode == "SignUp") {
    URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  } else {
    URL =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }
  axios
    .post(URL + API_KEY, auth_data)
    .then((response) => {
      if (response) {
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        const expaireTime = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("expiredTime", expaireTime);

        dispatch(
          authenication_success(response.data.localId, response.data.idToken)
        );
        dispatch(Auth_is_loading(false));
      }
    })
    .catch((err) => {
      dispatch(Auth_is_loading(false));
      dispatch(authenication_failed(err.response.data.error.message));
    });
};

export const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("expiredTime");
  return {
    type: actionTypes.USER_LOGOUT,
  };
};

export const Auth_is_loading = (is_loading) => {
  return {
    type: actionTypes.AUTH_IS_LOADING,
    payload: is_loading,
  };
};

export const authCheck = () => (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // logout
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("expiredTime");
    dispatch(logout());
  } else {
    if (new Date() >= new Date(localStorage.getItem("expiredTime"))) {
      // logout
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("expiredTime");
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authenication_success(userId, token));
    }
  }
};

const authenication_failed = (errMessage) => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: errMessage,
  };
};
