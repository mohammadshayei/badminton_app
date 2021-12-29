import * as actionTypes from "./actionTypes";

export const setGameId = (id) => {
    return {
        type: actionTypes.SET_GAME_ID,
        id,
    };
};
