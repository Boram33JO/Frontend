import instance from "./common";
import { LoginFormat, SignupFormat, PwChangeFormat, PwChangeFormat2, DeleteUserFormat } from "../models/user";


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

//비번변경
// export const ChangePw = async (ChangePw: PwChangeFormat, userId: string | undefined,) => {
//     const response = await instance.put(`/${userId}/password`, ChangePw);
//     console.log("비번 변경완료", response)
//     return response.data;
// };

// 단순 비번변경
export const ChangePw = async (ChangePw: PwChangeFormat, userId: string | undefined,) => {
    const response = await instance.put(`user/${userId}/password`, ChangePw);
    //console.log("비번 변경완료", response)
    return response.data;
};

// 비번찾기 용 비번 변경
export const ChangePw2 = async (ChangePw2: PwChangeFormat2) => {
    const response = await instance.post(`user/change-password`, ChangePw2);
    //console.log("비번 변경완료", response)
    return response.data;
};


// export async function ChangePw(PwChangeFormat, userId) {
//     try {
//       const response = await instance.put(`/${userId}/password`, PwChangeFormat);
//       console.log("비밀번호 변경 완료", response);
//       return response.data;
//     } catch (error) {
//       // 오류 처리 로직 추가
//       throw error;
//     }
//   }

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
};
// 리퀘스트 바디에 타입. 이번 요청은 찾기용 이메일 인증, 구분해서 보내기로했다.
// 그때 바디로 타입을 둔다.
// 리퀘스트 파람, 리퀘스트 바디에

// 이메일 인증 번호 검증
export const emailDoubleCheck = async (email: string, code: string) => {
    const response = await instance.post(`/auth/check`, { email, code });
    return response;
};

// 회원가입 : 핸드폰 인증 번호 전송 (SMS)
export const mobileCheck = async (to: string) => {
    const response = await instance.post(`/sms/send`, { to });
    return response;
};


// 회원가입 : 핸드폰 인증 번호 검증 (SMS)
export const mobileDoubleCheck = async (smsConfirmNum: string, to: string) => {
    const response = await instance.post(`/sms/check`, { smsConfirmNum, to });
    return response;
};


// 이메일 찾기 : 핸드폰인증 체크
export const findmobileCheck = async (to: string, find: string) => {
    const response = await instance.post(`/sms/send2`, { to, find }); 
    return response;
};

// // 이메일 찾기 : 검증 후 이메일 찾아주는 메소드.
// export const findmobileDoubleCheck = async (smsConfirmNum: string, to: string) => {
//     const response = await instance.get(`/find-email`, { smsConfirmNum, to });
//     return response;
// };



// 비번 찾기용 이메일 인증 번호 전송
export const emailCheckTofindPassword = async (email: string) => {
    const response = await instance.post(`/auth/before-email`, { email });
    return response;
};

// 임시비번 체크와 확인용
export const TempPassword = async (email: string, code: string) => {
    const response = await instance.post(`/auth/check`, { email, code });
    return response;
};

// 임시비번 체크와 확인용
// export const deleteUser = async (email: string, code: string) => {
//     const response = await instance.delete(`/auth/check`, { email, code });
//     return response;
// };

// /user/find-email // 앞에 인증이 true가 나오면 된다.


// 회원탈퇴
export const deleteUser = async () => {
    const response = await instance.post(`/user/cancel`);
    // console.log("로그인", response);
    return response.data;
};


// 
export const find = async () => {
    const response = await instance.post(`/auth/before-email`);
    // console.log("로그인", response);
    return response.data;
};

