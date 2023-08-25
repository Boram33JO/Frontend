import React from "react";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "../components/login/KakaoLogin";
import BasicLogin from "../components/login/BasicLogin";
import { styled } from "styled-components";


const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <InnerContainer>
        <H3>로그인 테스트</H3>
        <LoginSection>
          <BasicLogin />
          <KakaoLogin />
        </LoginSection>
        <SignUp>
          <div>아직 피플의 회원이 아니신가요?</div>
          &nbsp;
          <Stlink2 onClick={() => { navigate('/signup') }}>회원가입</Stlink2>
        </SignUp>
      </InnerContainer>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 390px;
    height: 90vh;
    margin: auto;
    background-color: #141414;
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 600px;
`

const H3 = styled.h3`
  font-size: 28px;
  color: #e7e6f0;
  font-weight: 700;
  line-height: 24px;
  padding-left: 20px;
`;

const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
`

const SignUp = styled.div`
  color: #b2b2b2;
  font-weight: 500;
  display: flex;
  align-items: center; /* 요소들을 수직으로 가운데 정렬 */
  justify-content: center; /* 요소들을 수평으로 가운데 정렬 */
  flex-direction: row; /* 요소들을 가로로 배치 */

  margin-top: 50px;
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
