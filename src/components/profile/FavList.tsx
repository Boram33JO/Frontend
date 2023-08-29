import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../../models/post";
import ListItem from "../common/ListItem";
import { UserInfo } from "../../models/user";
import { ReactComponent as Nodata } from "../../assets/images/login_signup_profile/icon_no_data.svg";

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
          {wishList.length === 0 ? (
 null
) : (  <Bt onClick={handleViewAllClick}>{`전체보기`}</Bt>
  // 또는 아무 내용도 없는 <></> 사용
)}
        </TitleSection>
        {wishList.length === 0 ? (
          <Pple>
<StNodata/>
<NoDataMessage>아직 피플한 포스팅이 없네요!</NoDataMessage>
          </Pple>
        ) : (
          wishList.map((post) => (
            <ListItem key={post.postId} post={post} />
          ))
        )}
      </InnerContainer>
    </>
  );
};

const Pple = styled.div`
 display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #252427;
  padding-top: 24px;
  padding-bottom: 24px;
  border-radius: 8px;
`;
const StNodata = styled(Nodata)`
width: 50px; /* 원하는 크기로 조정 */
  height: 58px; /* 원하는 크기로 조정 */
`;

const NoDataMessage = styled.p`
padding-top: 10px;
  font-size: 16px;
  color: #8E8D92;
  text-align: center; /* 가운데 정렬을 추가 */
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
