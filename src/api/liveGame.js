import axios from "axios";
import { baseUrl } from "../constants/Config";

export const getLiveGames = async () => {
    const result = await axios.post(`${baseUrl}api/get_live_games`);
    if (result.data.success) {
        return { success: true, data: result.data.message.games }
    }
    else
        return { success: false, data: null, error: result.data.message }
}
export const getTournaments = async (token) => {
    const result = await axios.get(`${baseUrl}api/get_global_tournaments`, { headers: { 'auth-token': token } });
    if (result.data.success) {
        return { success: true, data: result.data.message.tournaments }
    }
    else
        return { success: false, data: null, error: result.data.message }
}
