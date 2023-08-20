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
    // 먼가 여기 인터셉터에서 토큰 관리 할 수 있을 거 같은데, 
// 엑세스 토큰의 유효 시간을 체크
const accessTokenExpiration = jwt_decode(accessToken).exp;
const currentTime = Math.floor(Date.now() / 1000);

if (accessTokenExpiration && accessTokenExpiration < currentTime) {
  // 엑세스 토큰 만료 시 리프레시 토큰을 사용하여 새로운 엑세스 토큰 발급
  const newAccessToken = await refreshAccessToken();

  if (newAccessToken) {
    // 새로 갱신된 엑세스 토큰으로 요청 보내기
    config.headers.AccessToken = `${newAccessToken}`;
  } else {
    // 토큰 갱신에 실패한 경우 로그아웃 처리 또는 다른 처리
  }
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
    //console.log(error.response.data);
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