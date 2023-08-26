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
    // const refreshToken = localStorage.getItem("RefreshToken");

    // 토큰이 존재하면 헤더에 담아서 요청 보내기 -> 둘 다 보내고 있었다.
    if (accessToken) {
      config.headers.AccessToken = `${accessToken}`;
      //config.headers.RefreshToken = `${refreshToken}`;
    }

    return config;
  },

  function (error) {
    console.log("인터셉트 요청 오류!");
    return Promise.reject(error);
  }
);

// response
// 토큰 유효성 검사 함수.

function isAccessTokenExpired() {
  const accessToken = localStorage.getItem("AccessToken");
  if (!accessToken) {
    return true;
  }

  const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  const currentTime = new Date().getTime();

  return currentTime > expirationTime;
}

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    store.dispatch(logout());
    
    if (error.response.status === 4001 || isAccessTokenExpired()) {
      // alert('엑세스 만료, 다시 로그인 됩니다.');
      store.dispatch(logout());
      console.log("111", error);
      console.log(error.response.data, "1");
      const refreshToken = localStorage.getItem("RefreshToken");
      const accessToken = localStorage.getItem("AccessToken");

      if (refreshToken && accessToken) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/token/refresh`, // 리프레시 엔드포인트 URL
            {
              accessToken: localStorage.getItem("AccessToken"),
              refreshToken: localStorage.getItem("RefreshToken"),
            }
          );
          console.log("222:", error);
          console.log(error.response.data, "3");

          const newAccessToken = response.data.accessToken;
          localStorage.setItem("AccessToken", newAccessToken);
          error.config.headers.accesstoken = `${newAccessToken}`;
          return instance(error.config); // 새 엑세스 토큰으로 요청 재시도
        } catch (refreshError) {
          store.dispatch(logout());
          console.log(error.response.data, "888");
          return alert(
            "로그인 시간이 만료되었습니다. 자동으로 로그아웃됩니다."
          );
        }
      } else {
        console.log(error.response.data, "ㅇ");
        store.dispatch(logout());
        return alert(" 자동으로 로그아웃됩니다.");
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

// if (error.response.status === 4001) {
//   //에로 코드로 받는게 아니라시간 비교해서 만료되면
//   const refreshToken = localStorage.getItem("RefreshToken");
//   const accessToken = localStorage.getItem("AccessToken");

//   if (refreshToken) {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_SERVER_URL}/token/refresh`, // 리프레시 엔드포인트 URL
//         { accessToken, refreshToken }
//       );

//           const newAccessToken = response.data.accessToken;
//           localStorage.setItem("AccessToken", newAccessToken);
//           error.config.headers.Authorization = `Bearer ${newAccessToken}`;

//           return axios(error.config); // 새 엑세스 토큰으로 요청 재시도
//         } catch (refreshError) {
//           store.dispatch(logout());
//           return alert(
//             "로그인 시간이 만료되었습니다. 자동으로 로그아웃됩니다."
//           );
//         }
//       } else {
//         store.dispatch(logout());
//         return alert("로그인 시간이 만료되었습니다. 자동으로 로그아웃됩니다.");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default instance;

///

// import axios from "axios";
// import { logout } from "../redux/modules/userSlice";
// import store from "../redux/config/configStore";

// const instance = axios.create({
//   baseURL: process.env.REACT_APP_SERVER_URL,
// });

// instance.interceptors.request.use(
//   async function (config) {
//     const accessToken = localStorage.getItem("AccessToken");
//     const refreshToken = localStorage.getItem("RefreshToken");

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   function (error) {
//     console.log("인터셉트 요청 오류!");
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error) {
//     if (error.response.status === 401) {
//       store.dispatch(logout());
//       const refreshToken = localStorage.getItem("RefreshToken");

//       if (refreshToken) {
//         try {
//           const response = await axios.post(
//             `${process.env.REACT_APP_SERVER_URL}/refresh`, // 리프레시 엔드포인트 URL
//             { refreshToken }
//           );

//           const newAccessToken = response.data.accessToken;
//           localStorage.setItem("AccessToken", newAccessToken);
//           error.config.headers.Authorization = `Bearer ${newAccessToken}`;

//           return axios(error.config); // 새 엑세스 토큰으로 요청 재시도
//         } catch (refreshError) {
//           store.dispatch(logout());
//           return alert("로그인 시간이 만료되었습니다. 자동으로 로그아웃됩니다.");
//         }
//       } else {
//         store.dispatch(logout());
//         return alert("로그인 시간이 만료되었습니다. 자동으로 로그아웃됩니다.");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default instance;
