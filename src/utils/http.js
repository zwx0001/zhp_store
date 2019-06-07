import axios from "axios";
import Cookie from "./cookie";

let instance = axios.create({
  timeout: 5000
});

//请求拦截
instance.interceptors.request.use(config => {
  if (Cookie.get("uid")) {
    config.headers.authorization = Cookie.get("uid");
  }
  return config;
});

//响应拦截
instance.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return res.data;
    } else {
      console.log(res);
    }
  },
  err => {
    Promise.reject(err);
  }
);

let http = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, "$http", {
      value: instance
    });
  }
};
export default http;
