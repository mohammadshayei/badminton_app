import * as actionTypes from "./actionTypes";


export const setTournaments = (tournaments) => {
    return {
        type: actionTypes.SET_TOURNAMENTS,
        tournaments
    };
}
export const setSelectedTournament = (tournament) => {
    return {
        type: actionTypes.SET_SELECTED_TOURNAMENT,
        tournament
    };
}

