import * as actionTypes from "../actions/actionTypes";

const initialState = {
    sizeMode: 0,
    width: 0,
    height: 0,
    os: ''
};

const SMALL_SIZE = 500
const MEDIUM_SIZE = 960


const setSize = (state, action) => {
    let sizeMode;
    if (action.width <= SMALL_SIZE) sizeMode = 1
    else if (action.width <= MEDIUM_SIZE) sizeMode = 2
    else sizeMode = 3
    return {
        ...state,
        sizeMode,
        width: action.width,
        height: action.height
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
