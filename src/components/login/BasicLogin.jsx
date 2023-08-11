import React, { useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState(""); // 추가: 에러 메시지 상태

  const [email, onChangeEmailHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();

  const loginMutation = useMutation(login, {
    onSuccess: () => {
      alert("로그인 했습니다!");
      dispatch(logIn());
      navigate('/');
    },
    onError: (error) => {
      // 에러 발생 시 에러 메시지 표시
      console.log("Error response from server:", error?.response?.data);
      setErrorMessage("이메일 정보를 찾을 수 없습니다.");
    }
  });

  const loginClickHandler = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("이메일 형식이 아닙니다.");
      return;
    }

    const loginInformation = {
      email: email,
      password: password,
    }
    loginMutation.mutate(loginInformation);
  };

  return (
    <>
      <H3>로그인</H3>
      <Stbox>
        <Stinput1 type={"text"} placeholder={"이메일을 입력해주세요."} value={email} onChange={onChangeEmailHandler} />
        <Stinput2 type={"password"} placeholder={"비밀번호를 입력해주세요."} value={password} onChange={onChangePasswordHandler} />
      </Stbox>

      <Stbox2>
        <Stlink1 onClick={() => { navigate('/') }}>로그인 정보를 잊으셨나요?</Stlink1>
      </Stbox2>

      <Stbox>
        <Stbutton onClick={loginClickHandler}>로그인</Stbutton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} {/* 추가: 에러 메시지 표시 */}
      </Stbox>
    </>
  );
};

export default BasicLogin;

const H3 = styled.h3`
  font-size: 24px;
  color: #E7E6F0;
  font-weight: 700;
  line-height: 24px;
  padding-left: 46px;
  margin-bottom: 40px;
  padding-top: 50px;
`;

const Stbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Stbox2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 48px;
`;

const Stinput1 = styled.input`
  width: 280px;
  height: 18px;
  padding: 10px;
  font-size: 14px;
  color: #85848B;
  background-color: #252628;
  border: none;
  border-radius: 8px;
  outline: none;
  margin-bottom: 10px;
`;

const Stinput2 = styled.input`
  width: 280px;
  height: 18px;
  padding: 10px;
  font-size: 14px;
  color: #85848B;
  background-color: #252628;
  border: none;
  border-radius: 8px;
  outline: none;
  margin-bottom: 5px;
`;

const Stlink1 = styled.a`
  font-size: 12px;
  line-height: 24px;
  font-weight: 400;
  margin-bottom: 10px;
  cursor: pointer;
  color: #B2B2B2;
`;

const Stbutton = styled.button`
  width: 300px;
  height: 45px;
  padding: 10px;
  background: linear-gradient(135deg, #8084f4, #c48fed);
  color: #e7e6f0;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 72px;
  font-weight: 500;
  &:hover {
    color: #141414;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;
