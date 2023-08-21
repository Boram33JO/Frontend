import instance from "./common";
import { LoginFormat, SignupFormat } from "../models/user";

// 회원가입
export const addUsers = async (newUser: SignupFormat) => {
    const response = await instance.post(`/api/user/signup`, newUser);
    console.log("회원가입", response)
    return response.data;
  };

// 로그인 
export const login = async (loginFormat: LoginFormat) => {
    const response = await instance.post(`/api/user/login`, loginFormat);
    const accessToken = response.headers.accesstoken;
    const refreshToken = response.headers.refreshtoken;

    localStorage.setItem("AccessToken", accessToken);
    localStorage.setItem("RefreshToken", refreshToken);
    // console.log("로그인", response);

    return response.data;
};

// 로그아웃
export const logout2 = async () => {
    const response = await instance.post(`/api/user/logout`);
    // console.log("로그아웃", response);
    return response.data;
};