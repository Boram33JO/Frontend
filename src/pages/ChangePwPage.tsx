import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ChangePassword from "../components/UserInformation/ChangePw";


const ChangePwPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <Container>
      <InnerContainer>
        <H3>비밀번호를 바꾸시겠어요?</H3>
        <LoginSection>
          <ChangePassword />
        </LoginSection>
          <SignUp>
          <div>피플 메인페이지로</div>
          &nbsp;
          <Stlink2 onClick={() => { navigate('/') }}>돌아가기</Stlink2>
        </SignUp>
      </InnerContainer>
    </Container>
    </>
  );
};

export default ChangePwPage;

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
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 100%;
  height: 600px;
`

const H3 = styled.h3`
  font-size: 22px;
  color: #e7e6f0;
  font-weight: 600;
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
  padding-top: 70px;
  padding-bottom: 50px;
`;

const Stlink2 = styled.a`
  text-decoration: underline;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  cursor: pointer;
  color: #b2b2b2; 
`;
