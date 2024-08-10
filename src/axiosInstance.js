import axios from "axios";
// import { getToken } from "./store/reducers/requestSlice";
const { REACT_APP_API_URL } = process.env;

let store; //// это стандартный store

export const propsStoreFN = (oldStore) => {
  store = oldStore;
};

const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${store?.getState()?.saveDataSlice?.tokenA}`,
  },
});

axiosInstance.interceptors.request.use(
  //// перед отправкой запроса
  (config) => {
    config.headers.authorization = `Bearer ${
      store?.getState()?.saveDataSlice?.tokenA
    }`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  //// после ответа запроса
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const { dispatch } = store;
        // dispatch(getToken()); //// получаю токен
        return axiosInstance.request(originalRequest);
      } catch (e) {
        console.log("Не удалось авторизоваться");
      }
      /// запрос на обновление токена
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
