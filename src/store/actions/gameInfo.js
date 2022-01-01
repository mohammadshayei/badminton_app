import * as actionTypes from "./actionTypes";

export const setGameId = (id) => {
    return {
        type: actionTypes.SET_GAME_ID,
        id,
    };
};
export const setGameView = (game) => {
    return {
        type: actionTypes.SET_SELECTED_GAME_VIEW,
        game,
    };
};
export const setGameReferee = (game) => {
    return {
        type: actionTypes.SET_SELECTED_GAME_REFEREE,
        game,
    };
};
