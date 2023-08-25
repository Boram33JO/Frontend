import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface StBoxProps {
  $active: boolean;
}

// ProfileNav2 컴포넌트: userId에 따라 다른 메시지를 렌더링하는 컴포넌트
const ProfileNav2: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(
    location.pathname.split('/').pop() || 'post'
  );

  const navigate = useNavigate();
  const { userId } = useParams();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    navigate(`/profile/${userId}/${tab}`);
  };

  return (
    <StBox>
      <StBox1 $active={activeTab === 'post'} onClick={() => handleTabClick('post')}>
        {/* {nickname} */}
        {`포스팅`}
      </StBox1>
      <StBox3 $active={activeTab === 'follow'} onClick={() => handleTabClick('follow')}>
        {`피플러`}
      </StBox3>
    </StBox>
  );
};


export default ProfileNav2;

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

