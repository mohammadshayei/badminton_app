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

export const setAwait = ({ waiting }) => (dispatch) => {
    dispatch({
        type: actionTypes.SET_AWAIT,
        payload: { waiting },
    });
};