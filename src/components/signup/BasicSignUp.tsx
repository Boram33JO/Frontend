import React from "react";
import { styled } from "styled-components";

const BasicSignUp = () => {
  return (
    <>
      <Stbox>
        <H1>회원가입</H1>

        <Stinput1 type={"text"} placeholder={"이메일을 입력해주세요."} />

        <Stinput2 type={"password"} placeholder={"비밀번호를 입력해주세요."} />
        <Stnumber>
          비밀번호: 대/소문자, 8자이상~15자 미만, 특수문자 1개 이상 포함{" "}
        </Stnumber>
        <Stinput3
          type={"password"}
          placeholder={"비밀번호를 한번 더 입력해주세요."}
        />

        <Stnickname>
          <H3>닉네임</H3>
          <Stname>
            <Stinput4 type={"text"} placeholder={"2~8자 입력"} />
            <Stbutton1>확인</Stbutton1>
          </Stname>
        </Stnickname>

        <Stbutton2>회원가입하기</Stbutton2>
      </Stbox>
    </>
  );
};

export default BasicSignUp;

const H1 = styled.h1`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  padding-top: 50px;
  padding-left: 10px;
`;
const Stbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Stinput1 = styled.input`
  width: 280px;
  height: 18px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  outline: none;
  margin-bottom: 10px;
`;
const Stinput2 = styled.input`
  width: 280px;
  height: 18px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  outline: none;
  margin-bottom: 10px;
`;

const Stnumber = styled.div`
  font-size: 14px;
  line-height: 24px;
  font-weight: 200;
  /* margin-top: 5px; */
  color: darkgray;
`;
const Stinput3 = styled.input`
  width: 280px;
  height: 18px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  outline: none;
  margin-bottom: 10px;
`;
const Stnickname = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  padding-top: 50px;
  padding-left: 10px;
`;
const Stname = styled.div`
  display: flex; /* 가로 정렬을 위해 추가 */
  /* justify-content: center; 요소들을 수평 가운데 정렬하기 위해 변경 */
  align-items: center; /* 세로 중앙 정렬을 위해 추가 */
`;
const Stinput4 = styled.input`
  width: 200px;
  height: 18px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  outline: none;
`;
const Stbutton1 = styled.button`
  width: 70px;
  height: 40px;
  margin-left: 10px;
  background-color: #d9d9d9;
  color: 22222;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
`;
const Stbutton2 = styled.button`
  width: 300px;
  height: 45px;
  padding: 10px;
  background-color: #d9d9d9;
  color: 22222;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 60px;
  margin-bottom: 100%;
`;
