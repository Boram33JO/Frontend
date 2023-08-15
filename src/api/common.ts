// 인스턴스
import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

instance.interceptors.request.use(
  function (config) {
    // 로컬 스토리지에서 토큰 값 가져오기
    const accessToken = localStorage.getItem("AccessToken");
    const refreshToken = localStorage.getItem("RefreshToken");

    // 토큰이 존재하면 헤더에 담아서 요청 보내기
    if (accessToken) {
      config.headers.AccessToken = `${accessToken}`;
      config.headers.RefreshToken = `${refreshToken}`;
    }

    return config;
  },
  function (error) {
    console.log("인터셉트 요청 오류!");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // console.log("인터셉트 응답 받았어요!");
    // console.log("response", response);
    return response;
  },
  function (error) {
    console.log(error.response.data);
    if (error.response.status === 400) {
      // const token = error.response.headers.authorization;
      // localStorage.setItem("token", token);
     
    }
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default instance;