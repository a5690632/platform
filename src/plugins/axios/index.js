import axios from "axios"

const ajax = axios.create({
  baseURL: "http://127.0.0.1:7001/"
})


ajax.interceptors.request.use(
  function (config) {

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
ajax.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    // if (response.data.code == "-99") {
    //     localStorage.removeItem("token")
    // } else {
    return response.data
    // }
  },
  function (error) {
    // 对响应错误做点什么

    return Promise.reject(error);
  }
);
export default ajax