import axios from "axios";
import { baseUrl } from "../constants/Config";
const MELI_PAYAMAK_URL = 'https://rest.payamak-panel.com/api/SendSMS/BaseServiceNumber'
export const searchRefereeByPhone = async (phone) => {
    const result = await axios.post(`${baseUrl}api/search_referee_by_phone`, { phone });
    return result.data.refereeExist
}
export const sendSms = async (text, to) => {
    const payload = {
        username: '09354598847',
        password: 'Mohammad@1378',
        text,
        to,
        bodyId: '49928'
    }
    const result = await axios.post(MELI_PAYAMAK_URL, payload);
    return result.data.RetStatus === 1
}

export const registerReferee = async (username, phone, nationalNumber, password) => {
    const payload = {
        username,
        phone,
        nationalNumber,
        password,
    }
    const result = await axios.post(`${baseUrl}api/create_referee`, payload);
    return { success: result.data.success, message: result.data.message }
}
export const getIp = async () => {
    const result = await axios.get('https://geolocation-db.com/json/')
    if (result.data) {
        return { success: true, ip: result.data.IPv4 }

    } else {

        return { success: false }
    }
}