import React from "react";
import KakaoLogin from "../components/login/KakaoLogin";
import BasicLogin from "../components/login/BasicLogin";
import GlobalStyle from "../components/common/GlobalStyle";

const LoginPage = () => {
  return (
    <>
      <GlobalStyle/>
      <BasicLogin />
      <KakaoLogin />
      
    </>
  );
};

export default LoginPage;
