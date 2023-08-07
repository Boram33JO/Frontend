import React from "react";
import styled from "styled-components";

const Pictures = () => {
  return (
    <>
      <InnerContainer>
        <Follower1>
          <H3>나의 팔로워</H3>
        </Follower1>

        <MyProfile>
          <MyThumb
            src={
              "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34"
            }
          />
          <MyProfile2>
            <Nickname> 닉네임</Nickname>
            <Place> 하고싶은 한줄 멘트 </Place>
            
          </MyProfile2>
          <Bt>삭제</Bt>
        </MyProfile>

        <MyProfile>
          <MyThumb
            src={
              "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34"
            }
          />
          <MyProfile2>
            <Nickname> 닉네임</Nickname>
            <Place> 하고싶은 한줄 멘트 </Place>
            
          </MyProfile2>
          <Bt>삭제</Bt>
        </MyProfile>

        <MyProfile>
          <MyThumb
            src={
              "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34"
            }
          />
          <MyProfile2>
            <Nickname> 닉네임</Nickname>
            <Place> 하고싶은 한줄 멘트 </Place>
            
          </MyProfile2>
          <Bt>삭제</Bt>
        </MyProfile>

        <MyProfile>
          <MyThumb
            src={
              "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34"
            }
          />
          <MyProfile2>
            <Nickname> 닉네임</Nickname>
            <Place> 하고싶은 한줄 멘트 </Place>
            
          </MyProfile2>
          <Bt>삭제</Bt>
        </MyProfile>

        <MyProfile>
          <MyThumb
            src={
              "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34"
            }
          />
          <MyProfile2>
            <Nickname> 닉네임</Nickname>
            <Place> 하고싶은 한줄 멘트 </Place>
            
          </MyProfile2>
          <Bt>삭제</Bt>
        </MyProfile>

        <MyProfile>
          <MyThumb
            src={
              "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34"
            }
          />
          <MyProfile2>
            <Nickname> 닉네임</Nickname>
            <Place> 하고싶은 한줄 멘트 </Place>
            
          </MyProfile2>
          <Bt>삭제</Bt>
        </MyProfile>

        <MyProfile>
          <MyThumb
            src={
              "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34"
            }
          />
          <MyProfile2>
            <Nickname> 닉네임</Nickname>
            <Place> 하고싶은 한줄 멘트 </Place>
            
          </MyProfile2>
          <Bt>삭제</Bt>
        </MyProfile>
        
      </InnerContainer>
    </>
  );
};

export default Pictures;

const InnerContainer = styled.div`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
  margin-top: 48px;
  margin-bottom: 48px;
`;
const Follower1 = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  align-items: center; // 요소들을 수직 가운데 정렬하기 위해 추가
  gap: 50%; // 간격
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;
const Bt = styled.button`
  width: 53px;
  height: 30px;

  background-color: #d2d2d2;
  border: none;
  border-radius: 6px;

  font-family: "Pretendard";

  cursor: pointer;

  &:hover {
    background-color: #e2e2e2;
  }
  margin-left: 120px; // 나중에 간격 수정
 
`;
const MyProfile = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  align-items: center;
  margin-top: 20px;
`;
const MyThumb = styled.img`
  width: 62px;
  height: 62px;
  border-radius: 50%;
`;

const MyProfile2 = styled.div`
padding-left: 20px
`;

const Nickname = styled.div`
  font-size: 16px;
`;
const Place = styled.div`
  font-size: 12px;
  padding-top: 5px;
`;

