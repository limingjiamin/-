import axios from "axios";
// 创建axiosa的实例
const service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
});
// 请求拦截
service.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  if (localStorage.getItem("token")) {
    config.headers.token = localStorage.getItem("token") || "";
  }
  return config;
});
// 相应拦截
service.interceptors.response.use((res) => {
  const code: number = res.data.code;
  if (code != 200&&code != 0) {
    return Promise.reject(res.data)
  }else{
    return res.data;
  }
},(err)=>{
    console.log(err)
});
export default service;
