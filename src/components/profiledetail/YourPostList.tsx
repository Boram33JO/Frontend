import React, { useState } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { Post } from "../../models/post";
import MyListItem from "../common/MyListItem";
import { useQuery } from "react-query";
import { getMyPostLists } from "../../api/profile";


const YourPostList = () => {
  const { userId } = useParams();

  // const handleViewAllClick = () => {
  //   // 항상 userIdFromUrl을 사용하여 URL에 담긴 사용자의 닉네임을 표시
  //   navigate(`/profile/${userId}/post`);
  // };

  const { data, isLoading, isError } = useQuery(["posts"], async () => {
    const response = await getMyPostLists(userId);
    console.log(" 내가쓴 포스팅 response:", response); // response를 console에 출력
    // console.log("포스트 response:", response.data.nickname);
    return response.data.postList;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  
  return (
    <>
      <InnerContainer>
        <TitleSection>
          <H3>{data.nickname}포스팅</H3>
        </TitleSection>
        {data.map((post: Post) => {
          return <MyListItem key={post.postId} post={post}></MyListItem>;
        })}
      </InnerContainer>
    </>
  );
};

export default YourPostList;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  padding-top: 40px;

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

