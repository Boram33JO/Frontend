import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-query";
import { addUsers } from "../../api/user";
import { nicknameCheck } from "../../api/profile";
import { emailCheck, emailDoubleCheck } from "../../api/user2";

const BasicSignUp = () => {
  const navigate = useNavigate();

  const [email, onChangeEmailHandler, resetEmail] = useInput();
  const [code, onChangenumberHandler, resetNumber] = useInput();
  const [password, onChangePasswordHandler, resetPassword] = useInput();
  const [passwordCheck, onChangePasswordCheckHandler, resetPasswordCheck] =
    useInput();
  const [nickname, onChangeNicknameHandler, resetNickname] = useInput();

  const [isEmailVerified, setIsEmailVerified] = useState(false); // 회원가입하기 버튼 전에 이메일 인증여부로 막기
  const [isNicknameVerified, setIsNicknameVerified] = useState(false); // 회원가입하기 버튼 전에 닉네임 인증여부로 막기

  // 에러
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameServerError, setNicknameServerError] = useState(""); // 에러 메시지 저장 상태 변수

  // 포커스
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isNumberFocused, setIsNumberFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordCheckFocused, setIsPasswordCheckFocused] = useState(false);
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);

  const addNewUserMutation = useMutation(addUsers, {
    onSuccess: () => {
      alert("회원가입 되었습니다!");
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
    if (!isEmailVerified) {
      alert("이메일 인증을 먼저 진행해 주세요.");
      return;
    }
    if (!isNicknameVerified) {
      alert("닉네임 중복체크를 먼저 진행해 주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email: email 패턴 체크
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/; // password: 대소문자, 숫자, 특수문자 포함 8~15자 이내, 각 요소 1개이상 포함
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,12}$/; // nickname: 알파벳소문자, 대문자, 한글 ,숫자로만 이루어지고, 2자 이상 12자 이하

    // 각 조건에 대한 검사 후 에러 메시지를 모아서 처리
    const errors = {};
    if (!emailRegex.test(email)) {
      errors.email = "이메일 형식이 아닙니다.";
    }
    if (!passwordRegex.test(password)) {
      errors.password = "Password 조건이 충족되지 않았습니다.";
    }
    if (password !== passwordCheck) {
      errors.passwordCheck = "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
    }
    if (!nicknameRegex.test(nickname)) {
      errors.nickname = "대/소문자, 한글, 숫자, 2~12자 이하로 입력해 주세요.";
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

  // 닉네임 검사
  const handleCheckButton = async () => {
    const response = await nicknameCheck(nickname);
    // console.log(response);

    if (response.data.message) {
      alert(response.data.message);
      setIsNicknameVerified(true);
    } else {
      // setNicknameServerError(response.data.error);
      alert(response.data.error);
      setIsNicknameVerified(false);
    }
  };

  // 이메일 검사를 누르는데 이메일이 전송되지 않는 형식이면 발송이 안대고 500번에러 뜸.
  // 인증 버튼 누르기 전에 이메일 형식인지 아닌지 여부 판단해서 이메일 형식이 맞을 경우만 되려나.
  //

  // 이메일 검사
  const EmailhandleCheckButton = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식이 아닙니다. 다시 입력해주세요.");
      resetEmail(""); // 입력 칸 비우기
      return;
    }

    // if (response.status===500) {
    //   alert("올바른 이메일 형식이 아닙니다. 다시 입력해주세요.");
    //   resetEmail(""); // 입력 칸 비우기
    //   return;
    // }
    const response = await emailCheck(email);
    console.log(response, "5");
    alert(response.data);
    // if (response.data.message) {
    //   alert(response.data.message);
    // } else {
    //   alert(response.data.error, "에러용2");
    // }
  };

  // 이메일 6자리 검증 숫자 검사 (유효기간 5분)
  // true이면 진행되도록 변수를 만들던지 하자.
  const DoubleCheckhandleButton = async () => {
    const response = await emailDoubleCheck(email, code);
    console.log(response, "숫자 확인1");

    if (response.data === true) {
      setIsEmailVerified(true);
      alert("사용할 수 있는 이메일입니다! 회원가입 절차를 계속 진행해주세요.");
      console.log(response.data, "숫자 확인2");
    } else if (response.data === false) {
      setIsEmailVerified(false);
      console.log(response.data, "숫자 확인3");
      alert("이메일 인증에 실패했습니다. 처음부터 다시 시도해주세요.");
      resetEmail();
      resetNumber();
    }
  };

  return (
    <InnerContainer>
      <Stbox>
        <Stnickname>
          <Stname>
            <Stinput4
              type={"text"}
              placeholder={"이메일 계정"}
              value={email}
              onChange={onChangeEmailHandler}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              isFocused={isEmailFocused}
              hasValue={email.length > 0}
            />
            <Stbutton1 onClick={EmailhandleCheckButton}>인증하기</Stbutton1>
          </Stname>
        </Stnickname>
        <Stnickname>
          <Stname>
            <Stinput4
              type={"text"}
              value={code}
              placeholder={"인증번호 6자리"}
              onChange={onChangenumberHandler}
              onFocus={() => setIsNumberFocused(true)}
              onBlur={() => setIsNumberFocused(false)}
              isFocused={isNumberFocused}
              hasValue={code.length > 0}
            />

            <Stbutton1 onClick={DoubleCheckhandleButton}>인증완료</Stbutton1>
          </Stname>
        </Stnickname>
        <Stinput2
          type={"password"}
          placeholder={"비밀번호 입력(8~15자 이내)"}
          value={password}
          onChange={onChangePasswordHandler}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          isFocused={isPasswordFocused}
          hasValue={password.length > 0}
        />
      </Stbox>
      <Stbox>
        <Stnumber>대/소문자, 숫자, 특수문자 각 1개 이상 포함</Stnumber>
        <Stinput3
          type={"password"}
          placeholder={"비밀번호 확인"}
          value={passwordCheck}
          onChange={onChangePasswordCheckHandler}
          onFocus={() => setIsPasswordCheckFocused(true)}
          onBlur={() => setIsPasswordCheckFocused(false)}
          isFocused={isPasswordCheckFocused}
          hasValue={passwordCheck.length > 0}
        />
      </Stbox>

      <ErrorMessageContainer>
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        {passwordCheckError && (
          <ErrorMessage>{passwordCheckError}</ErrorMessage>
        )}
      </ErrorMessageContainer>

      <H3>닉네임</H3>
      <Stbox>
        <Stnickname>
          <Stname>
            <Stinput4
              type={"text"}
              placeholder={"2~12자 입력"}
              onChange={onChangeNicknameHandler}
              onFocus={() => setIsNicknameFocused(true)}
              onBlur={() => setIsNicknameFocused(false)}
              isFocused={isNicknameFocused}
              hasValue={nickname.length > 0}
            />
            <Stbutton1 onClick={handleCheckButton}>중복체크</Stbutton1>
          </Stname>
          {nicknameServerError && (
            <ErrorMessage>{nicknameServerError}</ErrorMessage>
          )}
          {/* {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>} */}
        </Stnickname>

        <Stbutton2 onClick={onSignUpClickHandler}>회원가입하기</Stbutton2>
      </Stbox>
    </InnerContainer>
  );
};

export default BasicSignUp;

const InnerContainer = styled.div`
  width: 100%;
`;

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

const Stbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const Stinput1 = styled.input`
//   width: 229px;
//   height: 24px;
//   padding: 10px;

//   font-size: 16px;
//   font-weight: 500;
//   color: #85848b;

//   background-color: #252628;

//   border: none;
//   border-radius: 6px;
//   outline: none;
//   border: 1px solid ${(props) => (props.isFocused ? "#8084f4" : "#141414;")};
//   color: ${(props) => (props.hasValue ? "#d9d9d9" : "#85848b")};
// `;

const Stinput2 = styled.input`
  width: 329px;
  height: 24px;
  padding: 10px;

  font-size: 16px;
  font-weight: 500;
  color: #85848b;

  background-color: #252628;
  border: none;
  border-radius: 6px;
  outline: none;
  margin-bottom: 5px;
  border: 1px solid ${(props) => (props.isFocused ? "#8084f4" : "#141414;")};
  color: ${(props) => (props.hasValue ? "#d9d9d9" : "#85848b")};
`;

const Stnumber = styled.div`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  /* margin-top: 5px; */
  color: #d9d9d9;
  width: 300px;
  margin-left: -40px;
  margin-bottom: 5px;
  display: flex; /* flex 컨테이너 설정 */
  align-items: flex-start; /* 요소를 왼쪽으로 정렬 */
`;
const Stinput3 = styled.input`
  width: 329px;
  height: 24px;
  padding: 10px;

  font-size: 16px;
  font-weight: 500;
  color: #85848b;

  background-color: #252628;
  border: none;
  border-radius: 6px;
  outline: none;
  margin-bottom: 10px;
  border: 1px solid ${(props) => (props.isFocused ? "#8084f4" : "#141414;")};
  color: ${(props) => (props.hasValue ? "#d9d9d9" : "#85848b")};
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
  padding-left: 20px;
  padding-top: 44px;
`;
const Stname = styled.div`
  display: flex; /* 가로 정렬을 위해 추가 */
  justify-content: center; /*요소들을 수평 가운데 정렬하기 위해 변경  */
  align-items: center; /* 세로 중앙 정렬을 위해 추가 */
  padding-bottom: 8px;
`;
const Stinput4 = styled.input`
  width: 229px;
  height: 24px;
  padding: 10px;

  font-size: 16px;
  font-weight: 500;
  color: #85848b;

  background-color: #252628;

  border: none;
  border-radius: 6px;
  outline: none;
  border: 1px solid ${(props) => (props.isFocused ? "#8084f4" : "#141414;")};
  color: ${(props) => (props.hasValue ? "#d9d9d9" : "#85848b")};
`;
const Stbutton1 = styled.button`
  width: 90px;
  height: 45px;
  margin-left: 10px;
  background-color: #d9d9d9;
  background: #45424e;
  color: #e7e6f0;

  &:hover {
    color: #141414;
  }

  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
const Stbutton2 = styled.button`
  width: 350px;
  height: 45px;
  padding: 10px;
  background: linear-gradient(135deg, #8084f4, #c48fed);
  color: #e7e6f0;
  &:hover {
    color: #141414;
  }

  border: none;
  border-radius: 6px;
  font-size: 17px;
  font-weight: 500;

  cursor: pointer;
  margin-top: 60px;
`;
