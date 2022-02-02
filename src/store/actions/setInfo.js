import * as actionTypes from "./actionTypes";

export const increaseScore = ({ teamKey }) => (dispatch) => {
    dispatch({
        type: actionTypes.INCREASE_SCORE,
        payload: { teamKey },
    });
};

export const setOver = ({ teamKey, isForce = false }) => (dispatch) => {
    dispatch({
        type: actionTypes.SET_OVER,
        payload: { teamKey, isForce },
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

export const addEvent = ({ type, time, by, content, detail }) => (dispatch) => {
    dispatch({
        type: actionTypes.ADD_EVENT,
        payload: { type, time, by, content, detail },
    });
};

export const switchServer = () => (dispatch) => {
    dispatch({
        type: actionTypes.SWITCH_SERVER,
    });
};

export const switchSide = () => (dispatch) => {
    dispatch({
        type: actionTypes.SWITCH_SIDE,
    });
};

export const setScoreboardData = (data) => (dispatch) => {
    dispatch({
        type: actionTypes.SET_SCOREBOARD_DATA,
        payload: data,
    });
};

export const setChosen = ({ id, index }) => (dispatch) => {
    dispatch({
        type: actionTypes.SET_CHOSEN,
        payload: { id, index },
    });
};
export const setSetId = (id) => {
    return {
        type: actionTypes.SET_SET_ID,
        id
    };
};
export const removeEventFromStack = () => {
    return {
        type: actionTypes.REMOVE_EVENT_FROM_STACK,
    };
};

export const setPlayerPlace = ({ teamKey }) => {
    return {
        type: actionTypes.SET_PLAYER_PLACE,
        payload: { teamKey },
    };
};
