import React from "react";
import styled from "styled-components";

const Mypicture = () => {
  return (
    <>
      <InnerContainer>
        <MyPic>{/* <H3>나의 프로필</H3> */}</MyPic>
        <MyProfile>
          <MyThumb
            src={
              "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34"
            }
          />
          <MyProfile1>
            <MyProfile2>
              <Nickname>닉네임</Nickname>
              <Produce>하고싶은 한줄 멘트</Produce>
            </MyProfile2>
            <Bt>프로필 수정</Bt>
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

// const H3 = styled.h3`
//   font-size: 20px;
//   line-height: 24px;
//   font-weight: 600;

// `;

const Bt = styled.button`
  width: 92px;
  height: 33px;
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
`;
const MyProfile = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  align-items: center;
`;

const MyThumb = styled.img`
  width: 66px;
  height: 66px;
  border-radius: 50%;
`;

const MyProfile1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* 자식 요소들이 가로로 나란히 정렬되도록 전체 너비 설정 */
`;
const MyProfile2 = styled.div`
  padding-left: 12px;
`;

const Nickname = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #e7e6f0;
`;
const Produce = styled.div`
  font-size: 14px;
  font-weight: 400;
  padding-top: 5px;
  color: #A6A3AF;
`;

const StLine = styled.div`
  background-color: #242325;
  height: 8px;
`;
