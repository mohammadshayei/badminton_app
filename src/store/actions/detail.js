import * as actionTypes from "./actionTypes";

export const setSize = (height, width) => {
    return {
        type: actionTypes.SET_SIZE,
        height: height,
        width: width
    };
};

export const setOS = (os) => {
    return {
        type: actionTypes.SET_OS,
        os
    };
};
