import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { getFollowLists, getProfileLists } from '../../api/profile';
import { useQuery } from 'react-query';
import { User, UserInfo } from '../../models/user';
import { getProfileImage } from '../../utils/common';

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
