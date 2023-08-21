import axios from "axios";


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
  async function (error) {
    //console.log(error.response.data);
    if (error.response.status === 400) {
      // const token = error.response.headers.authorization;
      // localStorage.setItem("token", token);
     
    }
    if (error.response.status === 401) {
     
      //localStorage.removeItem();
     // window.location.reload();
      console.log("401 Unauthorized Error:", error);
      console.log(error.response.data, "1");
      const newAccessToken = error.response.headers.accesstoken; // 새 엑세스 토큰 받아오기

      if (newAccessToken) {
        localStorage.removeItem("AccessToken");
        localStorage.setItem("AccessToken", newAccessToken); // 새 엑세스 토큰 로컬 스토리지에 저장
        console.log('2');
        // window.location.reload();
        
        // 지금은 리프레시가 같은 경우였고, 만약 리프레시까지 만료된 경우-> 로그아웃
        // 엑세스를 안준다. 서버가 새것을 안준다.
      }
      else 
      {
        // 리프레시 토큰까지 만료되어 새 엑세스 토큰을 받을 수 없는 경우
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
        
        console.log(error.response.data, "3");
        //여기까지 작동확인 됨.

        //window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default instance;