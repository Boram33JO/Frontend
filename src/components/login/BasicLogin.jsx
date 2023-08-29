import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { login } from "../../api/user2";
import { useEffect } from "react";
import { logIn2, setUserInfo } from "../../redux/modules/userSlice";

const BasicLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(""); // 추가: 에러 메시지 상태

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handlePasswordKeyDown = (event) => {
    if (event.key === "Enter") {
      loginClickHandler(); // 로그인 버튼 클릭 시뮬레이션
    }
  };

  // 에러 메시지 표시 후 일정 시간이 지나면 초기화
  useEffect(() => {
    if (errorMessage) {
      const timeoutId = setTimeout(() => {
        setErrorMessage("");
      }, 5000); // 5초 후에 에러 메시지 초기화
      return () => clearTimeout(timeoutId); // 컴포넌트 언마운트 시 타임아웃 클리어
    }
  }, [errorMessage]);

  const [email, onChangeEmailHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();

  const sanitizedEmail = email.trim();
  const sanitizedPassword = password.trim();

  const loginMutation = useMutation(login, {
    onSuccess: (response) => {
      // console.log(response);
      alert("로그인 했습니다!");
      dispatch(logIn2());
      dispatch(setUserInfo(response.data));
      navigate("/");
    },
    onError: (error) => {
      // 에러 발생 시 에러 메시지 표시
      //console.log("Error response from server:", error?.response?.data);
      //console.log(error.response);
      setErrorMessage("로그인 정보를 찾을 수 없습니다.");
    },
  });

  const loginClickHandler = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      setErrorMessage("이메일 형식이 아닙니다.");
      return;
    }


    const loginInformation = {
      email: sanitizedEmail,
      password: sanitizedPassword,
    };
    loginMutation.mutate(loginInformation);
  };


  return (
    <InnerContainer>
      <Stbox>
        <Stinput1
          type={"text"}
          placeholder={"이메일 계정"}
          value={email}
          onChange={onChangeEmailHandler}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          $isFocused={isEmailFocused}
          $hasValue={sanitizedEmail.length > 0}
        />
        <Stinput2
          type={"password"}
          placeholder={"비밀번호 입력"}
          value={password}
          onChange={onChangePasswordHandler}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          onKeyDown={handlePasswordKeyDown} 
          $isFocused={isPasswordFocused}
          $hasValue={sanitizedPassword.length > 0} 
        />
      </Stbox>

      <Stbox2>
        <Stlink1
          onClick={() => {
            navigate("/");
          }}
        >
          로그인 정보를 잊으셨나요?
        </Stlink1>
      </Stbox2>

      <Stbox>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}{" "}
        {/* 추가: 에러 메시지 표시 */}
        <Stbutton onClick={loginClickHandler}>로그인</Stbutton>
      </Stbox>
    </InnerContainer>

    
  );
};

export default BasicLogin;

const InnerContainer = styled.div`
  width: 100%;
`;

// 에러
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

const Stbox2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 23px;
`;

const Stinput1 = styled.input`
  width: 329px;
  height: 24px;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #85848b;

  background-color: #252628;
  border: none;
  border-radius: 8px;
  outline: none;
  margin-bottom: 10px;

  border: 1px solid ${(props) => (props.$isFocused ? "#8084f4" : "#141414;")};
  color: ${(props) => (props.$hasValue ? "#d9d9d9" : "#85848b")};
`;

const Stinput2 = styled.input`
  width: 329px;
  height: 24px;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #85848b;
  background-color: #252628;
  border: none;
  border-radius: 8px;
  outline: none;
  border: 1px solid ${(props) => (props.$isFocused ? "#8084f4" : "#141414;")};
  color: ${(props) => (props.$hasValue ? "#d9d9d9" : "#85848b")};
`;

const Stlink1 = styled.a`
  margin-top: 4px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  cursor: pointer;
  color: #b2b2b2;
`;

const Stbutton = styled.button`
  width: 350px;
  height: 45px;
  padding: 10px;
  background: linear-gradient(135deg, #8084f4, #c48fed);
  color: #e7e6f0;
  border: none;
  border-radius: 6px;
  font-size: 17px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 68px;
  font-weight: 600;
  &:hover {
    color: #141414;
  }
`;
