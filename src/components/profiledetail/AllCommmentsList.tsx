import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCommentsLists } from "../../api/profile";
import { getDateNotation } from "../../utils/common";

type myComment = {
  id: number;
  content: string;
  createdAt: string;
  postId: number;
}

const AllCommentsList = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  console.log("qqqq", userId);


  const handleCommentClick = (postId: number) => {
  // 댓글을 클릭했을 때 해당 댓글의 상세 페이지로 이동
  navigate(`/detail/${postId}`);
};


  const { data, isLoading, isError } = useQuery(["comments"], async () => {
    const response = await getCommentsLists(userId);
    console.log('댓글 response:', response); // response를 console에 출력
    return response.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <InnerContainer>
      <Post>
        <H3>나의 댓글 모아보기</H3>
      </Post>
      {
        data.map((item: myComment) => {
          return (
            <CommentList key={item.id} onClick={() => handleCommentClick(item.postId)}>
              <CommentListItem>
                <Content>{item.content}</Content>
                <Date>{getDateNotation(item.createdAt)}</Date>
              </CommentListItem>
            </CommentList>
          )
        })
      }
    </InnerContainer>
  );
};

export default AllCommentsList;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  padding-top: 52px;

  gap: 20px;
`;

const Post = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  justify-content: space-between;
  align-items: center; // 요소들을 수직 가운데 정렬하기 위해 추가
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  color: #e7e6f0;
`;

const CommentList = styled.ol`
  display: block;
  cursor: pointer;
`;

const CommentListItem = styled.li`
  display: flex;
  flex-direction: column; /* 요소들을 수직으로 배치 */
  align-items: flex-start; /* 요소들을 수직 축에서 왼쪽으로 정렬 */
  height: 76px;
  width: 256px;
  border-radius: 6px;
  border: 1px solid #524d58;
  background-color: #434047;
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
