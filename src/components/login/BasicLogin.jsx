import React from "react";
import { styled } from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import useInput from "../../hooks/useInput";
import { login } from "../../api/user";
import { logIn } from "../../redux/modules/loginSlice";

const BasicLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [email, onChangeEmailHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();

  const loginMutation = useMutation(login, {
    onSuccess: () => {
      alert("로그인 했습니다!");
      dispatch(logIn())
      navigate('/')
    }
  });
  const loginClickHandler = () => {
    // 이메일 형식 검사를 위한 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // body 값이 이메일 형식과 맞지 않을 경우 경고창
    if (!emailRegex.test(email)) {
      alert("이메일 형식이 아닙니다.");
      return;
    }
    
    const loginInformation = {
      email : email,
      password : password,
    }
    loginMutation.mutate(loginInformation)
  };

  return (
    <>
      <Stbox>
        <H3>로그인</H3>
        <Stinput1 type={"text"} placeholder={"이메일을 입력해주세요."} value={email} onChange={onChangeEmailHandler}/>
        <Stinput2 type={"password"} placeholder={"비밀번호를 입력해주세요."}  value={password} onChange={onChangePasswordHandler}/>
        <Stlink1 onClick={() => { navigate('/') }}> 비밀번호를 잊으셨나요?</Stlink1>
        <Stlink2 onClick={() => { navigate('/signup') }}> 회원가입하기</Stlink2>
        <Stbutton onClick={loginClickHandler}>로그인</Stbutton>
      </Stbox>
    </>
  );
};

export default BasicLogin;

const Stbox = styled.div`
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
  color: #222222;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 40px;
`;

const Stlink1 = styled.a`
  text-decoration: underline;
  font-size: 14px;
  line-height: 24px;
  font-weight: 200;
  margin-bottom: 10px;
  cursor: pointer;
  color: darkgray; /* 선택 사항: 링크 색상을 변경할 수 있습니다. */
`;

const Stlink2 = styled.a`
  text-decoration: underline;
  font-size: 14px;
  line-height: 24px;
  font-weight: 200;
  margin-bottom: 10px;
  cursor: pointer;
  color: darkgray; /* 선택 사항: 링크 색상을 변경할 수 있습니다. */
`;
