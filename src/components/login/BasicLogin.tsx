import React from "react";
import { styled } from "styled-components";
import { useNavigate } from 'react-router-dom';

const BasicLogin = () => {
  const navigate = useNavigate();

  return (
    <>
      <Stbox>
        <H3>로그인</H3>

        <Stinput1 type={"text"} placeholder={"이메일을 입력해주세요."} />

        <Stinput2 type={"password"} placeholder={"비밀번호를 입력해주세요."} />
        
        <Stlink onClick={() => { navigate('/signup') }}> 회원가입하기</Stlink>
        <Stbutton>로그인하기</Stbutton>
      </Stbox>
    </>
  );
};

export default BasicLogin;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  padding-top: 50px;
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

const Stlink = styled.a`
text-decoration: underline;
  font-size: 14px;
  line-height: 24px;
  font-weight: 200;
  margin-bottom: 10px;
  cursor: pointer;
  color: darkgray; /* 선택 사항: 링크 색상을 변경할 수 있습니다. */
`;
