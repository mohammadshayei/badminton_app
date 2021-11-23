import * as actionTypes from "../actions/actionTypes";

const initialState = {
  widthMode: 0,
  heightMode: 0,
  os: "",
};

const WIDTH_B_MEDIUM = 600;
const WIDTH_B_LARGE = 900;

const HEIGHT_B_MEDIUM = 375;
const HEIGHT_B_LARGE = 600;

const setSize = (state, action) => {
  // console.log(action)
  let widthMode = 1;
  let heightMode = 1;
  if (action.width > WIDTH_B_MEDIUM) {
    widthMode = 2;
    if (action.height > HEIGHT_B_MEDIUM) heightMode = 2;
    else if (action.height > HEIGHT_B_LARGE) heightMode = 3;
  } else if (action.width > WIDTH_B_LARGE) {
    widthMode = 3;
    if (action.height > HEIGHT_B_MEDIUM) heightMode = 2;
    else if (action.height > HEIGHT_B_LARGE) heightMode = 3;
  }

  return {
    ...state,
    widthMode,
    heightMode,
  };
};

const setOs = (state, action) => {
  return {
    ...state,
    os: action.os,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SIZE:
      return setSize(state, action);
    case actionTypes.SET_OS:
      return setOs(state, action);
    default:
      return state;
  }
};

export default reducer;
