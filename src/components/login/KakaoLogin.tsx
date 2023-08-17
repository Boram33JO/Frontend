import React from "react";

import { styled } from "styled-components";
import { ReactComponent as KakaoSVG } from "../../assets/images/login_signup/kakao.svg"; // 변경된 부분

const KakaoLogin = () => {
  const REST_API_KEY = "545665f819304672fe24245d39231f28";
  const REDIRECT_URI = `http://localhost:3000/api/oauth/token`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  console.log(REST_API_KEY);
  console.log(REDIRECT_URI);

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
    // navigate(`/kakao/auth`)
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer"
      }}
    >
      <KakaoSVG
        className="kakaoLoginImage"
        onClick={handleKakaoLogin} />
    </div>
  );
};

export default KakaoLogin;


const Stlink2 = styled.a`
  text-decoration: underline;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  cursor: pointer;
  color: #b2b2b2; 
`;

