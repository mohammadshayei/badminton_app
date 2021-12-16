import axios from "axios";
import { baseUrl } from "../constants/Config";


export const fetchItems = async (id, token, fetchWord) => {
    const result = await axios.post(`${baseUrl}api/get_${fetchWord}`, { id },
        { headers: { 'auth-token': token } });
    if (result.data.success) {
        return { success: true, data: result.data.message[fetchWord] }
    }
    else
        return { success: false, data: null, error: result.data.message }
}
export const createTournament = async (data, token) => {
    const result = await axios.post(`${baseUrl}api/create_tournament`, { ...data },
        { headers: { 'auth-token': token } });
    if (result.data.success) {
        return { success: true, tournament: result.data.message.tournament }
    }
    else
        return { success: false, data: null, error: result.data.message.error }
}
export const editTournament = async (data, token) => {
    const result = await axios.post(`${baseUrl}api/edit_tournament`, { ...data },
        { headers: { 'auth-token': token } });
    if (result.data.success) {
        return { success: true, tournament: result.data.message.tournament }
    }
    else
        return { success: false, data: null, error: result.data.message.error }
}
export const createPlayerWithImage = async (data, token) => {
    const { image, username, teamName, nationalNumber, birthDate, tournamentId } = data
    const formData = new FormData()
    formData.append(
        "image",
        image,
    );
    formData.append(
        "username",
        username,
    );
    formData.append(
        "teamName",
        teamName,
    );
    formData.append(
        "nationalNumber",
        nationalNumber,
    );
    formData.append(
        "birthDate",
        birthDate,
    );
    formData.append(
        "tournamentId",
        tournamentId,
    );

    const result = await axios.post(
        `${baseUrl}api/create_player_with_image`,
        formData,
        { headers: { 'auth-token': token } }
    );

    if (result.data.success) {
        return { success: true, player: result.data.message.player }
    }
    else
        return { success: false, data: null, error: result.data.message.error }
}
export const updatePlayerWithImage = async (data, token) => {
    const { playerId, image, username, teamName, nationalNumber, birthDate } = data
    const formData = new FormData()
    formData.append(
        "image",
        image,
    );
    formData.append(
        "username",
        username,
    );
    formData.append(
        "teamName",
        teamName,
    );
    formData.append(
        "nationalNumber",
        nationalNumber,
    );
    formData.append(
        "birthDate",
        birthDate,
    );
    formData.append(
        "playerId",
        playerId,
    );

    const result = await axios.post(
        `${baseUrl}api/update_player_with_image`,
        formData,
        { headers: { 'auth-token': token } }
    );

    if (result.data.success) {
        return { success: true, player: result.data.message.player }
    }
    else
        return { success: false, data: null, error: result.data.message.error }
}
export const createPlayer = async (data, token) => {
    const result = await axios.post(
        `${baseUrl}api/create_player`,
        { ...data },
        { headers: { 'auth-token': token } }
    );

    if (result.data.success) {
        return { success: true, player: result.data.message.player }
    }
    else
        return { success: false, data: null, error: result.data.message.error }
}
export const updatePlayer = async (data, token) => {
    const result = await axios.post(
        `${baseUrl}api/update_player`,
        { ...data },
        { headers: { 'auth-token': token } }
    );
    if (result.data.success) {
        return { success: true, player: result.data.message.player }
    }
    else
        return { success: false, data: null, error: result.data.message.error }
}
