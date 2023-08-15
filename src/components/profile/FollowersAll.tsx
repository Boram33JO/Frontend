import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { getFollowLists, getProfileLists } from '../../api/profile';
import { useQuery } from 'react-query';
import { User } from '../../models/user';
import { getProfileImage } from '../../utils/common';

interface Props {
  followList: User[]
}

const FollowersAll = ({ followList }: Props) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [nickname, setNickname] = useState('');

  // Fetch the nickname using userIdFromUrl
  // const fetchNickname = async () => {
  //   try {
  //     const response = await getProfileLists(userIdFromUrl);
  //     if (response && response.data && response.data.nickname) {
  //       setNickname(response.data.nickname);
  //     }
  //   } catch (error) {
  //     console.error('닉네임을 가져오는 중 에러 발생:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (userIdFromUrl) {
  //     fetchNickname();
  //   }
  // }, [userIdFromUrl]);

  const handleViewAllClick = () => {
    navigate(`/profile/${userId}/follow`);
  };

  // const { data, isLoading, isError } = useQuery(
  //   ['follow', userId],
  //   async () => {
  //     const response = await getFollowLists(userId);
  //     return response.data;
  //   }
  // );

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error...</div>;
  // }

  return (
    <InnerContainer>
      <Follower1>
        <H3>{`${nickname}님의 피플러`}</H3>
        <Bt onClick={handleViewAllClick}>전체보기</Bt>
      </Follower1>
      <FamousList>
        {followList.map((item) => (
          <FamousListItem
            key={item.userId}
            onClick={() => navigate(`/profile/${item.userId}`)}
          >
            <FamousListThumb src={getProfileImage(item.userImage)} />
            <FamousListNickName>{item.nickname}</FamousListNickName>
          </FamousListItem>
        ))}
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-family: 'Pretendard';
  color: #e7e6f0;
  cursor: pointer;
`;

const FamousList = styled.div`
  display: flex;
  gap: 16px;
`;

const FamousListItem = styled.div`
  margin-top: 16px;
  width: 65px;
  height: 90px;
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
  width: 65px;
  height: 65px;
  border-radius: 50%;
`;

const FamousListNickName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #e7e6f0;
  margin-top: 10px;
  text-align: center;
`;
