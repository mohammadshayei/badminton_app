import * as actionTypes from "../actions/actionTypes";

const initialState = {
    team1: {
        players:
            [{
                id: "",
                name: "محمود کاظمی",
                avatar: require('../../assets/images/avatars/1.jpg')
            },
            {
                id: "",
                name: "حسن حمیدی",
                avatar: require('../../assets/images/avatars/2.jpg')
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
                avatar: require('../../assets/images/avatars/3.jpg')
            },
            {
                id: "",
                name: "محمد احمدی",
                avatar: ''
            }],
        isRightTeam: true,
        server: 0,
        receiver: 1,
        score: 0,
        setWon: 0,
        fouls: {
        }
    },
    events: [],
    totalEvents: [],
    balls: 1,
    foulHappend: null,
    eventCounter: 0,
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
    const tempEvents = state.events;
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
        },
        eventCounter: 0,
        events: [],
        totalEvents: tempEvents
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

const foulHappend = (state, action) => {
    const { foulType } = action.payload;
    return {
        ...state,
        foulHappend: foulType
    };
};

const addEvent = (state, action) => {
    const { type, time, by, content } = action.payload;
    let newCounter = state.eventCounter;
    if (type !== "increaseBall" && type !== "decreaseBall") newCounter++;
    return {
        ...state,
        events: [
            ...state.events,
            {
                time,
                type,
                by,
                content
            }],
        eventCounter: newCounter,
    };
};

const switchServer = (state, action) => {
    const { server } = action.payload;
    let teamServer, teamReciver;
    if (state.team1.server === 0) {
        teamServer = "team1";
        teamReciver = "team2";
    }
    else {
        teamServer = "team2";
        teamReciver = "team1";
    }
    return {
        ...state,
        [teamServer]: {
            ...state[teamServer],
            server: server
        },
        [teamReciver]: {
            ...state[teamReciver],
            server: 0
        }
    };
};

const switchSide = (state, action) => {
    return {
        ...state,
        team1: {
            ...state.team1,
            isRightTeam: !state.team1.isRightTeam
        },
        team2: {
            ...state.team2,
            isRightTeam: !state.team2.isRightTeam
        }
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
        case actionTypes.FOUL_HAPPEND:
            return foulHappend(state, action);
        case actionTypes.ADD_EVENT:
            return addEvent(state, action);
        case actionTypes.SWITCH_SERVER:
            return switchServer(state, action);
        case actionTypes.SWITCH_SIDE:
            return switchSide(state, action);
        default:
            return state;
    }
};

export default reducer;
