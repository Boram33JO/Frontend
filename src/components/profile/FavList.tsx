import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import YourPostList from "../profiledetail/YourPostList";

const FavLis = () => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    // Navigate to the desired page when the button is clicked
    navigate("/profile/{userId}/wishlist");
  };

  return (
    <>
      <InnerContainer>
        <Post>
          <H3>ㅇㅇ님이 좋아한 포스팅</H3>
          <Bt onClick={handleViewAllClick}>전체보기</Bt>
        </Post>
      </InnerContainer>
      <YourPostList />
    </>
  );
};

export default FavLis;

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

const MusicList = styled.ol`
  display: block;
`;

const MusicListItem = styled.li`
  display: flex;
  flex-direction: column; /* 요소들을 수직으로 배치 */
  align-items: flex-start; /* 요소들을 수직 축에서 왼쪽으로 정렬 */
  height: 50px;
  border-radius: 6px;
  background-color: #d2d2d2;
  margin-top: 16px;
  padding: 10px 10px;
`;

const Date = styled.div`
  font-size: 12px;
`;
const Content = styled.div`
  font-size: 12px;
  margin-top: 5px;
`;
const Iconbox = styled.div`
  display: flex; /* 요소들을 수평으로 나란히 배치 */
  align-items: center; /* 요소들을 수평 축에서 가운데로 정렬 */
  gap: 10px;
  margin-top: 10px;
`;

const Icon1 = styled.div`
  font-size: 12px;
`;
const Icon2 = styled.div`
  font-size: 12px;
`;
