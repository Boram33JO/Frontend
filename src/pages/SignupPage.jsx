import { styled } from "styled-components";
import BasicSignUp from "../components/signup/BasicSignUp";
import { useNavigate } from "react-router-dom";


const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <InnerContainer>
        <H1>회원가입</H1>
        <BasicSignUp />
        <SignUp>
          <div>이미 회원이신가요?</div>
          &nbsp;
          <Stlink2 onClick={() => { navigate('/login') }}>로그인</Stlink2>
        </SignUp>
      </InnerContainer>
    </Container>
  );
};

export default SignupPage;

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

const H1 = styled.h1`
  font-size: 28px;
  color: #e7e6f0;
  font-weight: 700;

  line-height: 24px;
  padding-left: 20px;
`;

const SignUp = styled.div`
  color: #b2b2b2;
  font-weight: 600;
  display: flex;
  align-items: center; /* 요소들을 수직으로 가운데 정렬 */
  justify-content: center; /* 요소들을 수평으로 가운데 정렬 */
  flex-direction: row; /* 요소들을 가로로 배치 */
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
