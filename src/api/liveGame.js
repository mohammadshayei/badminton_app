import axios from "axios";
import { baseUrl } from "../constants/Config";

export const getLiveGames = async ( token) => {
    const result = await axios.post(`${baseUrl}api/get_live_games`,{},
        { headers: { 'auth-token': token } });
    if (result.data.success) {
        return { success: true, data: result.data.message.games }
    }
    else
        return { success: false, data: null, error: result.data.message }
}
