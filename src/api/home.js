import axios from "axios";
import { baseUrl } from "../constants/Config";


export const fetchItems = async (id, token,  fetchWord) => {
    const result = await axios.post(`${baseUrl}api/get_${fetchWord}`, { id },
        { headers: { 'auth-token': token } });
    if (result.data.success) {
        return { success: true, data: result.data.message[fetchWord] }
    }
    else
        return { success: false, data: null, error: result.data.message }
}
