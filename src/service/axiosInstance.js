import axios from "axios";

export default (token) => {
  const options = {};
  options.baseURL = import.meta.env.VITE_APP_API_URL;
  options.headers = {}
  if (token !== "") {
    options.headers.Authorization = 'bearer ' + token
  }
  return axios.create(options);
};
