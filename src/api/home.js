import axios from "axios";
import { baseUrl } from "../constants/Config";


export const getTournaments = async (id, token) => {
    const result = await axios.post(`${baseUrl}api/get_tournaments`, { id },
        { headers: { 'auth-token': token } });
    if (result.data.success){
        return { success: true, data: result.data.message.tournaments }
    }
    else
        return { success: false, data: null }
}
