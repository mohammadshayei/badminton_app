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
      .post(
        `${baseUrl}api/get_referee_data`,
        { id: refereeId },
        { headers: { "auth-token": token } }
      )
      .then((result) => {
        dispatch({
          type: actionTypes.SET_REFEREE_DATA,
          referee: result.data.message.referee,
        });
      });
  };
};

export const setRefereeData = (referee) => {
  return {
    type: actionTypes.SET_REFEREE_DATA,
    referee,
  };
};
export const changeRefereeInfo = (payload) => {
  return {
    type: actionTypes.CHANGE_REFEREE_INFO,
    payload,
  };
};
export const authSuccess = (token, refereeId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    refereeId,
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
  localStorage.removeItem("refereeId");
  localStorage.removeItem("token");

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
        if (res.data.message.loginStatus) {
          localStorage.setItem("token", res.data.message.token);
          localStorage.setItem("refereeId", res.data.message.referee._id);
          dispatch(
            authSuccess(res.data.message.token, res.data.message.referee._id)
          );
          dispatch({
            type: actionTypes.SET_REFEREE_DATA,
            referee: res.data.message.referee,
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
    const token = localStorage.getItem("token");
    const refereeId = localStorage.getItem("refereeId");

    if (!token || !refereeId) {
      dispatch(logout());
      dispatch(setChecked());
    } else {
      dispatch(authSuccess(token, refereeId));
      dispatch(setChecked());
    }
  };
};
