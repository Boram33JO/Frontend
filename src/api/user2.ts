import instance from "./common";
import { LoginFormat } from "../models/user";

export const login = async (loginFormat: LoginFormat) => {
    const response = await instance.post(`/api/user/login`, loginFormat);
    const accessToken = response.headers.accesstoken;
    const refreshToken = response.headers.refreshtoken;

    localStorage.setItem("AccessToken", accessToken);
    localStorage.setItem("RefreshToken", refreshToken);
    // console.log("로그인", response);

    return response.data;
};