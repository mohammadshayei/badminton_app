import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    gameId: ''
};


const setGameId = (state, action) => {
    return updateObject(state, {
        gameId: action.id,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GAME_ID:
            return setGameId(state, action);
        default:
            return state;
    }
};

export default reducer;
