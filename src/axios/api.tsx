// import axios from "axios";

// export const instance = axios.create({
//   baseURL: process.env.REACT_APP_SERVER_URL,
//   // headers: {
//   //   "Content-Type": "application/json",
//   // },
// });

// instance.interceptors.request.use(
//   function (config) {
//     // 로컬 스토리지에서 토큰 값 가져오기
//     const token = localStorage.getItem("token");

//     // 토큰이 존재하면 헤더에 담아서 요청 보내기
//     if (token) {
//       config.headers.Authorization = `${token}`;
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
//     console.log("인터넵트 응답 받았어요!");
//     console.log("response", response)
//     return response;
//   },
//   function (error) {
//     console.log("인터셉트 응답 못받았어요...ㅠㅠ");
//     if(error.response.status === 400){
//       const token = error.response.headers.authorization
//       localStorage.setItem('token', token);
//     }
//     if(error.response.status === 401){
//       localStorage.removeItem("token");
//       window.location.reload();
//     }
//     return Promise.reject(error);
//   }
// );

// export default instance;
// // 회원가입
// const addUsers = async (newUser) => {
//   const response = await instance.post(`/api/members/signup`, newUser)
//   // console.log("회원가입", response)
//   return response.data;
// }

// // 회원 탈퇴
// const deleteUsers = async () => {
//   const response = await instance.delete(`/api/members/withdraw`)
//   // console.log("회원 탈퇴", response)
//   return response.data;
// }

// // 로그인 
// const login = async (loginInformation) => {
//   const response = await instance.post(`/api/members/login`, loginInformation)
//   console.log("로그인", response)
//   const token = response.headers.authorization
//   localStorage.setItem('token', token);
//   return response.data;
// }

// //로그 아웃
// const logout = async () => {
//   const response = await instance.delete(`/api/members/logout`)
//   // console.log("로그아웃", response)
//   return response.data;
// }

// export{ addUsers, deleteUsers, login, logout}
export {}