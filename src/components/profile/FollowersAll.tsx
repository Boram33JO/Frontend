import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const FollowersAll = () => {

  const navigate = useNavigate();

  const handleViewAllClick = () => {
      // Navigate to the desired page when the button is clicked
      navigate('/profile/{userId}/follow');
  };

  const followers = [
    {
      id: "1",
      thumbnail:
        "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34",
        nickname : '이지금',
    },
    {
      id: "2",
      thumbnail:
        "https://i.scdn.co/image/ab676161000051745da361915b1fa48895d4f23f",
        nickname : '번히즈',
      },
    {
      id: "3",
      thumbnail:
        "https://i.scdn.co/image/ab67616100005174d642648235ebf3460d2d1f6a",
        nickname : '방타니',
      },
    {
      id: "4",
      thumbnail:
        "https://i.scdn.co/image/ab67616100005174c36dd9eb55fb0db4911f25dd",
        nickname : '화성형',
      },
   
  ];
  return (
    <InnerContainer>
      <Follower1>
        <H3>ㅇㅇ님의 피플러</H3>
        <Bt onClick={handleViewAllClick}>전체보기</Bt>
      </Follower1>
      <FamousList>
        {followers.map((item) => {
          
          return (

            <FamousListItem key={item.id}>
              <FamousListThumb src={item.thumbnail} />
              <FamousListNickName>{item.nickname}</FamousListNickName>
            </FamousListItem>
          );
        })}
      </FamousList>
    </InnerContainer>
  );
};

export default FollowersAll;

const InnerContainer = styled.div`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 52px;
  
`;

const Follower1 = styled.div`
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
 color: #e7e6f0;
  font-family: "Pretendard";

  cursor: pointer;
 
`;

const FamousList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FamousListItem = styled.div`
  margin-top: 16px;
  width: 65px;
  height: 90px; /* 수정: 요소들의 높이를 늘려서 닉네임이 썸네일 밑에 나타나도록 함 */
  display: flex;
  flex-direction: column; /* 수정: 요소들을 세로 방향으로 정렬하기 위해 column으로 설정 */
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  
  &:hover {
    opacity: 0.7;
  }
`;

const FamousListThumb = styled.img`
  width: 76px;
  height: 76px;
  border-radius: 50%;
`;

const FamousListNickName = styled.div`
  font-size: 14px; // 12
  font-weight: 500;
  color: #e7e6f0;
  margin-top: 10px; /* 수정: 썸네일 아래에 간격을 두어 닉네임이 적절히 나타나도록 함 */
  text-align: center; /* 수정: 텍스트를 가운데 정렬로 설정 */
`;

