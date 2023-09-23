import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../../models/post";
import ListItem from "../common/ListItem";
import { UserInfo } from "../../models/user";
import { ReactComponent as Nodata } from "../../assets/images/login_signup_profile/icon_no_data.svg";

interface Props {
  userInfo: UserInfo;
  postList: Post[];
}

const List = ({ userInfo, postList }: Props) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleViewAllClick = () => {
    // 항상 userIdFromUrl을 사용하여 URL에 담긴 사용자의 닉네임을 표시
    navigate(`/profile/${userId}/post`);
  };

  return (
    <>
      <InnerContainer>
        <TitleSection>
          {userInfo && userInfo.nickname && (
            <H3>{`${userInfo.nickname}님의 포스팅`}</H3>
          )}
          {postList.length === 0 ? null : (
            <Bt onClick={handleViewAllClick}>{`전체보기`}</Bt>
            // 또는 아무 내용도 없는 <></> 사용
          )}
        </TitleSection>
        {postList.length === 0 ? (
          <Pple>
            <StNodata />
            <NoDataMessage>아직 포스팅 작성 전이군요!</NoDataMessage>
          </Pple>
        ) : (
          postList.map((post) => <ListItem key={post.postId} post={post} />)
        )}
      </InnerContainer>
    </>
  );
};

export default List;

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
  color: #8e8d92;
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
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  justify-content: space-between;
  align-items: center; // 요소들을 수직 가운데 정렬하기 위해 추가
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
