import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { UserInfo } from "../../models/user";
import { getProfileImage } from "../../utils/common";
import { useMutation, useQueryClient } from "react-query";
import { followUser } from "../../api/post";

interface Props {
  follow: boolean;
  userInfo: UserInfo;
}

const Mypicture = ({ follow, userInfo }: Props) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const LoginUser = useSelector((state: RootState) => state.user);
  const isMyProfile = Number(userId) === LoginUser.userId;
  // console.log(LoginUser)
  const EditMyProfileHandler = () => {
    navigate(`/profile/edit/${userId}`);
  };
  const FollowMutation = useMutation(followUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Profile", userId]);
    }
  })

  const followButtonHandler = (userId: number) => {
    FollowMutation.mutate(userId);
  }
  // console.log(userInfo.userImage);
  return (
    <>
      <InnerContainer>
        {/* <MyPic><H3>나의 프로필</H3></MyPic> */}
        <MyProfile>
        
          <MyThumb
            src={getProfileImage(userInfo.userImage)} style={{minWidth:"66px", minHeight:"66px"}}
            alt="기본이미지" // alt 속성 추가
          />
        
          <MyProfile1>
            <MyProfile2>
            {userInfo && userInfo.nickname && (
              <Nickname>{userInfo.nickname}</Nickname>
            )}
            {userInfo && userInfo.introduce && (
              <Produce>{userInfo.introduce}</Produce>
            )}
            </MyProfile2>
            {LoginUser.userId ? ( // 사용자가 로그인되어 있는지 확인
            isMyProfile ? (
              <Bt onClick={EditMyProfileHandler}>프로필 수정</Bt>
            ) : (
              <Bt
                $follow={follow}
                onClick={() => followButtonHandler(userInfo.userId)}
              >
                {follow ? "언팔로우" : "팔로우"}
              </Bt>
            )
          ) : null}
          </MyProfile1>
        </MyProfile>
      </InnerContainer>
      <StLine></StLine>
    </>
  );
};

export default Mypicture;

const InnerContainer = styled.div`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
  padding-top: 38px;
  padding-bottom: 38px;
`;
const MyPic = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  justify-content: space-between;
  align-items: center; // 요소들을 수직 가운데 정렬하기 위해 추가
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;

`;

const Bt = styled.button<{ $follow?: boolean }>`
  min-width: 92px;
  min-height: 33px;
  border: none;
  border-radius: 24px;

  font-size: 14px;
  font-weight: 600;
  font-family: "Pretendard";
  color: #e7e6f0;
  background: linear-gradient(135deg, #8084f4, #c48fed);

  text-align: center;

  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    color: #141414;
  }

  ${(props) =>
    props.$follow &&
    css`
      background: #434047;
      `}
`;
const MyProfile = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  align-items: center;
`;

const MyThumb = styled.img`
  width: 66px;
  height: 66px;
  background-color: #ECECEC;
  border-radius: 50%;
  object-fit: cover;
  
`;

const MyProfile1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* 자식 요소들이 가로로 나란히 정렬되도록 전체 너비 설정 */
`;

const MyProfile2 = styled.div`
  padding-left: 12px;
  /* width: 240px; */
    justify-content: space-between;
    padding-right: 40px;
`;

const Nickname = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #e7e6f0;
`;
const Produce = styled.div`
  max-width: 180px;

  font-size: 14px;
  font-weight: 400;
  line-height: 1.3;
  padding-top: 5px;
  color: #a6a3af;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 3줄로 제한 */
  -webkit-box-orient: vertical;
  
  box-sizing: border-box;


`;

const StLine = styled.div`
  background-color: #242325;
  height: 8px;
`;
