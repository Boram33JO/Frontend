import instance from "./common";
import { LoginFormat, SignupFormat } from "../models/user";

// 회원가입
export const addUsers = async (newUser: SignupFormat) => {
    const response = await instance.post(`/user/signup`, newUser);
    // console.log("회원가입", response)
    return response.data;
};

// 로그인 
export const login = async (loginFormat: LoginFormat) => {
    const response = await instance.post(`/user/login`, loginFormat);
    const accessToken = response.headers.accesstoken;
    const refreshToken = response.headers.refreshtoken;

    localStorage.setItem("AccessToken", accessToken);
    localStorage.setItem("RefreshToken", refreshToken);
    // console.log("로그인", response);

    return response.data;
};

// 로그아웃
export const logout2 = async () => {
    const response = await instance.post(`/user/logout`);
    // console.log("로그아웃", response);
    return response.data;
};

// 이메일 인증 번호 전송
export const emailCheck = async (email: string) => {
    const response = await instance.post(`/auth/email`, { email });
    return response;
}

// 이메일 인증 번호 검증
export const emailDoubleCheck = async (email: string, code: string) => {
    const response = await instance.post(`/auth/check`, { email, code });
    return response;
}

// 핸드폰 인증 번호 전송 (SMS)
export const mobileCheck = async (to: string) => {
    const response = await instance.post(`/sms/send`, { to });
    return response;
}

// 핸드폰 인증 번호 검증 (SMS)
export const mobileDoubleCheck = async (smsConfirmNum: string, to: string) => {
    const response = await instance.post(`/sms/check`, { smsConfirmNum, to });
    return response;
}