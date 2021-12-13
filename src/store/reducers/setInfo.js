import * as actionTypes from "../actions/actionTypes";

const initialState = {
    team1: {
        players:
            [{
                id: "",
                name: "محمود کاظمی",
                imageSrc: ""
            },
            {
                id: "",
                name: "حسن حمیدی",
                imageSrc: ""
            }],
        isRightTeam: false,
        server: 1,
        receiver: 0,
        score: 0,
        setWon: 0,
        fouls: {
        }
    },
    team2: {
        players:
            [{
                id: "",
                name: "شایان برومند",
                imageSrc: ""
            },
            {
                id: "",
                name: "محمد احمدی",
                imageSrc: ""
            }],
        isRightTeam: true,
        server: 0,
        receiver: 2,
        score: 0,
        setWon: 0,
        fouls: {
        }
    },
    events: {},
    balls: 1,
    isWaiting: false
};



const increaseScore = (state, action) => {
    const { teamKey } = action.payload;
    return {
        ...state,
        [teamKey]: {
            ...state[teamKey],
            score: state[teamKey].score + 1
        }
    };
};

const setOver = (state, action) => {
    const { teamKey } = action.payload;
    let otherTeam;
    if (teamKey === "team1")
        otherTeam = "team2"
    else
        otherTeam = "team1";
    return {
        ...state,
        [teamKey]: {
            ...state[teamKey],
            setWon: state[teamKey].setWon + 1,
            score: 0
        },
        [otherTeam]: {
            ...state[otherTeam],
            score: 0
        }
    };
};

const increaseBall = (state) => {
    return {
        ...state,
        balls: state.balls + 1
    };
};

const decreaseBall = (state) => {
    return {
        ...state,
        balls: state.balls - 1
    };
};

const setAwait = (state, action) => {
    const { waiting } = action.payload;
    return {
        ...state,
        isWaiting: waiting
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREASE_SCORE:
            return increaseScore(state, action);
        case actionTypes.SET_OVER:
            return setOver(state, action);
        case actionTypes.INCREASE_BALL:
            return increaseBall(state);
        case actionTypes.DECREASE_BALL:
            return decreaseBall(state);
        case actionTypes.SET_AWAIT:
            return setAwait(state, action);
        default:
            return state;
    }
};

export default reducer;
