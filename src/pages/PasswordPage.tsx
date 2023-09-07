import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import FindPassword from "../components/UserInformation/FindPassword";
import FindNav from "../components/UserInformation/FindNav";
import NotFoundPage from "./NotFoundPage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";


const PasswordPage = () => {
  const navigate = useNavigate();
  const LoginUser = useSelector((state: RootState) => state.user);


  if (LoginUser.isLogin === true) {
    return <NotFoundPage />;
  }


  return (
    <>
     <FindNav/>
    <Container>
      <InnerContainer>
        <H3>비밀번호를 잊으셨나요?</H3>
        <Ment>가입한 이메일 계정을 입력하시면, <br />인증코드를 발송해 드립니다.</Ment>
        
        <LoginSection>
          <FindPassword />
        </LoginSection>

          <SignUp>
          {/* <div>비밀번호가 기억나셨나요?</div>
          &nbsp; */}
          {/* 이거 만들다가 기절 */}
          {/* <Stlink2 onClick={() => { navigate('/login') }}>로그인</Stlink2> */}
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
  padding-top: 28px;
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
  padding-top: 200px;
`;

const Stlink2 = styled.a`
  text-decoration: underline;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  cursor: pointer;
  color: #b2b2b2; 
`;
