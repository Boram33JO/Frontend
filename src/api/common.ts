import axios from "axios";
import { logout } from "../redux/modules/userSlice";
import store from "../redux/config/configStore";


export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

instance.interceptors.request.use(
  async function (config) {
    // 로컬 스토리지에서 토큰 값 가져오기
    const accessToken = localStorage.getItem("AccessToken");
    const refreshToken = localStorage.getItem("RefreshToken");
    
    // 토큰이 존재하면 헤더에 담아서 요청 보내기 -> 둘 다 보내고 있었다.
    if (accessToken) {
      config.headers.AccessToken = `${accessToken}`;
      config.headers.RefreshToken = `${refreshToken}`;
    }
    // 먼가 여기 인터셉터에서 토큰 관리 할 수 있을 거 같은데, 
// 엑세스 토큰의 유효 시간을 체


return config;

  },

  function (error) {
    console.log("인터셉트 요청 오류!");
    return Promise.reject(error);
  }
);

// response

instance.interceptors.response.use(
  
  function (response) {
    // console.log("인터셉트 응답 받았어요!");
    // console.log("response", response);
    return response;
  },
  async function (error) {
    ////console.log(error.response.data);
    if (error.response.status === 400) {
      console.log(error.response.data);
    }
    if (error.response.status === 401) {
      console.log("401 Unauthorized Error:", error);
      console.log(error.response.data, "1");
      const newAccessToken = error.response.headers.accesstoken; // 새 엑세스 토큰 받아오기

      if (newAccessToken) {
        localStorage.removeItem("AccessToken");
        localStorage.setItem("AccessToken", newAccessToken); // 새 엑세스 토큰 로컬 스토리지에 저장
        console.log('2');
      }
      else // 리프레시 토큰까지 만료되어 새 엑세스 토큰을 받을 수 없는 경우
      {
        store.dispatch(logout());
        //console.log(error.response.data, "3");
        return alert("로그인 시간이 만료되었습니다, 자동으로 로그아웃됩니다.");
       
        //여기까지 작동확인 됨.

       // 메인 화면의 경로로 설정
       // window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default instance;