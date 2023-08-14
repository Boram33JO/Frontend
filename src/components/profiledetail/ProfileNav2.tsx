import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface StBoxProps {
  active: boolean;
}

// ProfileNav2 컴포넌트: userId에 따라 다른 메시지를 렌더링하는 컴포넌트
const ProfileNav2: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(
    location.pathname.split('/').pop() || 'post'
  );
  
    const navigate = useNavigate();
    const { userId } = useParams();
    const [nickname, setUserNickname] = useState('');
  
    const handleTabClick = (tab: string) => {
      setActiveTab(tab);
      navigate(`/profile/${userId}/${tab}`);
    };

 
  // userId가 유효한 경우에만 사용자의 nickname을 가져옵니다.
  useEffect(() => {
    if (userId) {
      fetchUserNicknameFromServer(userId).then((nickname) => setUserNickname(nickname));
    }
  }, [userId]);

  const fetchUserNicknameFromServer = async (userId: string) => {
    try {
      // 예시: 서버에서 사용자의 nickname을 가져오는 API 호출
      const response = await fetch(`/api/profile/${userId}`);
      const data = await response.json();
      return data.nickname;
    } catch (error) {
      console.error("사용자 nickname을 가져오는 중 오류 발생:", error);
      return "";
    }
  };


  return (

<StBox>
<StBox1 active={activeTab === 'post'} onClick={() => handleTabClick('post')}>
  {/* {nickname} */}
  {`${nickname}님의 포스팅`}
</StBox1>

<StBox3 active={activeTab === 'follow'} onClick={() => handleTabClick('follow')}>
  {/* {nickname} */}
  {`${nickname}님의 피플러`}
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

