import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const ajax = axios.create({
  // baseURL: process.env.VUE_APP_BASEURL, // url = base url + request url
  baseURL: "http://127.0.0.1:7001", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000, // request timeout
});

// request interceptor
ajax.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["token"] = getToken();
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
ajax.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;

    if (res.code !== 10000) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });

      //20001 Token不存在，请重新登录 20002 Token无效，请重新登录
      if (res.code === 20001 || res.code === 20002) {
        // to re-login
        MessageBox.confirm("请重新登陆", "提示", {
          confirmButtonText: "确定",
          closeOnClickModal: false,
          showCancelButton: false,
          type: "warning",
        }).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res.data;
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default {
  post: (url, data, { headers } = {}) => {
    return ajax({
      url,
      data,
      method: "post",
      headers,
    });
  },
  get: (url, data, { headers } = {}) => {
    return ajax({
      url,
      params: {
        ...data,
      },
      method: "get",
      headers,
    });
  },
};
