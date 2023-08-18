import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCommentsLists } from "../../api/profile";
import { getDateNotation } from "../../utils/common";
import { ReactComponent as IconComDel } from "../../assets/images/login_signup/icon_com_del.svg"; 
import { deleteComment } from "../../api/comment";
import { ReactComponent as TitleSVG } from "../../assets/images/login_signup/icon_title.svg"; // 변경된 부분


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
  const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      commentMutation.mutate(postId.toString()); // postId를 문자열로 변환하여 전달
    }
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
         data.length === 0 ? (<NoDataMessage>아직 작성한 댓글이 없습니다.</NoDataMessage>
         ) : (
        data.map((item: myComment) => {
          return (
            <CommentList key={item.id} 
            >
              <CommentListItem>
                <AllContain>
                <Delete>
                <Content onClick={() => handleCommentClick(item.postId)}>{item.content}</Content>
                <IconWrapper onClick={() => handleCommentDelete(item.id)}>
                <IconComDel key={item.id} />
                </IconWrapper>
                </Delete>
                <Date onClick={() => handleCommentClick(item.postId)} >{getDateNotation(item.createdAt)}</Date>
                <TitleZone>
                <TitleSVGWrapper>
    <TitleSVG />
  </TitleSVGWrapper>
                  <PostTitle onClick={() => handleCommentClick(item.postId)} >{`${item.postTitle}` }</PostTitle>
                  </TitleZone>
                  </AllContain>
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
  position: relative; /* 부모 컨테이너에 대한 상대적인 위치 설정 */
`;

const AllContain = styled.div`
  height: 120px;
  width: 320px;
`;


const Delete = styled.div`
width: 326px;
  display: flex;
  justify-content: space-between; /* 내부 요소들을 양쪽으로 정렬 */
  align-items: center; /* 내부 요소들을 수직 가운데로 정렬 */
  gap: 14px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  svg {
  }
`;



const Content = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fafafa;
  overflow: hidden; /* 넘치는 내용 가리기 */
  text-overflow: ellipsis; /* 텍스트가 컨테이너를 벗어날 때 '...' 표시 */
  /* white-space: nowrap;  */
  /* 줄바꿈 방지 */
  max-height: 40px; /* 최대 2줄 표시 */
  line-height: 20px; /* 줄 간격 조절 */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 3줄 표시 */
  -webkit-box-orient: vertical;
  cursor: pointer;
`;


const Date = styled.div`
  font-size: 14px;
  color: #a6a3af;
  font-weight: 500;
  padding-top: 10px;
  cursor: pointer;
`;

const TitleZone = styled.div`
  display: flex; // 가로로 배치하기 위해
  gap:4px; // 아이템 간격 설정
  align-items: center; // 수직 가운데 정렬
  padding-bottom: 20px; /* 항상 밑에 위치하도록 설정 */
  position: absolute; /* 절대적인 위치 설정 */
  bottom: 0; /* 아래쪽에 위치 */
  left: 14px; /* 왼쪽 여백 설정 */
  cursor: pointer;
  width: 300px;
  
`;

const TitleSVGWrapper = styled.div`
  width: 15px; // 원하는 너비 설정
  height: 15px; // 원하는 높이 설정
`;

const PostTitle = styled.div`
  font-size: 14px;
  color: #a6a3af;
  font-weight: 500;
  cursor: pointer;

  overflow: hidden; /* 넘치는 내용 가리기 */
  text-overflow: ellipsis; /* 텍스트가 컨테이너를 벗어날 때 '...' 표시 */
  /* white-space: nowrap;  */
  /* 줄바꿈 방지 */
  max-height: 40px; /* 최대 3줄 표시 */
  line-height: 16px; /* 줄 간격 조절 */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 3줄 표시 */
  -webkit-box-orient: vertical;
`;


