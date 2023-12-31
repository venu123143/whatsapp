import axios from "axios";

var BACKEND_API = "http://localhost:5000/api";

export const getAllData = async () => {
  const res = await axios.get(`${BACKEND_API}/users`);
  return res.data
};
