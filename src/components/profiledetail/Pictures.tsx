import React from "react";
import styled from "styled-components";

const Pictures = () => {
  return (
    <>
      <InnerContainer>
        <Follower1>
          <H3>닉네임님의 피플러</H3>
          <Nums>n명</Nums>
        </Follower1>

        <MyProfile>
          <MyThumb
            src={
              "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34"
            }
          />
          <MyProfile1>
          <MyProfile2>
            <Nickname> 닉네임</Nickname>
            <Produce> 하고싶은 한줄 멘트 </Produce>
            
          </MyProfile2>
          <Bt>삭제</Bt>
          </MyProfile1>
        </MyProfile>

        <MyProfile>
          <MyThumb
            src={
              "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34"
            }
          />
          <MyProfile1>
          <MyProfile2>
            <Nickname> 닉네임</Nickname>
            <Produce> 하고싶은 한줄 멘트 </Produce>
            
          </MyProfile2>
          <Bt>삭제</Bt>
          </MyProfile1>
        </MyProfile>

        <MyProfile>
          <MyThumb
            src={
              "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34"
            }
          />
          <MyProfile1>
          <MyProfile2>
            <Nickname> 닉네임</Nickname>
            <Produce> 하고싶은 한줄 멘트 </Produce>
            
          </MyProfile2>
          <Bt>삭제</Bt>
          </MyProfile1>
        </MyProfile>

        <MyProfile>
          <MyThumb
            src={
              "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34"
            }
          />
          <MyProfile1>
          <MyProfile2>
            <Nickname> 닉네임</Nickname>
            <Produce> 하고싶은 한줄 멘트 </Produce>
            
          </MyProfile2>
          <Bt>삭제</Bt>
          </MyProfile1>
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
  margin-top: 40px;
  margin-bottom: 48px;
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
`

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: #e7e6f0;
  margin-bottom: 8px;
`;
const Bt = styled.button`
  width: 53px;
  height: 30px;
  border: none;
  border-radius: 20px;

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
  /* justify-content: space-between; */
  margin-top: 20px; //
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
`;

const MyProfile2 = styled.div`
padding-left: 10px; // 원래 5정도?
`;

const Nickname = styled.div`
  font-size: 16px;
  font-weight: 600; //세미볼드
  color: #e7e6f0;
`;

const Produce = styled.div`
  font-size: 14px; 
  padding-top: 5px;
  color: #626262;
  font-weight: 500; //미디엄
 
`;

