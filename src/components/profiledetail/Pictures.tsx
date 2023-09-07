import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getFollowLists } from "../../api/profile";
import { followUser } from "../../api/post";
import { getProfileImage } from "../../utils/common";
import Modal from "../common/Modal";
import { ReactComponent as Nodata } from "../../assets/images/login_signup_profile/icon_no_data.svg";
import { toast } from 'react-hot-toast';
import { RootState } from "../../redux/config/configStore";
import { useSelector } from "react-redux";
import Loading from "../map/Loading";
import { ReactComponent as Start } from "../../assets/images/page_start.svg"
import { ReactComponent as End } from "../../assets/images/page_end.svg"
import { ReactComponent as Prev } from "../../assets/images/page_prev.svg"
import { ReactComponent as Next } from "../../assets/images/page_next.svg"



type follower = {
  userId: number;
  content: string;
  createdAt: string;
  postId: number;
  postTitle: string;
  userImage: string;
  nickname: string;
  introduce: string;
};



const Pictures = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const LoginUser = useSelector((state: RootState) => state.user);
  const isMyProfile = Number(userId) === LoginUser.userId;

  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageButton, setPageButton] = useState<number[]>([]);

  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);


  // const {
  //   data: followerData, isLoading, isError,} = useQuery(
  //   ["Follow", userId],
  //   () => (userId ? getFollowLists(userId) : Promise.resolve([])),
  //   { enabled: !!userId, keepPreviousData: true }
  // );

  const { data, isLoading, isError } = useQuery(["follow", page, totalPage], async () => {
    const response = await getFollowLists(userId, page);
    //console.log(response.data);
    //setTotal(response.data.totalElements);
    setTotalPage(response.data.followList.totalPages);
    if (page === totalPage && page > 0) {
      setPage(page - 1);
    }
    const pageBasicRange = 5; // 기본 페이지 수
    const pageRange = Math.min(pageBasicRange, totalPage); // 표시될 페이지 수 : 총 페이지 수가 기본 페이지 수보다 작으면 총 페이지 수 만큼만 버튼 보이게
    const middlePage = Math.floor(pageRange / 2); // 표시될 페이지 수의 중간값
    const startPage = ((page - middlePage) < totalPage - pageRange + 1) ? Math.max(0, page - middlePage) : totalPage - pageRange; // 표시될 페이지의 시작 번호
    const array = Array.from({ length: pageRange }, (_, i) => startPage + i + 1);
    setPageButton(array);


    return response.data;
  });


  // 팔로워 삭제를 위한 useMutation 훅을 사용합니다.
  const mutation = useMutation((userId: number)=>followUser(userId),
  {
    onSuccess: () => {
      // 삭제 후 데이터를 다시 불러오기 위해 팔로워 정보 캐시를 무효화합니다.
      queryClient.invalidateQueries(["follow"]);
      toast.success("해당 피플러를 삭제했습니다.", {position: 'top-center'});
     // console.log(response);
    },
    onError: (error) => {
     // console.error("피플러 삭제 오류:", error);
      toast.error("피플러를 삭제하는 중에 오류가 발생했습니다.", { position: 'top-center' });
    },
  }
);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPage) {
      setPage(newPage);
    }
  };

  const handleDelete = (userId: number) => {
    setSelectedCommentId(userId);
    setDeleteModalOpen(true);
  };
  const deleteCommentAsync = async (userId: number) => {
    try {
      await mutation.mutateAsync(userId);
    } catch (error) {
      toast.error("피플러를 삭제하는 중에 오류가 발생했습니다.", {position: 'top-center'});
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
      <Follower1>
        <H3>{`${data.nickname}님의 피플러`}</H3>
      <Nums>{`${data.followList.totalElements}명`}</Nums>
      </Follower1>

      {data && data.followList.content.length === 0 ? (
        <Pple>
          <StNodata />
          <NoDataMessage>아직 팔로우한 피플러가 없네요!</NoDataMessage>
        </Pple>

      ) : (
        data.followList.content.map((item: follower) => (
          <MyProfile key={item.userId}>
            <MyThumb
              src={getProfileImage(item.userImage)} style={{minWidth:"62px", minHeight:"62px", objectFit: "cover"}}
              onClick={() => navigate(`/profile/${item.userId}`)}
            />
            <MyProfile1>
              <MyProfile2>
                <Nickname>{item.nickname}</Nickname>
                <Produce>{item.introduce}</Produce>
              </MyProfile2>
              {isMyProfile && (
                <Bt onClick={() => handleDelete(item.userId)}>삭제</Bt>
                )}
            </MyProfile1>
          </MyProfile>
        ))
      )}
      {isDeleteModalOpen && (
        <Modal
          first="피플러를 삭제하시겠습니까?"
          buttonName="삭제"
          setToggle={setDeleteModalOpen}
          clickButton={() => deleteCommentAsync(selectedCommentId!)}
        />
      )}
    </InnerContainer>

    {data.followList.content.length> 0 && (
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
export default Pictures;

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
const Follower1 = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  align-items: center; // 요소들을 수직 가운데 정렬하기 위해 추가

`;
const Nums = styled.div`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #a6a3af;
  align-items: center;
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: #e7e6f0;

`;
const Bt = styled.button`
  min-width: 53px;
  min-height: 30px;
  border: none;
  border-radius: 20px;

  font-size: 14px;
  font-weight: 600;
  font-family: "Pretendard";
  color: #fafafa;
  background: #3b3a40;

  text-align: center;

  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    color: #141414;
  }
`;

const MyProfile = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  align-items: center;
  /* justify-content: space-between; */
  /* padding-top: 20px;  */
`;

const MyProfile1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* 자식 요소들이 가로로 나란히 정렬되도록 전체 너비 설정 */
`;

const MyThumb = styled.img`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background-color: #e7e6f0;
  background-position: center;
  object-fit: cover;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


const MyProfile2 = styled.div`
  padding-left: 10px; 
`;

const Nickname = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #e7e6f0;
  max-width: 210px;
  max-height: 40px;
`;

const Produce = styled.div`
  font-size: 14px;
  padding-top: 5px;
  color: #626262;
  font-weight: 500; 
  max-width: 230px;
  max-height: 40px; /* 3줄로 제한하려면 3줄 높이에 맞게 설정 */
  line-height: 1.2; /* 줄 간격 조절 */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 2줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  box-sizing: border-box;
  word-break: break-all;
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

