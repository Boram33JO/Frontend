import React from "react";
import styled from "styled-components";

const AllCommentsList = () => {
 
 
  return (
    <InnerContainer>
      <Post>
        <H3>나의 댓글 모아보기</H3>
      </Post>

      <MusicList>
        <MusicListItem>
          <Content>운동할 때 듣습니다.</Content>
          <Date>23.07.31</Date>
        </MusicListItem>
      </MusicList>
    </InnerContainer>
  );
};

export default AllCommentsList;

const InnerContainer = styled.div`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  padding-top: 52px;
`;

const Post = styled.div`
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
  font-family: "Pretendard";
  color: #e7e6f0;
  cursor: pointer;
`;

const MusicList = styled.ol`
  display: block;
`;

const MusicListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 76px;
  width: 256px;
  border-radius: 6px;
  border: 1px solid #524d58;
  background-color: #434047;
  margin-top: 16px;
  padding-top: 20px;
  padding-left: 12px;
`;

const Content = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #d9d8df;
`;

const Date = styled.div`
  font-size: 14px;
  color: #a6a3af;
  font-weight: 500;
  padding-top: 10px;
`;
