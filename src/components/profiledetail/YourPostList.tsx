import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { Post } from "../../models/post";
import ListItem from "../common/ListItem";
import { useQuery } from "react-query";
import { getMyPostLists } from "../../api/profile";
import { ReactComponent as Start } from "../../assets/images/page_start.svg";
import { ReactComponent as End } from "../../assets/images/page_end.svg";
import { ReactComponent as Prev } from "../../assets/images/page_prev.svg";
import { ReactComponent as Next } from "../../assets/images/page_next.svg";
import { useState } from "react";
import SortButton from "./SortButton";
import { SortType } from "./SortButton";
import { ReactComponent as Nodata } from "../../assets/images/login_signup_profile/icon_no_data.svg";
import Loading from "../map/Loading";

const YourPostList = () => {
  const { userId } = useParams();
  const [nickname, setNickname] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageButton, setPageButton] = useState<number[]>([]);

  const [activeSort, setActiveSort] = useState<SortType>(SortType.Newest);


  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPage) {
      setPage(newPage);
    }
  };
  const handleSortChange = (sort: SortType) => {
    setActiveSort(sort);
    // Perform the data fetching and sorting based on the selected sort type here
  };


  const { data, isLoading, isError } = useQuery(
    ["posts", page, totalPage, activeSort],
    async () => {
      const response = await getMyPostLists(userId, page, activeSort);
      // console.log(" 내가쓴 포스팅 response:", response);
      setNickname(response.data?.nickname);
      setTotalPage(response.data.postList.totalPages);
      if (page === totalPage && page > 0) {
        setPage(page - 1);
      }
      const pageBasicRange = 5; // 기본 페이지 수
      const pageRange = Math.min(pageBasicRange, totalPage); // 표시될 페이지 수 : 총 페이지 수가 기본 페이지 수보다 작으면 총 페이지 수 만큼만 버튼 보이게
      const middlePage = Math.floor(pageRange / 2); // 표시될 페이지 수의 중간값
      const startPage =
        page - middlePage < totalPage - pageRange + 1
          ? Math.max(0, page - middlePage)
          : totalPage - pageRange; // 표시될 페이지의 시작 번호
      const array = Array.from(
        { length: pageRange },
        (_, i) => startPage + i + 1
      );
      // console.log(array);
      setPageButton(array);

      return response.data.postList.content;
    }
  );

  if (isLoading) {
    return <div>< Loading /></div>
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>

      <InnerContainer>
        <TitleSection>
          <H3>{nickname}님의 포스팅</H3>
        </TitleSection>

        {data.length > 0 && (
          <SortButton activeSort={activeSort} onSortChange={handleSortChange} />)}
        {data && data.length === 0 ? (
          <Pple>
            <StNodata />
            <NoDataMessage>아직 포스팅 작성 전이군요!</NoDataMessage>
          </Pple>

        ) : (
          data.map((post: Post) => (
            <ListItem key={post.postId} post={post}></ListItem>
          ))
        )}
      </InnerContainer>

      {data.length > 0 && (
        <CommentListPagination>
          <SvgIcon onClick={() => handlePageChange(0)}>
            <Start />
          </SvgIcon>
          <SvgIcon onClick={() => handlePageChange(page - 1)}>
            <Prev />
          </SvgIcon>
          <Pagination>
            {pageButton.map((item) => {
              return (
                <PageButton
                  key={item}
                  $click={item === page + 1}
                  onClick={() => {
                    setPage(item - 1);
                  }}
                >
                  {item}
                </PageButton>
              );
            })}
          </Pagination>
          <SvgIcon onClick={() => handlePageChange(page + 1)}>
            <Next />
          </SvgIcon>
          <SvgIcon onClick={() => handlePageChange(totalPage - 1)}>
            <End />
          </SvgIcon>
        </CommentListPagination>
      )}
    </>
  );
};

export default YourPostList;

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
  color: rgb(231, 230, 240);
`;

const CommentListPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  margin: 40px 0px 10px;
  gap: 10px;
`;

const SvgIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Pagination = styled.div`
  display: flex;
`;

const PageButton = styled.div<{ $click: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) => (props.$click ? "#7462E2" : "transparent")};
  color: ${(props) => (props.$click ? "#FAFAFA" : "#535258")};
  cursor: pointer;
`;
