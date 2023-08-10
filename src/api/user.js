import instance from "./common";

// 회원가입
const addUsers = async (newUser) => {
  const response = await instance.post(`/api/user/signup`, newUser);
  console.log("회원가입", response)
  return response.data;
};

// 회원 탈퇴
const deleteUsers = async () => {
  const response = await instance.delete(`/api/user/withdraw`);
  // console.log("회원 탈퇴", response)
  return response.data;
};

// 로그인
const login = async (loginInformation) => {
  const response = await instance.post(`/api/user/login`, loginInformation);
  console.log("로그인", response);
  const token = response.headers.authorization;
  const nickname = response.data.nickname;
  const userImage = response.data.userImage;

  localStorage.setItem("token", token);
  localStorage.setItem("nickname", nickname);
  localStorage.setItem("userImage", userImage);

  // console.log(response.data.nickname);
  // console.log(response.data.userImage);
  return response.data;
};

//로그 아웃
const logout = async () => {
  const response = await instance.delete(`/api/users/logout`);
  // console.log("로그아웃", response)
  return response.data;
};

export { addUsers, deleteUsers, login, logout };
