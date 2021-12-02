import * as actionTypes from "../actions/actionTypes";

const initialState = {
    competitionNumber: 0,
    landNumber: 0,
    typeGame: 0,
    teamA: {
        id: '',
        name: "",
        imagePath: '',
        players: [
            {
                id: '',
                name: '',
                imagePath: '',
            }
        ]

    },
    teamB: {
        id: '',
        name: "",
        imagePath: '',
        players: [
            {
                id: '',
                name: '',
                imagePath: '',
            }
        ]

    },
    refereeName: {
        id: "",
        name: "",
        imagePath: ''
    },
    serviceRefereeName: {
        id: "",
        name: "",
        imagePath: ''
    },
    score: 21, // یعنی گیم چند امتیاز است
    sets: []//اطلاعات کامل هر ست تو این ریخته میشه
};



const setOs = (state, action) => {
    return {
        ...state,
        os: action.os,
    };
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;
