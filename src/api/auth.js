import axios from "axios";
import { baseUrl } from "../constants/Config";
const MELI_PAYAMAK_URL =
  "https://rest.payamak-panel.com/api/SendSMS/BaseServiceNumber";
export const searchUserByPhone = async (phone) => {
  const result = await axios.post(`${baseUrl}api/search_user_by_phone`, {
    phone,
  });
  return result.data.result.exist;
};
export const sendSms = async (text, to) => {
  const payload = {
    username: "09354598847",
    password: "Mohammad@1378",
    text,
    to,
    bodyId: "49928",
  };
  const result = await axios.post(MELI_PAYAMAK_URL, payload);
  return result.data.RetStatus === 1;
};

export const createUser = async (username, phone, nationalNumber, password) => {
  const payload = {
    username,
    phone,
    nationalNumber,
    password,
  };
  const result = await axios.post(`${baseUrl}api/create_user`, payload);
  return { success: result.data.success, result: result.data };
};
export const getIp = async () => {
  const result = await axios.get("https://geolocation-db.com/json/");
  if (result.data) {
    return { success: true, ip: result.data.IPv4 };
  } else {
    return { success: false };
  }
};
export const saveTempCode = async (payload) => {
  const result = await axios.post(`${baseUrl}api/save_temp_code`, payload);
  return { success: result.data.success, result: result.data.result };
};
export const validateTempCode = async (payload) => {
  const result = await axios.post(`${baseUrl}api/validate_temp_code`, payload);
  return { success: result.data.success, result: result.data.result };
};
