import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import YourPostList from "../profiledetail/YourPostList";
import { useEffect, useState } from "react";
import { getProfileLists } from "../../api/profile";

interface FavListProps {
  userIdFromUrl: string | undefined; // userIdFromUrl의 타입을 명시
}

const FavList: React.FC<FavListProps> = ({ userIdFromUrl }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [nickname, setNickname] = useState('');

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
    // Navigate to the desired page when the button is clicked
    navigate(`/profile/${userIdFromUrl}/wishlist`);
  };

  return (
    <>
      <InnerContainer>
        <Post>
          <H3>{`${nickname}님이 좋아한 포스팅`}</H3>
          <Bt onClick={handleViewAllClick}>전체보기</Bt>
        </Post>
      </InnerContainer>
      <YourPostList userId={userId}/>
    </>
  );
};

export default FavList;

const InnerContainer = styled.div`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  padding-top: 52px;
`;

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

