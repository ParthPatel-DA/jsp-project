import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

instance.interceptors.request.use(
  (config) => {
    let auth = localStorage.getItem("auth");
    if (auth) {
      auth = JSON.parse(auth);
      console.log(
        "🚀 ~ file: instance.js ~ line 15 ~ auth.userToken",
        auth.userToken
      );
      config.headers.Authorization = auth.userToken;
    }
    return config;
  },
  (err) => {
    return new Promise.reject(err);
  }
);

export default instance;
