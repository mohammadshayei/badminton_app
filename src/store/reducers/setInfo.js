import * as actionTypes from "../actions/actionTypes";

const initialState = {
  _id: "",
  team1: {
    players: [],
    isRightTeam: false,
    server: 0,
    receiver: 1,
    isTop: false,
    score: 0,
    scores: [],
    setWon: 0,
  },
  team2: {
    players: [],
    isRightTeam: false,
    server: 0,
    receiver: 1,
    isTop: false,
    score: 0,
    scores: [],
    setWon: 0,
  },
  playersSwaped: -1,
  events: [],
  totalEvents: [],
  balls: 1,
  foulHappend: null,
  eventCounter: 0,
  lastPoint: "",
  undoMode: false,
  setOver: false,
  readyForSendData: false,
  midStage: false,
  initTeam1: {
    server: 0,
    receiver: 1,
  },
  initTeam2: {
    server: 0,
    receiver: 1,
  },
};

const increaseScore = (state, action) => {
  const { teamKey } = action.payload;
  return {
    ...state,
    [teamKey]: {
      ...state[teamKey],
      score: state[teamKey].score + 1,
    },
    lastPoint: teamKey,
    undoMode: false,
  };
};

const setOver = (state, action) => {
  const { teamKey, isForce } = action.payload;
  let otherTeam;
  if (teamKey === "team1") otherTeam = "team2";
  else otherTeam = "team1";
  // const tempEvents = [...state.events];
  return {
    ...state,
    [teamKey]: {
      ...state[teamKey],
      setWon: !isForce ? state[teamKey].setWon + 1 : state[teamKey].setWon,
      scores: [...state[teamKey].scores, state[teamKey].score],
      score: 0,
      server: state[teamKey].players.length > 1 ? 0 : state[teamKey].server,
      receiver: state[teamKey].players.length > 1 ? 0 : state[teamKey].receiver,
      isTop: state[teamKey].players.length > 1 ? 0 : state[teamKey].isTop,
    },
    [otherTeam]: {
      ...state[otherTeam],
      scores: [...state[otherTeam].scores, state[otherTeam].score],
      score: 0,
      server: state[otherTeam].players.length > 1 ? 0 : state[otherTeam].server,
      receiver:
        state[otherTeam].players.length > 1 ? 0 : state[otherTeam].receiver,
      isTop: state[teamKey].players.length > 1 ? 0 : state[teamKey].isTop,
    },
    eventCounter: 0,
    // events: [],
    lastPoint: "",
    setOver: true,
    // totalEvents: [...state.totalEvents, ...tempEvents]
  };
};
const clearEventsAndAddToTotalEvents = (state, action) => {
  const tempEvents = [...state.events];
  return {
    ...state,
    events: [],
    setOver: false,
    totalEvents: [...state.totalEvents, ...tempEvents],
  };
};
const increaseBall = (state) => {
  return {
    ...state,
    balls: state.balls + 1,
  };
};
const setSetId = (state, action) => {
  return {
    ...state,
    _id: action.id,
  };
};

const decreaseBall = (state) => {
  return {
    ...state,
    balls: state.balls - 1,
  };
};

const foulHappend = (state, action) => {
  const { foulType } = action.payload;
  return {
    ...state,
    foulHappend: foulType,
  };
};

const addEvent = (state, action) => {
  const { type, time, by, content, detail } = action.payload;
  let newCounter = state.eventCounter;
  newCounter++;
  return {
    ...state,
    events: [
      ...state.events,
      {
        time,
        type,
        by,
        content,
        detail,
      },
    ],
    eventCounter: newCounter,
    undoMode: false,
  };
};

const removeEventFromStack = (state, action) => {
  let updatedEvents = [...state.events];
  let event = updatedEvents[updatedEvents.length - 1];
  let newCounter = state.eventCounter;
  let lastPoint = state.lastPoint;
  let team1 = {
    score: state.team1.score,
    server: state.team1.server,
    receiver: state.team1.receiver,
    isTop: state.team1.isTop,
  };
  let team2 = {
    score: state.team2.score,
    server: state.team2.server,
    receiver: state.team2.receiver,
    isTop: state.team2.isTop,
  };
  newCounter--;
  if (event.type === "score") {
    lastPoint = event.detail.server.teamName === "team1" ? "team1" : "team2";
    let team1ScoreExist = state.team1.players.find(
      (item) => item.id === event.by
    );
    team1 = {
      score: team1ScoreExist ? team1.score - 1 : team1.score,
      server:
        event.detail.server.teamName === "team1"
          ? event.detail.server.number
          : 0,
      receiver:
        event.detail.receiver.teamName === "team1"
          ? event.detail.receiver.number
          : 0,
      isTop:
        event.detail.server.teamName === "team1"
          ? event.detail.server.isTop
          : event.detail.receiver.isTop,
    };
    team2 = {
      score: team1ScoreExist ? team2.score : team2.score - 1,
      server:
        event.detail.server.teamName === "team2"
          ? event.detail.server.number
          : 0,
      receiver:
        event.detail.receiver.teamName === "team2"
          ? event.detail.receiver.number
          : 0,
      isTop:
        event.detail.server.teamName === "team2"
          ? event.detail.server.isTop
          : event.detail.receiver.isTop,
    };
    if (
      updatedEvents.length > 1 &&
      updatedEvents[updatedEvents.length - 2].type === "Fault"
    ) {
      updatedEvents.splice(updatedEvents.length - 1, 1);
      newCounter--;
    }
  }

  updatedEvents.splice(updatedEvents.length - 1, 1);
  return {
    ...state,
    events: updatedEvents,
    eventCounter: newCounter,
    team1: {
      ...state.team1,
      ...team1,
    },
    team2: {
      ...state.team2,
      ...team2,
    },
    lastPoint,
    undoMode: true,
  };
};

const switchServer = (state) => {
  let teamServer,
    teamReceiver,
    server,
    isTopServer,
    receiver,
    newCounter,
    detail;
  if (state.team1.server === 0) {
    teamServer = "team1";
    teamReceiver = "team2";
  } else {
    teamServer = "team2";
    teamReceiver = "team1";
  }
  if (state.team1.players.length > 1) {
    if (state[teamServer].score % 2 === 0) {
      if (!state[teamServer].isRightTeam) isTopServer = false;
      else isTopServer = true;
    } else {
      if (!state[teamServer].isRightTeam) isTopServer = true;
      else isTopServer = false;
    }

    if (state[teamReceiver].isTop) {
      server = isTopServer
        ? state[teamServer].receiver === 2
          ? 1
          : 2
        : state[teamServer].receiver;
    } else {
      server = isTopServer
        ? state[teamServer].receiver
        : state[teamServer].receiver === 2
        ? 1
        : 2;
    }

    if (state[teamReceiver].isTop) {
      receiver = isTopServer
        ? state[teamReceiver].server === 2
          ? 1
          : 2
        : state[teamReceiver].server;
    } else {
      receiver = isTopServer
        ? state[teamReceiver].server
        : state[teamReceiver].server === 2
        ? 1
        : 2;
    }
  } else server = 1;
  newCounter = state.eventCounter;
  newCounter += 1;
  detail = {
    server: {
      number: state[teamReceiver].server,
      teamName: teamReceiver,
      isTop: state[teamReceiver].isTop,
    },
    receiver: {
      number: state[teamServer].receiver,
      teamName: teamServer,
      isTop: state[teamServer].isTop,
    },
  };
  return {
    ...state,
    [teamServer]: {
      ...state[teamServer],
      server,
      receiver: 0,
      isTop: isTopServer,
    },
    [teamReceiver]: {
      ...state[teamReceiver],
      server: 0,
      receiver,
      isTop: !isTopServer,
    },
    events: [
      ...state.events,
      {
        time: "",
        type: "score",
        by: state[teamServer].players[server - 1].id,
        content: state[teamServer].score,
        detail,
      },
    ],
    eventCounter: newCounter,
  };
};

const switchSide = (state, action) => {
  return {
    ...state,
    team1: {
      ...state.team1,
      isRightTeam: !state.team1.isRightTeam,
    },
    team2: {
      ...state.team2,
      isRightTeam: !state.team2.isRightTeam,
    },
  };
};

const setScoreboardData = (state, action) => {
  const data = action.payload;
  let team1Players, team2Players;
  team1Players = [
    {
      id: data.teamA.players[0].player._id,
      name: data.teamA.players[0].player.username,
      avatar: data.teamA.players[0].player.image,
    },
  ];
  team2Players = [
    {
      id: data.teamB.players[0].player._id,
      name: data.teamB.players[0].player.username,
      avatar: data.teamB.players[0].player.image,
    },
  ];
  if (data.game_type === "double") {
    team1Players = [
      ...team1Players,
      {
        id: data.teamA.players[1].player._id,
        name: data.teamA.players[1].player.username,
        avatar: data.teamA.players[1].player.image,
      },
    ];
    team2Players = [
      ...team2Players,
      {
        id: data.teamB.players[1].player._id,
        name: data.teamB.players[1].player.username,
        avatar: data.teamB.players[1].player.image,
      },
    ];
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
    },
  };
};

const setChosen = (state, action) => {
  const { id, index } = action.payload;
  let team,
    otherTeam,
    server,
    receiver = 0,
    right;
  let isTop = true;
  team = state.team1.players.find((item) => item.id === id) ? "team1" : "team2";
  otherTeam = team === "team1" ? "team2" : "team1";
  if (index === 1) right = true;
  else if (index === 2) {
    server = state[team].players.findIndex((item) => item.id === id) + 1;
    if (!state[team].isRightTeam) isTop = false;
    else isTop = true;
  } else if (index === 3) {
    receiver = state[team].players.findIndex((item) => item.id === id) + 1;
    if (!state[team].isRightTeam) isTop = false;
    else isTop = true;
  }
  return {
    ...state,
    [team]: {
      ...state[team],
      isRightTeam: index === 1 ? right : state[team].isRightTeam,
      server: index === 2 ? server : state[team].server,
      isTop: index !== 1 ? isTop : state[team].isTop,
      receiver: index !== 1 ? receiver : state[team].receiver,
    },
    [otherTeam]: {
      ...state[otherTeam],
      isRightTeam: index === 1 ? !right : state[otherTeam].isRightTeam,
    },
  };
};
const setupEmptySetOnScoreboard = (state, action) => {
  const { teamA, teamB, _id } = action.payload;
  return {
    ...state,
    team1: {
      ...state.team1,
      isRightTeam: teamA.isRightTeam,
      server: teamA.server,
      isTop: teamA.isTop,
      receiver: teamA.receiver,
    },
    team2: {
      ...state.team2,
      isRightTeam: teamB.isRightTeam,
      server: teamB.server,
      isTop: teamB.isTop,
      receiver: teamB.receiver,
    },
    _id,
  };
};
const setupMidStageSetOnScoreboard = (state, action) => {
  const {
    teamA,
    teamB,
    shuttle,
    events,
    setId,
    initTeamA,
    initTeamB,
    detailteamA,
    detailteamB,
    totalEvents,
  } = action.payload;
  return {
    ...state,
    team1: {
      ...state.team1,
      isRightTeam: teamA.isRightTeam,
      score: teamA.score,
      server: teamA.server,
      isTop: teamA.isTop,
      receiver: teamA.receiver,
      scores: detailteamA.scores,
      setWon: detailteamA.setWon,
    },
    team2: {
      ...state.team2,
      isRightTeam: teamB.isRightTeam,
      score: teamB.score,
      server: teamB.server,
      isTop: teamB.isTop,
      receiver: teamB.receiver,
      scores: detailteamB.scores,
      setWon: detailteamB.setWon,
    },
    balls: shuttle,
    events,
    eventCounter: events.length,
    midStage: true,
    totalEvents,
    initTeam1: {
      server: initTeamA.server,
      receiver: initTeamA.receiver,
    },
    initTeam2: {
      server: initTeamB.server,
      receiver: initTeamB.receiver,
    },
    _id: setId,
  };
};
const setPlayerPlace = (state, action) => {
  const { teamKey } = action.payload;
  const otherTeam = teamKey === "team1" ? "team2" : "team1";
  return {
    ...state,
    [teamKey]: {
      ...state[teamKey],
      isTop: !state[teamKey].isTop,
    },
    [otherTeam]: {
      ...state[otherTeam],
      receiver:
        state.team1.players.length > 1
          ? state[otherTeam].receiver === 1
            ? 2
            : 1
          : 1,
      isTop: state[teamKey].isTop,
    },
  };
};
const changeReadyStatus = (state, action) => {
  const { status } = action;
  return {
    ...state,
    readyForSendData: status,
  };
};
const setMidStageStatus = (state, action) => {
  const { status } = action;
  return {
    ...state,
    midStage: status,
  };
};

const removeScores = (state) => {
  return {
    ...state,
    team1: {
      ...state.team1,
      scores: [],
    },
    team2: {
      ...state.team2,
      scores: [],
    },
    balls: 1,
  };
};

const cleanupsetInfo = (state) => {
  return {
    ...state,
    _id: "",
    team1: {
      players: [],
      isRightTeam: false,
      server: 0,
      receiver: 1,
      isTop: false,
      score: 0,
      scores: [],
      setWon: 0,
    },
    team2: {
      players: [],
      isRightTeam: false,
      server: 0,
      receiver: 1,
      isTop: false,
      score: 0,
      scores: [],
      setWon: 0,
    },
    events: [],
    totalEvents: [],
    balls: 1,
    foulHappend: null,
    eventCounter: 0,
    lastPoint: "",
    undoMode: false,
    setOver: false,
    readyForSendData: false,
    midStage: false,
  };
};

const swapPlayers = (state, action) => {
  const { teamKey } = action.payload;

  return {
    ...state,
    [teamKey]: {
      ...state[teamKey],
      players: state[teamKey].players.reverse(),
    },
    playersSwaped:
      state.playersSwaped === -1 ? 0 : state.playersSwaped === 0 ? 1 : 0,
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
      return switchServer(state);
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
    case actionTypes.SET_PLAYER_PLACE:
      return setPlayerPlace(state, action);
    case actionTypes.REMOVE_SCORES:
      return removeScores(state);
    case actionTypes.CLEAR_EVENTS_ADD_TOTAL_EVENTS:
      return clearEventsAndAddToTotalEvents(state);
    case actionTypes.SETUP_EMPTY_SET_SCOREBOARD:
      return setupEmptySetOnScoreboard(state, action);
    case actionTypes.SETUP_MID_STAGE_SET_SCOREBOARD:
      return setupMidStageSetOnScoreboard(state, action);
    case actionTypes.CHANGE_READY_STATUS:
      return changeReadyStatus(state, action);
    case actionTypes.SET_MID_STAGE_STATUS:
      return setMidStageStatus(state, action);
    case actionTypes.CLEANUP_SET_INFO:
      return cleanupsetInfo(state);
    case actionTypes.SWAP_PLAYERS:
      return swapPlayers(state, action);
    default:
      return state;
  }
};

export default reducer;
