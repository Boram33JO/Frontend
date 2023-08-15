import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../../models/post";
import ListItem from "../common/ListItem";
import { UserInfo } from "../../models/user";

interface Props {
  userInfo: UserInfo,
  wishList: Post[]
}

const FavList = ({ userInfo, wishList }: Props) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleViewAllClick = () => {
    // Navigate to the desired page when the button is clicked
    navigate(`/profile/${userId}/wishlist`);
  };

  return (
    <>
      <InnerContainer>
        <TitleSection>
          <H3>{`${userInfo.nickname}님이 좋아한 포스팅`}</H3>
          <Bt onClick={handleViewAllClick}>전체보기</Bt>
        </TitleSection>
        {
          wishList.map((post) => {
            return (
              <ListItem key={post.postId} post={post} />
            )
          })
        }
      </InnerContainer>
    </>
  );
};

export default FavList;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  padding-top: 52px;
  gap: 20px;
`;

const TitleSection = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  justify-content: space-between;
  align-items: center; // 요소들을 수직 가운데 정렬하기 위해 추가
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  color: #e7e6f0;
`;

const Bt = styled.div`
  font-size: 14px;
  font-family: "Pretendard";
  color: #e7e6f0;
  cursor: pointer;
`;

