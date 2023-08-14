import instance from "./common";
import { LoginFormat } from "../models/user";

export const login = async (loginFormat: LoginFormat) => {
    const response = await instance.post(`/api/user/login`, loginFormat);
    console.log("로그인", response);
    const token = response.headers.authorization;
    const userId = response.data.data.userId;
    const nickname = response.data.data.nickname;
    const userImage = response.data.data.userImage;

    localStorage.setItem("token", token);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("userImage", userImage);

    // console.log(response.data);
    return response.data;
};