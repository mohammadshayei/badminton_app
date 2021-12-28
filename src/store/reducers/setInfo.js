import * as actionTypes from "../actions/actionTypes";

const initialState = {
    team1: {
        players: [],
        isRightTeam: false,
        server: 0,
        receiver: 1,
        score: 0,
        scores: [],
        setWon: 0,
       
    },
    team2: {
        players: [],
        isRightTeam: false,
        server: 0,
        receiver: 1,
        score: 0,
        scores: [],
        setWon: 0,
       
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
    const tempEvents = [...state.events];
    return {
        ...state,
        [teamKey]: {
            ...state[teamKey],
            setWon: state[teamKey].setWon + 1,
            scores: [...state[teamKey].scores, state[teamKey].score],
            score: 0
        },
        [otherTeam]: {
            ...state[otherTeam],
            scores: [...state[otherTeam].scores, state[otherTeam].score],
            score: 0
        },
        eventCounter: 0,
        events: [],
        totalEvents: [...state.totalEvents, ...tempEvents]
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

const setScoreboardData = (state, action) => {
    const data = action.payload;
    let team1Players, team2Players;
    team1Players = [{
        id: data.teamA.players[0].player._id,
        name: data.teamA.players[0].player.username,
        avatar: data.teamA.players[0].player.image
    }];
    team2Players = [{
        id: data.teamB.players[0].player._id,
        name: data.teamB.players[0].player.username,
        avatar: data.teamB.players[0].player.image
    }];
    if (data.game_type === "double") {
        team1Players = [...team1Players,
        {
            id: data.teamA.players[1].player._id,
            name: data.teamA.players[1].player.username,
            avatar: data.teamA.players[1].player.image
        }
        ];
        team2Players = [...team2Players,
        {
            id: data.teamB.players[1].player._id,
            name: data.teamB.players[1].player.username,
            avatar: data.teamB.players[1].player.image
        }];
    }
    return {
        ...state,
        team1: {
            ...state.team1,
            players: [...team1Players],
            isRightTeam: false,
            server: 0,
            receiver: 1,
            score: 0,
            setWon: 0,
         
        },
        team2: {
            ...state.team2,
            players: [...team2Players],
            isRightTeam: false,
            server: 0,
            receiver: 1,
            score: 0,
            setWon: 0,
          
        }
    };
};

const setChosen = (state, action) => {
    const { id, index } = action.payload;
    let team, server, receiver = 0, right;
    if (id.substr(0, 1) === "A")
        team = "team1";
    else
        team = "team2";
    if (index === 1)
        right = true;
    else if (index === 2)
        server = parseInt(id.substr(1, 1));
    else if (index === 3)
        receiver = parseInt(id.substr(1, 1));
    return {
        ...state,
        [team]: {
            ...state[team],
            isRightTeam: index === 1 ? right : state[team].isRightTeam,
            server: index === 2 ? server : state[team].server,
            receiver: index !== 1 ? receiver : state[team].receiver
        },
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
        case actionTypes.SET_SCOREBOARD_DATA:
            return setScoreboardData(state, action);
        case actionTypes.SET_CHOSEN:
            return setChosen(state, action);
        default:
            return state;
    }
};

export default reducer;
