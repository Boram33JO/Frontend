import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getMyPostLists } from '../../api/profile';
import MyListItem from '../common/MyListItem';

interface YourPostListProps {
  userId?: string;
}

const YourPostList = ({ userId }: YourPostListProps) => {
  const navigate = useNavigate();
  const { data: postList, isLoading, isError } = useQuery(
    ['favorite'],
    async () => {
      const response = await getMyPostLists(userId);
      return response.data;
    }
  );

  // 예시 데이터로 nickname 설정 (이에 맞게 수정)
  const nickname = '사용자님'; 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <InnerContainer>
      <TitleSection>
        {/* 사용자의 닉네임을 보여주는 부분 */}
        <H3>{`${nickname}님의 포스팅`}</H3>
      </TitleSection>
      {/* postList를 map 함수로 렌더링 */}
      {postList.map((post: any) => (
        <MyListItem key={post.postId} post={post} />
      ))}
      
    </InnerContainer>
  );
};

export default YourPostList;

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
  font-weight: 600;
  color: #e7e6f0;
`;
