import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MyPostList from '../profiledetail/MyPostList';
import { getProfileLists } from '../../api/profile'; // 실제 API 함수의 경로로 업데이트해야 함

// List 컴포넌트의 프롭에 대한 타입 인터페이스 정의
interface ListProps {
  userIdFromUrl: string | undefined; // userIdFromUrl의 타입을 명시
}

const List: React.FC<ListProps> = ({ userIdFromUrl }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [nickname, setNickname] = useState('');
//   const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    // userIdFromUrl을 기반으로 nickname 정보를 가져옵니다.
    const fetchNickname = async () => {
      try {
        const response = await getProfileLists(userIdFromUrl);
        if (response && response.data && response.data.nickname) {
          setNickname(response.data.nickname);
        }
      } catch (error) {
        // 에러 처리
        console.error('닉네임을 가져오는 중 에러 발생:', error);
      }
    };

    if (userIdFromUrl) {
      fetchNickname();
    }
  }, [userIdFromUrl]);

  
  const handleViewAllClick = () => {
    // 항상 userIdFromUrl을 사용하여 URL에 담긴 사용자의 닉네임을 표시
    navigate(`/profile/${userIdFromUrl}/post`);
  };

  return (
    <>
      <InnerContainer>
        <Post>
        <H3>{`${nickname}님의 포스팅`}</H3>
        <Bt onClick={handleViewAllClick}>{`${nickname}님의 포스팅 전체보기`}</Bt>
        </Post>
      </InnerContainer>
      {/* <MyPostList /> */}
    </>
  );
};

export default List;




const InnerContainer = styled.div`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    padding-top: 52px;
   
  
`

const Post = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  justify-content: space-between;
  align-items: center; // 요소들을 수직 가운데 정렬하기 위해 추가
 
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  color: #e7e6f0;
  margin-bottom: 10px;
`;
const Bt = styled.div`
 font-size: 14px;
  font-family: "Pretendard";
  color: #e7e6f0;
  cursor: pointer;
 
`;
