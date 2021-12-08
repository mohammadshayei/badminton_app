import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    tournaments: [],
    selectedTournament: null,
    contents: [],
    selectedContent: null,
    mode: 'games',
};

const setTournaments = (state, action) => {
    return updateObject(state, { tournaments: action.tournaments });
};
const setSelectedTournament = (state, action) => {
    return updateObject(state, { selectedTournament: action.tournament });
};
const setContents = (state, action) => {
    return updateObject(state, { contents: action.contents });
};
const setSelectedContent = (state, action) => {
    return updateObject(state, { setSelectedContent: action.content });
};
const setMode = (state, action) => {
    return updateObject(state, { mode: action.mode });
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TOURNAMENTS:
            return setTournaments(state, action);
        case actionTypes.SET_SELECTED_TOURNAMENT:
            return setSelectedTournament(state, action);
        case actionTypes.SET_CONTENTS:
            return setContents(state, action);
        case actionTypes.SET_SELECTED_CONTENT:
            return setSelectedContent(state, action);
        case actionTypes.SET_MODE_HOME_PAGE:
            return setMode(state, action);
        default:
            return state;
    }
};

export default reducer;
