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
export const setContents = (contents) => {
    return {
        type: actionTypes.SET_CONTENTS,
        contents
    };
}
export const setSelectedContent = (content) => {
    return {
        type: actionTypes.SET_SELECTED_CONTENT,
        content
    };
}
export const setMode = (mode) => {
    return {
        type: actionTypes.SET_MODE_HOME_PAGE,
        mode
    };
}

