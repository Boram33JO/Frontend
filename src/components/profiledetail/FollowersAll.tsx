import { styled } from "styled-components";

const FollowersAll = () => {
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
    {
      id: "5",
      thumbnail:
        "https://i.scdn.co/image/ab676161000051746a224073987b930f99adc706",
        nickname : '스위프티',
      },
      // {
      //   id: "6",
      //   thumbnail:
      //     "https://i.scdn.co/image/ab676161000051746a224073987b930f99adc706",
      //     nickname : '스위프티',
      //   },
      //   {
      //     id: "7",
      //     thumbnail:
      //       "https://i.scdn.co/image/ab676161000051746a224073987b930f99adc706",
      //       nickname : '스위프티',
      //     },
  ];
  return (
    <InnerContainer>
      <Follower1>
        <H3>ㅇㅇ님의 팔로워</H3>
        <Stbutton>관리</Stbutton>
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
  padding: 0px 20px;
  margin-top: 48px;
  margin-bottom: 48px;
`;

const Follower1 = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  align-items: center; // 요소들을 수직 가운데 정렬하기 위해 추가
  gap: 48%; // 간격
`;
const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const Stbutton = styled.button`
  width: 50px;
  height: 30px;

  background-color: #d2d2d2;
  border: none;
  border-radius: 24px;

  font-family: "Pretendard";

  cursor: pointer;

  &:hover {
    background-color: #e2e2e2;
  }
`;

const FamousList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FamousListItem = styled.div`
  width: 65px;
  height: 90px; /* 수정: 요소들의 높이를 늘려서 닉네임이 썸네일 밑에 나타나도록 함 */
  display: flex;
  flex-direction: column; /* 수정: 요소들을 세로 방향으로 정렬하기 위해 column으로 설정 */
  align-items: center;
  cursor: pointer;
  
  &:hover {
    opacity: 0.7;
  }
`;

const FamousListThumb = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
`;

const FamousListNickName = styled.div`
  font-size: 14px;
  margin-top: 5px; /* 수정: 썸네일 아래에 간격을 두어 닉네임이 적절히 나타나도록 함 */
  text-align: center; /* 수정: 텍스트를 가운데 정렬로 설정 */
`;

