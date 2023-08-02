import React from "react";
import { styled } from "styled-components";

const BasicSignUp = () => {
  return (
    <>
      <Stbox>
        <H3>회원가입</H3>

        <Stinput1 type={"text"} placeholder={"이메일을 입력해주세요."} />

        <Stinput2 type={"password"} placeholder={"비밀번호를 입력해주세요."} />
        <Stnumber>비밀번호 유효성 : </Stnumber>
        <Stinput3 type={"password"} placeholder={"비밀번호를 한번 더 입력해주세요."} />
        <Stinput4 type={"text"} placeholder={"사용하고 싶은 닉네임을 알려주세요."} />
        <Stbutton>회원가입하기</Stbutton>
      </Stbox>
    </>
  );
};

export default BasicSignUp;

const H3 = styled.h3`
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
const Stinput4 = styled.input`
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
  margin-bottom: 10px;
  color: darkgray;
  `

const Stbutton = styled.button`
  width: 300px;
  height: 45px;
  padding: 10px;
  background-color: #d9d9d9;
  color: 22222;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
`;
