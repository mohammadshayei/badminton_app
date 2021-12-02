import * as actionTypes from "./actionTypes";

export const increaseScore = (teamId, currentScore) => {
    return {
        type: actionTypes.SET_SIZE,
        teamId,
        currentScore
    };
};

