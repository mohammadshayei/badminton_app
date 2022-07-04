import axios from "axios";
import { baseUrl } from "../constants/Config";

export const fetchItems = async (id, token, fetchWord) => {
  const result = await axios.post(
    `${baseUrl}api/get_${fetchWord}`,
    { id },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.message[fetchWord] };
  } else return { success: false, data: null, error: result.data.message };
};
export const createTournament = async (data, token) => {
  const result = await axios.post(
    `${baseUrl}api/create_tournament`,
    { ...data },
    { headers: { "auth-token": token } }
  );
  return { success: result.data.success, data: result.data.result };
};
export const editTournament = async (data, token) => {
  const result = await axios.post(
    `${baseUrl}api/edit_tournament`,
    { ...data },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, tournament: result.data.message.tournament };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const createPlayer = async (data, token) => {
  const { image, username, teamName, nationalNumber, birthDate, tournamentId } =
    data;
  const formData = new FormData();
  if (image) formData.append("image", image);
  formData.append("username", username);
  formData.append("teamName", teamName);
  formData.append("nationalNumber", nationalNumber);
  formData.append("birthDate", birthDate);
  formData.append("tournamentId", tournamentId);
  const result = await axios.post(`${baseUrl}api/create_player`, formData, {
    headers: { "auth-token": token },
  });

  if (result.data.success) {
    return { success: true, player: result.data.message.player };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const updatePlayer = async (data, token) => {
  const { playerId, image, username, teamName, nationalNumber, birthDate } =
    data;
  const formData = new FormData();
  if (image) formData.append("image", image);
  formData.append("username", username);
  formData.append("teamName", teamName);
  formData.append("nationalNumber", nationalNumber);
  formData.append("birthDate", birthDate);
  formData.append("playerId", playerId);

  const result = await axios.post(`${baseUrl}api/update_player`, formData, {
    headers: { "auth-token": token },
  });
  if (result.data.success) {
    return { success: true, player: result.data.message.player };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const uploadRefereeImage = async (payload, token) => {
  const { id, image } = payload;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("image", image);
  const result = await axios.post(
    `${baseUrl}api/upload_referee_image`,
    formData,
    {
      headers: { "auth-token": token },
    }
  );
  if (result.data.success) {
    return { success: true, result: result.data.result };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const removeContent = async (data, token, url) => {
  const result = await axios.post(
    `${baseUrl}api/${url}`,
    { ...data },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const searchPlayer = async (data, token) => {
  const result = await axios.post(
    `${baseUrl}api/search_player`,
    { ...data },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.result };
  } else return { success: false };
};
export const addPlayerWithPhone = async (data, token) => {
  const result = await axios.post(
    `${baseUrl}api/add_player_with_phone`,
    { ...data },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.message.player };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const addGym = async (data, token) => {
  const result = await axios.post(
    `${baseUrl}api/define_gym`,
    { ...data },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.message.gym };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const updateGym = async (data, token) => {
  const result = await axios.post(
    `${baseUrl}api/update_gym`,
    { ...data },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.message.gym };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const addReferee = async (data, token) => {
  const result = await axios.post(
    `${baseUrl}api/add_referee_with_phone_nationalnumber`,
    { ...data },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.message.referee };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const getRefereeGames = async (data, token) => {
  const result = await axios.post(
    `${baseUrl}api/get_referee_games`,
    { ...data },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.message.games };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const editReferee = async (payload, token) => {
  const result = await axios.post(
    `${baseUrl}api/edit_referee`,
    { ...payload },
    { headers: { "auth-token": token } }
  );
  return { success: result.data.success, data: result.data.result };
};
export const changeRefereePassword = async (payload, token) => {
  const result = await axios.post(
    `${baseUrl}api/change_referee_password`,
    { ...payload },
    { headers: { "auth-token": token } }
  );
  return { success: result.data.success, message: result.data.result.message };
};
export const checkRefereeGetGame = async (data, token) => {
  const result = await axios.post(
    `${baseUrl}api/check_referee_get_game`,
    { ...data },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.message.game };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const createSet = async (data, token) => {
  const result = await axios.post(
    `${baseUrl}api/create_set`,
    { ...data },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.message.set };
  } else
    return { success: false, data: null, error: result.data.message.error };
};

export const createGame = async (data, token) => {
  // {
  //     "competitionType": "tak hazfi",
  //     "gameType": "double",
  //     "gameNumber": "3",
  //     "gymId": "dc644302101b4b578b42cda04aae0907",
  //     "landNumber": "1",
  //     "date": "2012-04-23T18:25:43.511Z",
  //     "teamNameA": "teama",
  //     "playersTeamA": [
  //         "ea8369a4d1064119b1cfcd1260091793",
  //         "48fac8eb17304c7f9692fe4423b7ed7a"
  //     ],
  //     "teamNameB": "teamb",
  //     "playersTeamB": [
  //         "2d5d264b7bf74fe99d9cb1a6622bd937",
  //         "e37914d2976d467786400bcb14851c3e"
  //     ],
  //     "tournamentId": "bab08b91ca234a84af37e2dae929fcc6"
  // }
  const result = await axios.post(
    `${baseUrl}api/create_game    `,
    { ...data },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.message.game };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const assignReferee = async (payload, token) => {
  // {
  // refereeId:"69e12a8337e04038910bd3ac3ff5a6f2",
  // serviceRefereeId:"72373d842d8e4b7fb890e1f0abd97062",
  // gameId:"1145911b0e184bb38d47f4358d25134c"
  // }
  const result = await axios.post(
    `${baseUrl}api/assign_game    `,
    { ...payload },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const deleteGame = async (payload, token) => {
  // {
  // id:"49e30d604c2a428eabac8741153efa3b",
  // }
  const result = await axios.post(
    `${baseUrl}api/delete_game    `,
    { ...payload },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const updateGame = async (data, token) => {
  // {
  //     "competitionType": "tak hazfi",
  //     "gameType": "double",
  //     "gameNumber": "3",
  //     "gymId": "dc644302101b4b578b42cda04aae0907",
  //     "landNumber": "1",
  //     "date": "2012-04-23T18:25:43.511Z",
  //     "teamNameA": "teama",
  //     "playersTeamA": [
  //         "ea8369a4d1064119b1cfcd1260091793",
  //         "48fac8eb17304c7f9692fe4423b7ed7a"
  //     ],
  //     "teamNameB": "teamb",
  //     "playersTeamB": [
  //         "2d5d264b7bf74fe99d9cb1a6622bd937",
  //         "e37914d2976d467786400bcb14851c3e"
  //     ],
  //     "tournamentId": "bab08b91ca234a84af37e2dae929fcc6"
  //     "gameId": "asdfsdf8b91ca234a84af37e2daeasfdasdf"
  // }
  const result = await axios.post(
    `${baseUrl}api/update_game    `,
    { ...data },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.message.game };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const getGame = async (id, token) => {
  const result = await axios.post(
    `${baseUrl}api/get_game    `,
    { id },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.message.game };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const fetchTournaments = async (token) => {
  const result = await axios.get(`${baseUrl}api/get_tournaments`, {
    headers: { "auth-token": token },
  });
  return { success: result.data.success, data: result.data.result };
};
export const searchTournaments = async (payload, token) => {
  const result = await axios.post(
    `${baseUrl}api/search_tournaments`,
    { ...payload },
    {
      headers: { "auth-token": token },
    }
  );
  return { success: result.data.success, data: result.data.result };
};
export const dynamicApi = async (payload, token, url) => {
  const result = await axios.post(
    `${baseUrl}api/${url}`,
    { ...payload },
    {
      headers: { "auth-token": token },
    }
  );
  return { success: result.data.success, data: result.data.result };
};
export const dynamicGetApi = async (token, url) => {
  const result = await axios.get(`${baseUrl}api/${url}`, {
    headers: { "auth-token": token },
  });
  return { success: result.data.success, data: result.data.result };
};
export const formDataDynamic = async (image, payload, token, url) => {
  const formData = new FormData();
  if (image) formData.append("image", image);
  for (const item in payload) {
    formData.append(item, payload[item]);
  }
  const result = await axios.post(`${baseUrl}api/${url}`, formData, {
    headers: { "auth-token": token },
  });
  return { success: result.data.success, data: result.data.result };
};
