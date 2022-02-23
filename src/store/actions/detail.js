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
export const setMenuStatus = (status) => {
    return {
        type: actionTypes.SET_MENU_STATUS,
        status
    };
};
export const setIp = (ip) => {
    return {
        type: actionTypes.SET_IP,
        ip
    };
};

