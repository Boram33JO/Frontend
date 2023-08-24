import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getFollowLists } from '../../api/profile';
import { followUser } from '../../api/post';
import { getProfileImage } from '../../utils/common';

const Pictures = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const { data: followerData, isLoading, isError } = useQuery(
    ['Follow', userId],
    () => userId ? getFollowLists(userId) : Promise.resolve([]), // If userId is undefined, return an empty array
    { enabled: !!userId }
  );
  console.log(followerData); // 데이터 구조를 확인


// 팔로워 삭제를 위한 useMutation 훅을 사용합니다.
const mutation = useMutation(followUser, {
  onSuccess: () => {
    // 삭제 후 데이터를 다시 불러오기 위해 팔로워 정보 캐시를 무효화합니다.
    queryClient.invalidateQueries(['Follow', userId]);
  }
});

// "삭제" 버튼을 클릭했을 때 호출되는 함수입니다.
const handleDelete = (followerId: number) => {
  const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
  if (confirmDelete) {
    // 팔로워 삭제 API 호출을 수행합니다.
    mutation.mutate(followerId);
  }
};


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  // followerData를 활용하여 팔로워 정보 렌더링
  return (
    <InnerContainer>
      <Follower1>
        <H3>{`${followerData.nickname}님의 피플러`}</H3>
        <Nums>{`${followerData.followList.content}명`}</Nums>
      </Follower1>
      
      {followerData.followList.content.length === 0 ? (
        <NoDataMessage>아직 팔로우한 피플러가 없네요!</NoDataMessage>
      ) : (
        followerData.followList.content.map((follower: any) => (
          <MyProfile key={follower.userId} >
            <MyThumb src={getProfileImage(follower.userImage)} onClick={() => navigate(`/profile/${follower.userId}`)} />
            <MyProfile1>
              <MyProfile2>
                <Nickname>{follower.nickname}</Nickname>
                <Produce>{follower.introduce}</Produce>
              </MyProfile2>
              <Bt onClick={() => handleDelete(follower.userId)}>삭제</Bt>
            </MyProfile1>
          </MyProfile>
        ))
      )}
    </InnerContainer>
  );

        }
export default Pictures;

const NoDataMessage = styled.p`
  font-size: 16px;
  color: #e7e6f0;
  padding-top: 20px;;
`;


const InnerContainer = styled.div`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
  margin-top: 40px;
  margin-bottom: 48px;
`;
const Follower1 = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  align-items: center; // 요소들을 수직 가운데 정렬하기 위해 추가
  
`;
const Nums = styled.div`
margin-left: 10px;
font-size: 14px;
font-weight: 500;
color: #a6a3af;
align-items: center; 
`

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: #e7e6f0;
  margin-bottom: 8px;
`;
const Bt = styled.button`
  width: 53px;
  height: 30px;
  border: none;
  border-radius: 20px;

  font-size: 14px;
  font-weight: 600;
  font-family: "Pretendard";
  color: #e7e6f0;
  background: linear-gradient(135deg, #8084f4, #c48fed);

  text-align: center;

  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    color: #141414;
  }
  
 
`;
const MyProfile = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  align-items: center;
  /* justify-content: space-between; */
  margin-top: 20px; //
`;

const MyProfile1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* 자식 요소들이 가로로 나란히 정렬되도록 전체 너비 설정 */
`;

const MyThumb = styled.img`
  width: 62px;
  height: 62px;
  border-radius: 50%;
`;

const MyProfile2 = styled.div`
padding-left: 10px; // 원래 5정도?
`;

const Nickname = styled.div`
  font-size: 16px;
  font-weight: 600; //세미볼드
  color: #e7e6f0;
`;

const Produce = styled.div`
  font-size: 14px; 
  padding-top: 5px;
  color: #626262;
  font-weight: 500; //미디엄
 
`;