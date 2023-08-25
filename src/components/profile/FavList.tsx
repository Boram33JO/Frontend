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
    // 버튼 클릭 시 원하는 페이지로 이동
    navigate(`/profile/${userId}/wishlist`);
  };

  return (
    <>
      <InnerContainer>
        <TitleSection>
          <H3>{`${userInfo.nickname}님이 좋아한 포스팅`}</H3>
          <Bt onClick={handleViewAllClick}>전체보기</Bt>
        </TitleSection>
        {wishList.length === 0 ? (
          <NoDataMessage>아직 맘에 드는 포스팅이 없나요?</NoDataMessage>
        ) : (
          wishList.map((post) => (
            <ListItem key={post.postId} post={post} />
          ))
        )}
      </InnerContainer>
    </>
  );
};

const NoDataMessage = styled.p`
  font-size: 16px;
  color: #e7e6f0;
`;

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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: #e7e6f0;
`;

const Bt = styled.div`
  font-size: 14px;
  font-family: "Pretendard";
  color: #e7e6f0;
  cursor: pointer;
`;

export default FavList;
