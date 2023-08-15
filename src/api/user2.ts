import instance from "./common";
import { LoginFormat } from "../models/user";

export const login = async (loginFormat: LoginFormat) => {
    const response = await instance.post(`/api/user/login`, loginFormat);
    const token = response.headers.accesstoken;
    localStorage.setItem("token", token);
    console.log("로그인", response);

    return response.data;
};