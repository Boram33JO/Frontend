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

      if (error.response.status === 401)
        setErrorMessage("로그인 정보를 찾을 수 없습니다.");
      else setErrorMessage("찾을 수 없습니다.");
    },
  });

  const loginClickHandler = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("이메일 형식이 아닙니다.");
      return;
    }

    const loginInformation = {
      email: email,
      password: password,
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
        />
        <Stinput2
          type={"password"}
          placeholder={"비밀번호 입력"}
          value={password}
          onChange={onChangePasswordHandler}
        />
      </Stbox>

      {/* <Stbox2>
        <Stlink1
          onClick={() => {
            navigate("/");
          }}
        >
          로그인 정보를 잊으셨나요?
        </Stlink1>
      </Stbox2> */}

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
  width: 330px;
  height: 25px;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #85848b;

  background-color: #252628;
  border: none;
  border-radius: 8px;
  outline: none;
  margin-bottom: 10px;
`;

const Stinput2 = styled.input`
  width: 330px;
  height: 25px;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #85848b;
  background-color: #252628;
  border: none;
  border-radius: 8px;
  outline: none;
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
