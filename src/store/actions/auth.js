import * as actionTypes from "./actionTypes";
import axios from "axios";
import { baseUrl } from "../../constants/Config";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const getRefereeData = (refereeId, token) => {
  return (dispatch) => {
    return axios
      .post(`${baseUrl}api/get_referee_data`, { id: refereeId },
        { headers: { 'auth-token': token } })
      .then((result) => {
        dispatch({
          type: actionTypes.SET_REFEREE_DATA,
          referee: result.data.message.referee,
        });
      });
  };
};

export const authSuccess = (token, refereeId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    refereeId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("refereeId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (username, password, url) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      username,
      password,
    };
    axios
      .post(url, authData)
      .then((res) => {
        if (res.data.message.loginStatus) {
          localStorage.setItem("token", res.data.message.token);
          localStorage.setItem("refereeId", res.data.message.referee._id);
          dispatch(authSuccess(res.data.message.token, res.data.message.referee._id));
        } else {
          dispatch(authFail(`نام کاربری یا رمز عبور اشتباه می باشد`));
        }
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.message.loginStatus));
      });
  };
};
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const refereeId = localStorage.getItem("refereeId");

    if (!token || !refereeId) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, refereeId));
    }
  };
};
