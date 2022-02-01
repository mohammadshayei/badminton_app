import axios from "axios";
import { baseUrl } from "../constants/Config";


export const setStatusGame = async (payload, token) => {
    const result = await axios.post(`${baseUrl}api/set_status_game`, payload,
        { headers: { 'auth-token': token } });
    if (result.data.success) {
        return { success: true, }
    }
    else
        return { success: false, data: null, error: result.data.message }
}
export const setGameAndSetStatus = async (payload, token) => {
    const result = await axios.post(`${baseUrl}api/set_game_set_status`, payload,
        { headers: { 'auth-token': token } });
    if (result.data.success) {
        return { success: true, }
    }
    else
        return { success: false, data: null, error: result.data.message }
}
export const endSetHandler = async (payload, token) => {
    const result = await axios.post(`${baseUrl}api/end_set`, payload,
        { headers: { 'auth-token': token } });
    if (result.data.success) {
        return { success: true, }
    }
    else
        return { success: false, data: null, error: result.data.message }
}
export const exitGame = async (payload, token) => {
    
    const result = await axios.post(`${baseUrl}api/exit_game`, payload,
        { headers: { 'auth-token': token } });
    if (result.data.success) {
        return { success: true, }
    }
    else
        return { success: false, data: null, error: result.data.message }
}