import { useNavigate } from "react-router-dom";
import KakaoLogin from "../components/login/KakaoLogin";
import BasicLogin from "../components/login/BasicLogin";
import { styled } from "styled-components";
import Password from "../components/UserInformation/Password";
import FindNav from "../components/UserInformation/FindNav";


const PasswordPage = () => {
  const navigate = useNavigate();
  return (
    <>
     <FindNav/>
    <Container>
      <InnerContainer>
        <H3>비밀번호를 잊으셨나요?</H3>
        <Ment>가입하신 이메일을 입력하시면, <br />임시 비밀번호를 이메일로 발송해 드립니다.</Ment>
        
        <LoginSection>
          <Password />
        </LoginSection>

          <SignUp>
          <div>재발급을 완료하셨나요?</div>
          &nbsp;
          <Stlink2 onClick={() => { navigate('/login') }}>로그인</Stlink2>
        </SignUp>

      </InnerContainer>
    </Container>
    </>
  );
};

export default PasswordPage;

const Container = styled.div`
    /* position: relative; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 390px;
    min-height: 80vh;
    margin: auto;
    
`

const InnerContainer = styled.div`
  /* padding-top: 30px; */
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 100%;
  height: 600px;
`

const H3 = styled.h3`
  font-size: 22px;
  color: #e7e6f0;
  font-weight: 500;
  line-height: 24px;
  padding-left: 20px;
  /* margin-top: 20px; */
`;

const Ment = styled.div`
  font-size: 16px;
  color: #85848b;
  font-weight: 500;
  line-height: 24px;
  padding-left: 20px;
  padding-top: 30px;
`;

const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`

const SignUp = styled.div`
  color: #b2b2b2;
  font-weight: 500;
  display: flex;
  align-items: center; /* 요소들을 수직으로 가운데 정렬 */
  justify-content: center; /* 요소들을 수평으로 가운데 정렬 */
  flex-direction: row; /* 요소들을 가로로 배치 */
  font-size: 16px;
  padding-top: 280px;
`;

const Stlink2 = styled.a`
  text-decoration: underline;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  cursor: pointer;
  color: #b2b2b2; 
`;
