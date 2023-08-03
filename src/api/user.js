import instance from ".";

// 회원가입
const addUsers = async (newUser) => {
  const response = await instance.post(`/api/members/signup`, newUser);
  // console.log("회원가입", response)
  return response.data;
};

// 회원 탈퇴
const deleteUsers = async () => {
  const response = await instance.delete(`/api/members/withdraw`);
  // console.log("회원 탈퇴", response)
  return response.data;
};

// 로그인
const login = async (loginInformation) => {
  const response = await instance.post(`/api/members/login`, loginInformation);
  console.log("로그인", response);
  const token = response.headers.authorization;
  localStorage.setItem("token", token);
  return response.data;
};

//로그 아웃
const logout = async () => {
  const response = await instance.delete(`/api/members/logout`);
  // console.log("로그아웃", response)
  return response.data;
};

export { addUsers, deleteUsers, login, logout };
