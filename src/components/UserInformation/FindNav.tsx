import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface StBoxProps {
  $active: boolean;
}

// ProfileNav2 컴포넌트: userId에 따라 다른 메시지를 렌더링하는 컴포넌트
const FindNav: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(
    location.pathname.split('/').pop() || 'email'
  );

  const navigate = useNavigate();
  const { userId } = useParams();

  const handleTabClick1 = (tab: string) => {
    setActiveTab(tab);
    navigate(`/email`);
  };

  const handleTabClick2 = (tab: string) => {
    setActiveTab(tab);
    navigate(`/password`);
  };

  return (
    <StBox>
      <StBox1 $active={activeTab === 'email' } onClick={() => handleTabClick1('')}>
        {/* {nickname} */}
        {`이메일 계정 찾기`}
      </StBox1>
      <StBox3 $active={activeTab === 'password'} onClick={() => handleTabClick2('follow')}>
        {`비밀번호 찾기`}
      </StBox3>
    </StBox>
  );
};


export default FindNav;

const StBox = styled.div`
display: flex;
font-family: "Pretendard";
font-size: 16px;
font-weight: 700;
justify-content: space-evenly; /* 아이템 간격 조절 */

padding-top: 20px;
border-bottom: 2px solid #5b5b5b;

`;

const StBox1 = styled.div<StBoxProps>`
text-align: center;
padding-bottom: 5px;
margin-bottom: -2px;
cursor: pointer;
color: ${(props) => (props.$active ? ' #E7E6F0;' : '#5b5b5b')};
border-bottom: ${(props) => (props.$active ? '2px solid #8084f3' : 'none')};
`;

const StBox3 = styled.div<StBoxProps>`
text-align: center;
padding-bottom: 5px;
margin-bottom: -2px;
cursor: pointer;
color: ${(props) => (props.$active ? ' #E7E6F0;' : '#5b5b5b')};
border-bottom: ${(props) => (props.$active ? '2px solid #8084f3' : 'none')};
`;

