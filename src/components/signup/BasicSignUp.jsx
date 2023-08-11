import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-query";
import { addUsers } from "../../api/user";

const BasicSignUp = () => {
  const navigate = useNavigate();

  const [email, onChangeEmailHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();
  const [passwordCheck, onChangePasswordCheckHandler] = useInput();
  const [nickname, onChangeNicknameHandler] = useInput();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [nicknameError, setNicknameError] = useState("");

   // 각 입력 필드에 대한 유효성 검사 결과를 상태 변수로 추가
  //  const [emailValid, setEmailValid] = useState(true);
  //  const [passwordValid, setPasswordValid] = useState(true);
  //  const [passwordCheckValid, setPasswordCheckValid] = useState(true);
  //  const [nicknameValid, setNicknameValid] = useState(true);
 

  const addNewUserMutation = useMutation(addUsers, {
    onSuccess: () => {
      alert("회원가입 했습니다!");
      navigate("/login");
    },

    onError: (error) => {
      if (error.response && error.response.data) {
        alert(error.response.data); // 서버로부터의 에러 메시지를 보여줍니다.
      } else {
        alert("서버 에러가 발생했습니다.");
      }
    },
  });
  const onSignUpClickHandler = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email: email 패턴 체크
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/; // password: 대소문자, 숫자, 특수문자 포함 8~15자 이내, 각 요소 1개이상 포함
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,8}$/; // nickname: 알파벳소문자, 한글 ,숫자로만 이루어지고, 2자 이상 10자 이하

      // 각 조건에 대한 검사 후 에러 메시지를 모아서 처리
      const errors = {};
      if (!emailRegex.test(email)) {
        errors.email = "이메일 형식이 아닙니다.";
      }
      if (!passwordRegex.test(password)) {
        errors.password = "password 조건이 충족되지 않았습니다.";
      }
      if (password !== passwordCheck) {
        errors.passwordCheck = "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
      }
      if (!nicknameRegex.test(nickname)) {
        errors.nickname = "알파벳소문자, 한글, 숫자, 2~8자 이하로 입력해 주세요.";
      }
  
      // 에러가 있는 경우 처리
      if (Object.keys(errors).length > 0) {
        // 에러 메시지 모두 설정
        setEmailError(errors.email || "");
        setPasswordError(errors.password || "");
        setPasswordCheckError(errors.passwordCheck || "");
        setNicknameError(errors.nickname || "");
        return;
      }

    const newUser = {
      email: email,
      password: password,
      nickname: nickname,
    };
    addNewUserMutation.mutate(newUser);
  };

  
  return (
    <>
      <H1>회원가입</H1>
      <Stbox>
        <Stinput1
          type={"text"}
          placeholder={"이메일을 입력해주세요."}
          value={email}
          onChange={
            onChangeEmailHandler}
        />

        <Stinput2
          type={"password"}
          placeholder={"비밀번호를 입력해주세요."}
          value={password}
          onChange={onChangePasswordHandler}
        />
        <Stnumber>
          대문자, 소문자, 숫자, 특수문자 각 1개 이상 포함한 8~15자 이내
        </Stnumber>
        <Stinput3
          type={"password"}
          placeholder={"비밀번호를 한번 더 입력해주세요."}
          value={passwordCheck}
          onChange={onChangePasswordCheckHandler}
        />
      </Stbox>

      <ErrorMessageContainer>
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        {passwordCheckError && <ErrorMessage>{passwordCheckError}</ErrorMessage>}
        
      </ErrorMessageContainer>

      <H3>닉네임</H3>
      <Stbox>
        <Stnickname>
          <Stname>
            <Stinput4
              type={"text"}
              placeholder={"2~8자 입력"}
              onChange={onChangeNicknameHandler}
            />
            <Stbutton1 onClick={onSignUpClickHandler}>중복체크</Stbutton1>
          </Stname>
          {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}
        </Stnickname>

        <Stbutton2 onClick={onSignUpClickHandler}>회원가입하기</Stbutton2>
      </Stbox>
    </>
  );
};

export default BasicSignUp;

const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-left: 48px;

  /* align-items: center; */  
`;

const ErrorMessage = styled.div`
   color: #e7e6f0;
  margin-top: 10px;
  font-size: 14px;

`;


const H1 = styled.h1`
  font-size: 24px;
  color: #e7e6f0;
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

const Stinput1 = styled.input`
  width: 280px;
  height: 18px;
  padding: 10px;

  font-size: 14px;
  color: #85848b;

  background-color: #252628;
  border: none;
  border-radius: 6px;
  outline: none;
  margin-bottom: 10px;
`;
const Stinput2 = styled.input`
  width: 280px;
  height: 18px;
  padding: 10px;

  font-size: 14px;
  color: #85848b;

  background-color: #252628;
  border: none;
  border-radius: 6px;
  outline: none;
  margin-bottom: 5px;
`;

const Stnumber = styled.div`
  font-size: 12px;
  line-height: 16px;
  font-weight: 200;
  /* margin-top: 5px; */
  color: darkgray;
  width: 300px;
  margin-bottom: 10px;
`;
const Stinput3 = styled.input`
  width: 280px;
  height: 18px;
  padding: 10px;

  font-size: 14px;
  color: #85848b;

  background-color: #252628;
  border: none;
  border-radius: 6px;
  outline: none;
  margin-bottom: 10px;
`;
const Stnickname = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H3 = styled.h3`
  font-size: 18px;
  color: #e7e6f0;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  padding-left: 46px;
  padding-top: 50px;
`;
const Stname = styled.div`
  display: flex; /* 가로 정렬을 위해 추가 */
  justify-content: center; /*요소들을 수평 가운데 정렬하기 위해 변경  */
  align-items: center; /* 세로 중앙 정렬을 위해 추가 */
`;
const Stinput4 = styled.input`
  width: 200px;
  height: 18px;
  padding: 10px;

  font-size: 14px;
  color: #85848b;

  background-color: #252628;

  border: none;
  border-radius: 6px;
  outline: none;
`;
const Stbutton1 = styled.button`
  width: 80px;
  height: 38px;
  margin-left: 10px;
  background-color: #d9d9d9;
  background: linear-gradient(135deg, #8084f4, #c48fed);
  color: #e7e6f0;

  &:hover {
    color: #141414;
  }

  border: none;
  border-radius: 6px;
  font-size: 14px; //16
  font-weight: 500;
  cursor: pointer;
`;
const Stbutton2 = styled.button`
  width: 300px;
  height: 45px;
  padding: 10px;
  background: linear-gradient(135deg, #8084f4, #c48fed);
  color: #e7e6f0;
  &:hover {
    color: #141414;
  }

  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;

  cursor: pointer;

  margin-top: 60px;
  margin-bottom: 100%;
`;
