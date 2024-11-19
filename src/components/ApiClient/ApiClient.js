import axios from "axios";
import {toast} from "react-toastify";

const ApiClient = () => {

  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  let instance = axios.create(defaultOptions);
  instance.interceptors.request.use(function (config) {
    const jwt = localStorage.getItem("jwt");
    config.headers.Authorization =  jwt ? `Bearer ${JSON.parse(jwt).token}` : "";
    return config;
  });

  instance.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("jwt");
      toast.warn('Looks like your session has expired. Try logging back in', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else if (error.response.status === 403) {
      toast.warn('You do not seem to have permissions to perform this action', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else if (error.response.status >= 500) {
      toast.error('Oops, something ain\'t right. Please try again later', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
    return error.response;
  });

  return instance;
};

export default ApiClient();