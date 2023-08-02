import React from "react";
import KakaoLogin from "../components/login/KakaoLogin";
import BasicLogin from "../components/login/BasicLogin";
const LoginPage = () => {
  return (
    <>
      <BasicLogin />
      <KakaoLogin />
    </>
  );
};

export default LoginPage;
