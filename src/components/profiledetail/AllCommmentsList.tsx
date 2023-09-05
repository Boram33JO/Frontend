import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCommentsLists } from "../../api/profile";
import { getDateNotation } from "../../utils/common";
import { ReactComponent as IconComDel } from "../../assets/images/login_signup_profile/icon_com_del.svg";
import { deleteComment } from "../../api/comment";
import { ReactComponent as TitleSVG } from "../../assets/images/login_signup_profile/icon_title.svg";
import Modal from "../common/Modal";
import { ReactComponent as Start } from "../../assets/images/page_start.svg"
import { ReactComponent as End } from "../../assets/images/page_end.svg"
import { ReactComponent as Prev } from "../../assets/images/page_prev.svg"
import { ReactComponent as Next } from "../../assets/images/page_next.svg"
import SortButton2 from "./SortButton2";
import { SortType } from "./SortButton";
import { ReactComponent as Nodata } from "../../assets/images/login_signup_profile/icon_no_data.svg";
import Loading from "../map/Loading";


type myComment = {
  id: number;
  content: string;
  createdAt: string;
  postId: number;
  postTitle: string;
};

const AllCommentsList = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageButton, setPageButton] = useState<number[]>([]);

  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [activeSort, setActiveSort] = useState<SortType>(SortType.Newest);

  const handleCommentClick = (postId: number) => {
    navigate(`/detail/${postId}`);
  };


  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPage) {
      setPage(newPage);
    }
  };

  const handleSortChange = (sort: SortType) => {
    setActiveSort(sort);
    // Perform the data fetching and sorting based on the selected sort type here
  };


  const { data, isLoading, isError } = useQuery(["comments", page, totalPage, activeSort], async () => {
    const response = await getCommentsLists(userId, page, activeSort);
    //console.log(response.data);
    setTotal(response.data.totalElements);
    setTotalPage(response.data.totalPages);
    if (page === totalPage && page > 0) {
      setPage(page - 1);
    }
    const pageBasicRange = 5; // 기본 페이지 수
    const pageRange = Math.min(pageBasicRange, totalPage); // 표시될 페이지 수 : 총 페이지 수가 기본 페이지 수보다 작으면 총 페이지 수 만큼만 버튼 보이게
    const middlePage = Math.floor(pageRange / 2); // 표시될 페이지 수의 중간값
    const startPage = ((page - middlePage) < totalPage - pageRange + 1) ? Math.max(0, page - middlePage) : totalPage - pageRange; // 표시될 페이지의 시작 번호
    const array = Array.from({ length: pageRange }, (_, i) => startPage + i + 1);
    setPageButton(array);


    return response.data.content;
  });

  const commentMutation = useMutation((commentId: string) => deleteComment(commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      }
    }
  );

  const handleCommentDelete = (commentId: number) => {
    setSelectedCommentId(commentId);
    setDeleteModalOpen(true);
  };

  const deleteCommentAsync = async (commentId: string) => {
    try {
      await commentMutation.mutateAsync(commentId);
    } catch (error) {
      //console.error("댓글을 삭제하는 중에 오류가 발생했습니다.", error);
    }
    setDeleteModalOpen(false);
  };

  if (isLoading) {
    return <div>< Loading /></div>
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      <InnerContainer>
        <Post>
          <H3>나의 댓글 모아보기</H3>
        </Post>

        {data.length > 0 && (
          <SortButton2 activeSort={activeSort} onSortChange={handleSortChange} />)}
        {data && data.length === 0 ? (
          <Pple>
            <StNodata />
            <NoDataMessage>아직 댓글을 작성하지 않았습니다!</NoDataMessage>
          </Pple>
        ) : (
          data.map((item: myComment) => (
            <CommentList key={item.id}>
              <CommentListItem>
                <AllContain>
                  <TopSection>
                    <Delete>
                      <Content onClick={() => handleCommentClick(item.postId)}>
                        {item.content}
                      </Content>
                      <IconWrapper onClick={() => handleCommentDelete(item.id)}>
                        <IconComDel key={item.id} />
                      </IconWrapper>
                    </Delete>
                    <Date onClick={() => handleCommentClick(item.postId)}>
                      {getDateNotation(item.createdAt)}
                    </Date>
                  </TopSection>
                  <TitleZone>
                    <TitleSVGWrapper>
                      <TitleSVG />
                    </TitleSVGWrapper>
                    <PostTitle
                      onClick={() => handleCommentClick(item.postId)}
                    >{`${item.postTitle}`}</PostTitle>
                  </TitleZone>
                </AllContain>
              </CommentListItem>
            </CommentList>



          ))
        )}
        {isDeleteModalOpen && (
          <Modal
            first="정말 해당 댓글을 삭제하시겠어요?"
            second="삭제된 댓글은 다시 복구할 수 없습니다."
            buttonName="삭제"
            setToggle={setDeleteModalOpen}
            clickButton={() => deleteCommentAsync(selectedCommentId!.toString())}
          />
        )}
      </InnerContainer>

      {data.length > 0 && (
        <CommentListPagination>
          <SvgIcon onClick={() => handlePageChange(0)}><Start /></SvgIcon>
          <SvgIcon onClick={() => handlePageChange(page - 1)}><Prev /></SvgIcon>
          <Pagination>
            {
              pageButton.map((item) => {
                return (
                  <PageButton key={item} $click={item === page + 1} onClick={() => { handlePageChange(item - 1) }}>
                    {item}
                  </PageButton>
                )
              })
            }
          </Pagination>
          <SvgIcon onClick={() => handlePageChange(page + 1)}><Next /></SvgIcon>
          <SvgIcon onClick={() => handlePageChange(totalPage - 1)}><End /></SvgIcon>
        </CommentListPagination>
      )}
    </>
  );
};

export default AllCommentsList;

const Pple = styled.div`
 display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #252427;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 8px;
`;
const StNodata = styled(Nodata)`
width: 50px; /* 원하는 크기로 조정 */
  height: 58px; /* 원하는 크기로 조정 */
`;

const NoDataMessage = styled.p`
padding-top: 10px;
  font-size: 16px;
  color: #8E8D92;
  text-align: center; /* 가운데 정렬을 추가 */
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
  padding-top: 7px;;
`;

const CommentListItem = styled.li`
  display: flex;
  flex-direction: column; /* 요소들을 수직으로 배치 */
  align-items: flex-start; /* 요소들을 수직 축에서 왼쪽으로 정렬 */
  height: 140px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #524d58;
  background-color: #434047;
  box-sizing: border-box;
  padding: 18px 14px;
  position: relative; /* 부모 컨테이너에 대한 상대적인 위치 설정 */
`;

const AllContain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Delete = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between; /* 내부 요소들을 양쪽으로 정렬 */
  align-items: flex-start; /* 내부 요소들을 수직 가운데로 정렬 */
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
  gap: 4px; // 아이템 간격 설정
  align-items: flex-start; // 수직 가운데 정렬
  /* position: absolute; // 절대적인 위치 설정 */
  /* bottom: 0; // 아래쪽에 위치 */
  left: 14px; /* 왼쪽 여백 설정 */
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
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

const CommentListPagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    margin: 40px 0px 10px;
    gap: 10px;
`

const SvgIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
`

const Pagination = styled.div`
    display:flex;
`

const PageButton = styled.div < { $click: boolean }> `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: ${(props) => props.$click ? "#7462E2" : "transparent"};
    color: ${(props) => props.$click ? "#FAFAFA" : "#535258"};
    cursor: pointer;
`

