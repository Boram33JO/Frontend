import instance from "./common";
import { LoginFormat, SignupFormat, PwChangeFormat, PwChangeFormat2, FindEmail} from "../models/user";


// 회원가입
export const addUsers = async (newUser: SignupFormat) => {
    const response = await instance.post(`/user/signup`, newUser);
    console.log("회원가입", response)
    return response.data;
};

// 로그인
export const login = async (loginFormat: LoginFormat) => {
    const response = await instance.post(`/user/login`, loginFormat);
    // console.log("로그인", response);
    return response.data;
};

// 단순 비번변경
export const ChangePw = async (ChangePw: PwChangeFormat, userId: string | undefined,) => {
    const response = await instance.put(`user/${userId}/password`, ChangePw);
    //console.log("비번 변경완료", response)
    return response.data;
};

// 비번찾기 용 비번 변경 : 잃어버린 비밀번호 수정
export const ChangePw2 = async (ChangePw2: PwChangeFormat2) => {
    const response = await instance.post(`/auth/email/change-password`, ChangePw2);
    console.log("비번 변경완료", response)
    return response.data;
};


// 로그아웃
export const logout2 = async () => {
    const response = await instance.post(`/user/logout`);
    // console.log("로그아웃", response);
    return response.data;
};

// Email
// 회원가입: 이메일 인증 번호 전송
export const emailCheck = async (email: string) => {
    const response = await instance.post(`/auth/email/send-sign`, { email });
    return response;
};

// 회원가입: 이메일 인증 번호 검증
export const emailDoubleCheck = async (email: string, code: string) => {
    const response = await instance.post(`/auth/email/sign-check`, { email, code });
    return response;
};

// SMS_1(회원가입용)
// 회원가입 : 핸드폰 인증 번호 전송 (SMS)
export const mobileCheck = async (to: string) => {
    const response = await instance.post(`/auth/sms/send-sign`, { to });
    return response;
};

// 회원가입 : 핸드폰 인증 번호 검증 (SMS)
export const mobileDoubleCheck = async (smsConfirmNum: string, phoneNumber:string ) => {
    const response = await instance.post(`/auth/sms/check`, {smsConfirmNum:smsConfirmNum, phoneNumber:phoneNumber });
    return response;
};

// SMS_2(이메일 찾기용 번호 검증)
// 이메일 찾기 : 핸드폰 번호 있나 체크(회원가입과 반대)
export const findmobileCheck = async( to: string) => {
    const response = await instance.post(`/auth/sms/send-id`, { to }); 
    return response;
};

// 이메일 찾기 : 폰번호, 인증 코드 보내고 맞으면 바로 이메일을 담아줌.
  export const findEmail = async (phoneNumber: string, smsConfirmNum: string) => {
    const response = await instance.post(`/auth/sms/find-email`,{phoneNumber, smsConfirmNum});
    return response;
};

// 비번 찾기용 이메일 인증 번호 전송
export const emailCheckTofindPassword = async (email: string) => {
    const response = await instance.post(`/auth/email/send-pw`, { email});
    return response;
};

// 임시비번 체크와 확인용
export const TempPassword = async (email: string, code: string) => {
    const response = await instance.post(`/auth/email/pw-check`, { email, code });
    return response;
};

// 회원탈퇴
export const deleteUser = async () => {
    const response = await instance.post(`/user/cancel`);
    console.log("탈퇴", response);
    return response.data;
};

