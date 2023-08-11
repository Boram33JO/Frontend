import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

interface StBoxProps {
  active: boolean;
}

const ProfileNav: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(
    location.pathname.split('/').pop() || 'post'
  );

  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    navigate(`/profile/{userId}/${tab}`);
  };

  return (
    <StBox>
      <StBox1 active={activeTab === 'post'} onClick={() => handleTabClick('post')}>
        ㅇㅅㅇ님의 포스팅
      </StBox1>
      
      <StBox3 active={activeTab === 'follow'} onClick={() => handleTabClick('follow')}>
        ㅇㅅㅇ님의 피플러
      </StBox3>
    
  
    </StBox>
  );
};

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
  color: ${(props) => (props.active ? ' #E7E6F0;' : '#5b5b5b')};
  border-bottom: ${(props) => (props.active ? '2px solid #8084f3' : 'none')};
`;

const StBox3 = styled.div<StBoxProps>`
  text-align: center;
  padding-bottom: 5px;
  margin-bottom: -2px;
  cursor: pointer;
  color: ${(props) => (props.active ? ' #E7E6F0;' : '#5b5b5b')};
  border-bottom: ${(props) => (props.active ? '2px solid #8084f3' : 'none')};
`;



export default ProfileNav;
