import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { v4 as uuidv4 } from "uuid";

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
const addTournament = (state, action) => {
    let updatedTournaments = [...state.tournaments]
    updatedTournaments = [{ tournament: action.tournament, _id: uuidv4().replace(/\-/g, ""), }, ...updatedTournaments]
    return updateObject(state, { tournaments: updatedTournaments });
};
const editTournament = (state, action) => {
    let updatedTournaments = [...state.tournaments]
    let findedTournamentIndex = updatedTournaments.findIndex(item => item.tournament._id === action.tournament._id)
    if (findedTournamentIndex < 0) {
        return;
    }
    updatedTournaments[findedTournamentIndex].tournament = action.tournament;
    return updateObject(state, { tournaments: updatedTournaments });
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
        case actionTypes.ADD_TOURNAMENT:
            return addTournament(state, action);
        case actionTypes.EDIT_TOURNAMENT:
            return editTournament(state, action);
        default:
            return state;
    }
};

export default reducer;
