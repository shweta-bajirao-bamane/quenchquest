import axios from "../axiosInstance";

// GET user login / session status
export const getUserLoginStatus = () => {
  return axios.get("/user/login/");
};
