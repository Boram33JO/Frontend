import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import FindNav from "../components/UserInformation/FindNav";
import DeleteUser from "../components/UserInformation/DeleteUser";


const EmailPage = () => {
  const navigate = useNavigate();
  return (
    <>

    <Container>
      <InnerContainer>
        <H3> 정말 피플을 떠나시나요...?</H3>
        <Ment>1. 탈퇴 시, 작성하신 게시물 및 댓글은 영구 삭제됩니다. <br />또한 복구되지 않습니다.</Ment>
        <Ment>2. 탈퇴 시, 팔로우 한 팔로워 정보는 영구 삭제됩니다. <br />또한 복구되지 않습니다.</Ment>
        <Ment>3. 탈퇴 시, 개인 정보는 모두 삭제됩니다. </Ment>
        
        <LoginSection>
          <DeleteUser />
        </LoginSection>

          <SignUp>
          <div>피플을 계속 이용하시나요?</div>
          &nbsp;
          <Stlink2 onClick={() => { navigate('/') }}>돌아가기</Stlink2>
        </SignUp>

      </InnerContainer>
    </Container>
    </>
  );
};

export default EmailPage;

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
  padding-top: 20px;
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
