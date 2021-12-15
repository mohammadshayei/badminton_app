import * as actionTypes from "./actionTypes";

export const increaseScore = ({ teamKey }) => (dispatch) => {
    dispatch({
        type: actionTypes.INCREASE_SCORE,
        payload: { teamKey },
    });
};

export const setOver = ({ teamKey }) => (dispatch) => {
    dispatch({
        type: actionTypes.SET_OVER,
        payload: { teamKey },
    });
};

export const increaseBall = () => (dispatch) => {
    dispatch({
        type: actionTypes.INCREASE_BALL,
    });
};

export const decreaseBall = () => (dispatch) => {
    dispatch({
        type: actionTypes.DECREASE_BALL,
    });
};

export const foulHappend = ({ foulType }) => (dispatch) => {
    dispatch({
        type: actionTypes.FOUL_HAPPEND,
        payload: { foulType },
    });
};

export const addEvent = ({ type, time, by, content }) => (dispatch) => {
    dispatch({
        type: actionTypes.ADD_EVENT,
        payload: { type, time, by, content },
    });
};

export const switchServer = ({ server }) => (dispatch) => {
    dispatch({
        type: actionTypes.SWITCH_SERVER,
        payload: { server },
    });
};