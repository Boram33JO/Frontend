import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '../../models/post';
import MyListItem from '../common/MyListItem';
import { UserInfo } from '../../models/user';

interface Props {
  userInfo: UserInfo,
  postList: Post[]
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
          <H3>{`${userInfo.nickname}님의 포스팅`}</H3>
          <Bt onClick={handleViewAllClick}>{`전체보기`}</Bt>
        </TitleSection>
        {postList.length === 0 ? (
          <NoDataMessage>아직 포스팅이 없습니다.</NoDataMessage>
        ) : (
          postList.map((post) => (
            <MyListItem key={post.postId} post={post} />
          ))
        )}
      </InnerContainer>
    </>
  );
};

export default List;

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
`

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
