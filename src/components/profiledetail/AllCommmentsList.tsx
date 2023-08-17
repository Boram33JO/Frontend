import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { getCommentsLists } from "../../api/profile";
import { getDateNotation } from "../../utils/common";
import { ReactComponent as IconComDel } from "../../assets/images/login_signup/icon_com_del.svg"; 
import { deleteComment } from "../../api/comment";


type myComment = {
  id: number;
  content: string;
  createdAt: string;
  postId: number;
  postTitle: string;
}

const AllCommentsList = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
 

  //console.log("qqqq", userId);


  const handleCommentClick = (postId: number) => {
  // 댓글을 클릭했을 때 해당 댓글의 상세 페이지로 이동
  navigate(`/detail/${postId}`);
};

const { data, isLoading, isError } = useQuery(["comments"], async () => {
  const response = await getCommentsLists(userId);
  return response.data;
});

const commentMutation = useMutation(deleteComment, {
  onSuccess: () => {
    queryClient.invalidateQueries(["comments"]);
  },
});

const handleCommentDelete = (postId: number) => {
  commentMutation.mutate(postId.toString()); // postId를 문자열로 변환하여 전달
};

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
         data.length === 0 ? (<NoDataMessage>작성한 댓글이 없습니다.</NoDataMessage>
         ) : (
        data.map((item: myComment) => {
          return (
            <CommentList key={item.id} onClick={() => handleCommentClick(item.postId)}
            >
              <CommentListItem>
                <Delete>
                <Content>{item.content}</Content>
                <IconWrapper onClick={() => handleCommentDelete(item.id)}>
                <IconComDel key={item.id} />
                </IconWrapper>
                </Delete>
                <Date>{getDateNotation(item.createdAt)}</Date>
                <PostTitle >{`${item.postTitle}`}</PostTitle>
               
              </CommentListItem>
            </CommentList>
          )
        })
      )}
    </InnerContainer>
  );
};

export default AllCommentsList;


const NoDataMessage = styled.p`
  font-size: 16px;
  color: #e7e6f0;
`;


const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 40px;
  gap: 14px;
`;

const Post = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  justify-content: space-between;
  align-items: center; // 요소들을 수직 가운데 정렬하기 위해 추가
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: #e7e6f0;
  padding-bottom: 6px;
`;

const CommentList = styled.ol`
  display: block;
  cursor: pointer;
  
`;

const CommentListItem = styled.li`
  display: flex;
  flex-direction: column; /* 요소들을 수직으로 배치 */
  align-items: flex-start; /* 요소들을 수직 축에서 왼쪽으로 정렬 */
  height: 140px;
  width: 340px;
  border-radius: 6px;
  border: 1px solid #524d58;
  background-color: #434047;
  padding-top: 18px;
  padding-left: 14px;
`;




const Delete = styled.div`
width: 326px;
  display: flex;
  justify-content: space-between; /* 내부 요소들을 양쪽으로 정렬 */
  align-items: center; /* 내부 요소들을 수직 가운데로 정렬 */
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  svg {
  }
  z-index: 3;
`;



const Content = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #FAFAFA;

`;


const Date = styled.div`
  font-size: 14px;
  color: #a6a3af;
  font-weight: 500;
  padding-top: 10px;
`;

const PostTitle = styled.div`
  font-size: 14px;
  color: #a6a3af;
  font-weight: 500;
  margin-top: 60px;
`;
