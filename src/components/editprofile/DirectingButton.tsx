import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as PwSVG } from "../../assets/images/login_signup_profile/pw_ch.svg";
import { ReactComponent as ArrowSVG } from "../../assets/images/login_signup_profile/icon_arrow_pw.svg";
import { useNavigate } from 'react-router-dom';

const DirectingButton: React.FC = () => {

    const navigate = useNavigate();

    const handlePwPageClick = () => {
        // 여기에 이동할 경로를 지정해주세요.
        navigate("/password");
      };
  return (
    <>
      <StInfoContainer>
        <Container onClick={handlePwPageClick}>
          
          <PwChange>
            <Wrapper>
          <StyledPwSVG />
          </Wrapper>
          <Wrapper2>
           비밀번호 변경
           </Wrapper2>
           <ArrowSVG/>
          </PwChange>
        </Container>

        <WithD>
          P.PLE을 탈퇴하시겠어요?
        </WithD>
      </StInfoContainer>
    </>
  );
};

export default DirectingButton;

const StInfoContainer = styled.div`
   position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 390px;
    margin: auto;
    background-color: #141414;
    padding-top: 38px;
    padding-left: 20px;
    
`;

const PwChange = styled.div`
  color: #E7E6F0;
  display: flex;
  align-items: center;
`;
const Wrapper = styled.div`
  align-items: center;
`;
const Wrapper2 = styled.div`
padding-left: 10px;
align-items: center;
`;

const Container = styled.div`
  cursor: pointer;
`;

const StyledPwSVG = styled(PwSVG)`
  color: #E7E6F0;
  width: 16px;
  height: 18px;
  display: flex;
  justify-content: flex-end;

  cursor: pointer;
`;

const WithD = styled.div`
  padding-top: 46px;
  color: #8E8D92;
  font-size: 14px;
  font-weight: 500;

`;
