import * as actionTypes from "./actionTypes";
import axios from "axios";
import { baseUrl } from "../../constants/Config";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const getUserData = (token) => {
  return (dispatch) => {
    return axios
      .get(`${baseUrl}api/get_user_data`, { headers: { "auth-token": token } })
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER_DATA,
          user: result.data.result.user,
        });
      });
  };
};

export const setUserData = (user) => {
  return {
    type: actionTypes.SET_USER_DATA,
    user,
  };
};
export const changeUserInfo = (payload) => {
  return {
    type: actionTypes.CHANGE_USER_INFO,
    payload,
  };
};
export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
  };
};
export const setSocket = (socket) => {
  return {
    type: actionTypes.SET_SOCKET,
    socket,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("a1");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (input, password, url) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      input,
      password,
    };
    axios
      .post(url, authData)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("a1", res.data.result.token);
          dispatch(authSuccess(res.data.result.token));
          dispatch({
            type: actionTypes.SET_USER_DATA,
            user: res.data.result.user,
          });
        } else {
          dispatch(authFail(`نام کاربری یا رمز عبور اشتباه می باشد`));
        }
      })
      .catch((err) => {
        dispatch(authFail(`نام کاربری یا رمز عبور اشتباه می باشد`));
      });
  };
};
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
export const setChecked = () => {
  return {
    type: actionTypes.SET_CHECKED,
    checked: true,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("a1");

    if (!token) {
      dispatch(logout());
      dispatch(setChecked());
    } else {
      dispatch(authSuccess(token));
      dispatch(setChecked());
    }
  };
};
