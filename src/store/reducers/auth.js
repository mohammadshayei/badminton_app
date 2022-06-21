import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  refereeId: null,
  referee: null,
  error: null,
  loading: false,
  authRedirectPath: null,
  checked: false,
  socket: null,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const setSocket = (state, action) => {
  return updateObject(state, { socket: action.socket });
};
const setRefereeData = (state, action) => {
  return updateObject(state, {
    referee: action.referee,
  });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    refereeId: action.refereeId,
    error: null,
    loading: false,
    authRedirectPath: "/home",
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    refereeId: null,
  });
};
const changeRefereeInfo = (state, action) => {
  const { key, value } = action.payload;
  let updatedReferee = { ...state.referee };
  updatedReferee[key] = value;
  return {
    ...state,
    referee: updatedReferee,
  };
};
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};
const setChecked = (state, action) => {
  return updateObject(state, { checked: action.checked });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.SET_REFEREE_DATA:
      return setRefereeData(state, action);
    case actionTypes.SET_CHECKED:
      return setChecked(state, action);
    case actionTypes.SET_SOCKET:
      return setSocket(state, action);
    case actionTypes.CHANGE_REFEREE_INFO:
      return changeRefereeInfo(state, action);
    default:
      return state;
  }
};

export default reducer;
