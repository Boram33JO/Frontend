import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getFollowLists } from "../../api/profile";
import { followUser } from "../../api/post";
import { getProfileImage } from "../../utils/common";
import DeleteModal from "../common/DeleteModal";
import { ReactComponent as Nodata } from "../../assets/images/login_signup_profile/icon_no_data.svg";
import { toast } from 'react-hot-toast';
import { RootState } from "../../redux/config/configStore";
import { useSelector } from "react-redux";



const Pictures = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const LoginUser = useSelector((state: RootState) => state.user);
  const isMyProfile = Number(userId) === LoginUser.userId;

  const queryClient = useQueryClient();
  // const pageSize = 10; // 한 번에 가져올 데이터의 개수

  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  //const [page, setPage] = useState<number>(0);
  //const [isFetching, setFetching] = useState(false);

  const {
    data: followerData,
    isLoading,
    isError,
  } = useQuery(
    ["Follow", userId],
    () => (userId ? getFollowLists(userId) : Promise.resolve([])),
    { enabled: !!userId, keepPreviousData: true }
  );

  // const fetchMoreData = () => {
  //   if (!followerData) return;
  //   if (followerData.followList.content.length < pageSize) {
  //     // 현재 페이지에 남은 데이터가 pageSize 미만이면 중복 요청 방지
  //     return;
   // }
    //setPage((prevPage) => prevPage + 1);
    // setFetching(true);
  //};

  // useEffect(() => {
  //   // 스크롤 이벤트 핸들러와 임계값(threshold) 추가
  //   const handleScroll = () => {
  //     const threshold = window.innerHeight * 0.8;
  //     if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - threshold) {
  //       fetchMoreData();
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);


  console.log(followerData); // 데이터 구조를 확인

  // 팔로워 삭제를 위한 useMutation 훅을 사용합니다.
  const mutation = useMutation(followUser, {
    onSuccess: () => {
      // 삭제 후 데이터를 다시 불러오기 위해 팔로워 정보 캐시를 무효화합니다.
      queryClient.invalidateQueries(["Follow", userId]);
      toast.success("해당 피플러를 삭제했습니다.", {position: 'top-center'});
     // console.log(response);
    },
    onError: (error) => {
     // console.error("피플러 삭제 오류:", error);
      toast.error("피플러를 삭제하는 중에 오류가 발생했습니다.", { position: 'top-center' });
    },
  });

 
  const handleDelete = (followerId: number) => {
    setSelectedCommentId(followerId);
    setDeleteModalOpen(true);
  };
  const deleteCommentAsync = async (followerId: number) => {
    try {
      await mutation.mutateAsync(followerId);
    } catch (error) {
      toast.error("피플러를 삭제하는 중에 오류가 발생했습니다.", {position: 'top-center'});
    }
    setDeleteModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  // followerData를 활용하여 팔로워 정보 렌더링
  return (
    <InnerContainer>
      <Follower1>
        <H3>{`${followerData.nickname}님의 피플러`}</H3>
        <Nums>{`${followerData.followList.totalElements}명`}</Nums>
      </Follower1>

      {followerData.followList.content.length === 0 ? (
        <Pple>
          <StNodata />
          <NoDataMessage>아직 팔로우한 피플러가 없네요!</NoDataMessage>
        </Pple>

      ) : (
        followerData.followList.content.map((follower: any) => (
          <MyProfile key={follower.userId}>
            <MyThumb
              src={getProfileImage(follower.userImage)} style={{minWidth:"62px", minHeight:"62px", objectFit: "cover"}}
              onClick={() => navigate(`/profile/${follower.userId}`)}
            />
            <MyProfile1>
              <MyProfile2>
                <Nickname>{follower.nickname}</Nickname>
                <Produce>{follower.introduce}</Produce>
              </MyProfile2>
              {isMyProfile && (
                <Bt onClick={() => handleDelete(follower.userId)}>삭제</Bt>
                )}
            </MyProfile1>
          </MyProfile>
        ))
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          first="피플러를 삭제하시겠습니까?"
          deleteToggle={setDeleteModalOpen}
          deleteButton={() => deleteCommentAsync(selectedCommentId!)}
        />
      )}
    </InnerContainer>
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
`;

const Produce = styled.div`
  font-size: 14px;
  padding-top: 5px;
  color: #626262;
  font-weight: 500; 
  max-width: 210px;
  max-height: 40px;
  line-height: 1.2; /* 줄 간격 조절 */
  `;
