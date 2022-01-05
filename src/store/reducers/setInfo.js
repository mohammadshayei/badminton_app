import * as actionTypes from "../actions/actionTypes";

const initialState = {
    _id: "",
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
    undoMode: false,
};



const increaseScore = (state, action) => {
    const { teamKey } = action.payload;
    return {
        ...state,
        [teamKey]: {
            ...state[teamKey],
            score: state[teamKey].score + 1
        },
        undoMode: false,

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
            score: 0,
            server: state[teamKey].players.length > 1 ? 0 : state[teamKey].server,
            receiver: state[teamKey].players.length > 1 ? 0 : state[teamKey].receiver,
        },
        [otherTeam]: {
            ...state[otherTeam],
            scores: [...state[otherTeam].scores, state[otherTeam].score],
            score: 0,
            server: state[otherTeam].players.length > 1 ? 0 : state[otherTeam].server,
            receiver: state[otherTeam].players.length > 1 ? 0 : state[otherTeam].receiver,
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
const setSetId = (state, action) => {
    return {
        ...state,
        _id: action.id
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
    const { type, time, by, content, detail } = action.payload;
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
                content,
                detail
            }],
        eventCounter: newCounter,
        undoMode: false,
    };
};

const removeEventFromStack = (state, action) => {
    let updatedEvents = [...state.events]
    let event = updatedEvents[updatedEvents.length - 1]
    let prevEvent = updatedEvents.length > 1 && updatedEvents[updatedEvents.length - 2]
    let newCounter = state.eventCounter;
    let team1 = {
        score: state.team1.score,
        server: state.team1.server,
        receiver: state.team1.receiver,
    };
    let team2 = {
        score: state.team1.score,
        server: state.team1.server,
        receiver: state.team1.receiver,
    };
    if (event.type !== "increaseBall" && event.type !== "decreaseBall") newCounter--;
    if (event.type === 'score') {
        let team1ScoreExist = state.team1.players.find(item => item.id === event.by);
        // let team2ScoreExist = state.team2.players.find(item => item.id === event.by);
        let team1PrevScoreExist = state.team1.players.find(item => item.id === prevEvent.by);
        console.log(event)
        // if (team1ScoreExist) {
        //     team1 = {
        //         score: team1.score--,
        //     }
        // }
        // else{
        //     team2 = {
        //         score: team2.score--,
        //     }
        // } 

    }
    updatedEvents.splice(updatedEvents.length - 1, 1)

    return {
        ...state,
        events: updatedEvents,
        eventCounter: newCounter,
        team1: {
            ...state.team1,
            ...team1
        },
        team2: {
            ...state.team2,
            ...team2
        },
        undoMode: true
    };
};

const switchServer = (state, action) => {
    const { rev, left } = action.payload;
    let teamServer, teamReciver, server;
    if (state.team1.server === 0) {
        teamServer = "team1";
        teamReciver = "team2";
    }
    else {
        teamServer = "team2";
        teamReciver = "team1";
    }
    if (state.team1.players.length > 1)
        if (state[teamServer].score % 2 === 0) {
            if (left)
                if (rev) server = 1; else server = 2;
            else
                if (rev) server = 2; else server = 1;
        } else {
            if (left)
                if (rev) server = 2; else server = 1;
            else
                if (rev) server = 1; else server = 2;
        }
    else
        server = 1;
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
    team = state.team1.players.find(item => item.id === id) ? 'team1' : "team2"
    if (index === 1)
        right = true;
    else if (index === 2) {
        server = state[team].players.findIndex(item => item.id === id) + 1
    }
    else if (index === 3) {
        receiver = state[team].players.findIndex(item => item.id === id) + 1
    }
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
        case actionTypes.SET_SET_ID:
            return setSetId(state, action);
        case actionTypes.REMOVE_EVENT_FROM_STACK:
            return removeEventFromStack(state, action);
        default:
            return state;
    }
};

export default reducer;
