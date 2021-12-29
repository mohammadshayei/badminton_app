import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    gameId: '',
    gameView: null
};


const setGameId = (state, action) => {
    return updateObject(state, {
        gameId: action.id,
    });
};
const setSelectedGameView = (state, action) => {
    return updateObject(state, {
        gameView: action.game,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GAME_ID:
            return setGameId(state, action);
        case actionTypes.SET_SELECTED_GAME_VIEW:
            return setSelectedGameView(state, action);
        default:
            return state;
    }
};

export default reducer;
