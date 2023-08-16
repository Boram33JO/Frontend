import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { ReactComponent as KakaoSVG } from "../../assets/images/login_signup/kakao.svg"; // 변경된 부분

const KakaoLogin = () => {
  const REST_API_KEY = "545665f819304672fe24245d39231f28";
  const REDIRECT_URI = `http://localhost:3000/api/oauth/token`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const navigate = useNavigate();

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
        cursor: "pointer",
        marginBottom: "100%",
      }}
    >
    <KakaoSVG 
        className="kakaoLoginImage"
        onClick={handleKakaoLogin} /> 
    
      <SignUp>
        <div>아직 피플의 회원이 아니신가요?</div>
        &nbsp;
        <Stlink2 onClick={() => { navigate('/signup') }}>회원가입</Stlink2>
      </SignUp>
     
    </div>
  );
};

export default KakaoLogin;

const SignUp = styled.div`
  color: #b2b2b2;
  font-weight: 500;
  display: flex;
  align-items: center; /* 요소들을 수직으로 가운데 정렬 */
  justify-content: center; /* 요소들을 수평으로 가운데 정렬 */
  flex-direction: row; /* 요소들을 가로로 배치 */
  padding-top: 152px;
  font-size: 16px;
`;

const Stlink2 = styled.a`
  text-decoration: underline;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  cursor: pointer;
  color: #b2b2b2; 
`;

