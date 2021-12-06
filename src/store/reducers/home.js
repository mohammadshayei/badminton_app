import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    tournaments: null,
    selectedTournament: null,
};

const setTournaments = (state, action) => {
    return updateObject(state, { tournaments: action.tournaments });
};
const setSelectedTournament = (state, action) => {
    return updateObject(state, { selectedTournament: action.tournament });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TOURNAMENTS:
            return setTournaments(state, action);
        case actionTypes.SET_SELECTED_TOURNAMENT:
            return setSelectedTournament(state, action);
        default:
            return state;
    }
};

export default reducer;
