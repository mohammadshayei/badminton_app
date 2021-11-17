import * as actionTypes from "../actions/actionTypes";

const initialState = {
    whoHitsService: '',//کی سرویس را می زند
    scoreA: 0,
    scoreB: 0,
    setEvents: [
        {
            timeEvent: new Date(),//زمانی که اتفاق رخداده است
            playerName: '',
            typeEvent: ''
        }
    ],
    errors: [{
        team:'',//چه بازیکن یا تیمی  مرتکب خظا شده است
        timeError: new Date(),
        playerName: '',
        typeError: ''
    }]
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
