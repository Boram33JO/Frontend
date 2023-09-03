import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as PwSVG } from "../../assets/images/login_signup_profile/pw_ch.svg";
import { ReactComponent as ArrowSVG } from "../../assets/images/login_signup_profile/icon_arrow_pw.svg";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const DirectingButton: React.FC = () => {

    const navigate = useNavigate();
    const { userId } = useParams();

    const handlePwPageClick = () => {
        //toast.success("이 기능은 개발 중 입니다!");
        navigate(`/profile/${userId}/changepw`);
      };

      const handleWdPageClick = () => {
        toast.success("이 기능은 개발 중 입니다!");
        //navigate("/withdrawal");
        
      };
      return (
        <>
          <StInfoContainer>
            <Container onClick={handlePwPageClick}>
              <PwChange>
              <Wrapper>
                <StyledPwSVG />
                <ArrowWrapper>비밀번호 변경</ArrowWrapper>
                </Wrapper>
                <ArrowSVG />
               
              </PwChange>
            </Container>
            <WithD onClick={handleWdPageClick}>P.PLE을 탈퇴하시겠어요?</WithD>
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
    /* padding-top: 38px; */
    padding: 38px 20px;
    box-sizing: border-box; // 중요하다...!
    
    
`;

const PwChange = styled.div`
  color: #E7E6F0;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; 
  
`;
const Wrapper = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  align-items: center;
`;

const Container = styled.div`
  cursor: pointer;
  display: flex; /* Make the container a flex container */
  align-items: center; /* Center align its children vertically */
 
`;

const StyledPwSVG = styled(PwSVG)`
  color: #E7E6F0;
  width: 16px;
  height: 18px;
  cursor: pointer;
 
`;
const ArrowWrapper = styled.div`
  padding-left: 10px;
  color: #E7E6F0;
  font-size: 16px;
  font-weight: 500;
`;

const WithD = styled.div`
  padding-top: 46px;
  color: #8E8D92;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
