import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { User, UserInfo } from '../../models/user';
import { getProfileImage } from '../../utils/common';
import { ReactComponent as Nodata } from "../../assets/images/login_signup_profile/icon_no_data.svg";


interface Props {
  userInfo: UserInfo,
  followList: User[]
}

const FollowersAll = ({ userInfo, followList }: Props) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  

  const handleViewAllClick = () => {
    navigate(`/profile/${userId}/follow`);
  };

  
  return (
    <InnerContainer>
      <Follower1>
        <H3>{`${userInfo.nickname}님의 피플러`}</H3> 
        
        {followList.length === 0 ? (
 null
) : (  <Bt onClick={handleViewAllClick}>{`전체보기`}</Bt>
  // 또는 아무 내용도 없는 <></> 사용
)}
      </Follower1>
      {followList.length === 0 ? (
        <Pple>
        <StNodata/>
                  <NoDataMessage>아직 팔로우한 피플러가 없네요!

</NoDataMessage>
                  </Pple>
      ) : (
        <FamousList>
          {followList.map((item) => (
            <FamousListItem
              key={item.userId}
              onClick={() => navigate(`/profile/${item.userId}`)}>
              <FamousListThumb src={getProfileImage(item.userImage)} />
              <FamousListNickName>{item.nickname}</FamousListNickName>
            </FamousListItem>
          ))}
        </FamousList>
      )}
    </InnerContainer>
  );
};

export default FollowersAll;

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
`

const Follower1 = styled.div`
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
  font-family: 'Pretendard';
  color: #e7e6f0;
  cursor: pointer;
`;

const FamousList = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const FamousListItem = styled.div`
  /* margin-top: 16px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const FamousListThumb = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ECECEC;
`;

const FamousListNickName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #e7e6f0;
  margin-top: 10px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70px; 
`;
// 뒤로가기 해
