import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCommentsLists } from "../../api/profile";
import { getDateNotation } from "../../utils/common";

interface Props {
  commentList: myComment[];
}

type myComment = {
  id: number;
  content: string;
  createdAt: string;
  postId: number;
}

const ListComments = ({ commentList }: Props) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    // Navigate to the desired page when the button is clicked
    navigate(`/profile/${userId}/comments`);
  };

  const handleCommentClick = (postId: number) => {
    // 댓글을 클릭했을 때 해당 댓글의 상세 페이지로 이동
    navigate(`/detail/${postId}`);
  };

  const { isLoading, isError } = useQuery(["comments"], async () => {
    const response = await getCommentsLists(userId);
    // console.log('댓글 response:', response);
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
        <Bt onClick={handleViewAllClick}>전체보기</Bt>
      </Post>
      <CommentList>
        {commentList.length === 0 ? (
          <NoDataMessage>작성한 댓글이 없습니다.</NoDataMessage>
        ) : (
          <CardList>
            {commentList.map((item) => (
              <CommentListItem key={item.id} onClick={() => handleCommentClick(item.postId)}>
                <Content>{item.content}</Content>
                <Date>{getDateNotation(item.createdAt)}</Date>
              </CommentListItem>
            ))}
          </CardList>
        )}
      </CommentList>
    </InnerContainer>
  );
};

export default ListComments;

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

  gap: 10px;
`;

const Post = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: #e7e6f0;
  margin-bottom: 10px;
`;

const Bt = styled.div`
  font-size: 14px;
  font-family: "Pretendard";
  color: #e7e6f0;
  cursor: pointer;
`;

const CommentList = styled.ol`
  display: block;
  cursor: pointer;
  overflow-x: auto; /* 가로 스크롤 가능한 영역으로 설정 */
  white-space: nowrap; /* 줄바꿈을 방지하여 가로로 나열되도록 설정 */

  &::-webkit-scrollbar {
    height: 4px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #dddddd;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #3a3a3a;
    border-radius: 10px;
  }

`;

const CardList = styled.div`
  display: inline-block; /* 가로로 나열하기 위해 inline-block 설정 */
  vertical-align: top; /* 가로 정렬을 위해 top 설정 */
  padding-bottom: 10px;
  margin-right: -10px;
  
`;

const CommentListItem = styled.li`
  display: inline-block; /* 가로로 나열하기 위해 inline-block 설정 */
  width: 256px;
  border-radius: 6px;
  border: 1px solid #524d58;
  background-color: #434047;
  padding: 18px 14px;
  margin-right: 12px;
  cursor: pointer;
  box-sizing: border-box; /* padding을 요소의 크기에 포함시키도록 설정 */
`;

const Content = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fafafa;
  overflow: hidden; /* Hide overflowing content */
  text-overflow: ellipsis; /* Show ellipsis when text overflows */
  white-space: nowrap; /* Prevent wrapping */
`;

const Date = styled.div`
  font-size: 14px;
  color: #a6a3af;
  font-weight: 500;
  padding-top: 10px;
`;
