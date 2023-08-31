import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { login } from "../../api/user2";
import { useEffect } from "react";
import { logIn2, setUserInfo } from "../../redux/modules/userSlice";
import { ReactComponent as EyeSVG } from "../../assets/images/login_signup_profile/icon_visibility.svg"; // 변경된 부분
import { ReactComponent as ClosedEyeSVG } from "../../assets/images/login_signup_profile/icon_visibility_non.svg"; // 변경된 부분
import { toast } from 'react-hot-toast';

const BasicLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(""); // 추가: 에러 메시지 상태

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordKeyDown = (event) => {
    if (event.key === "Enter") {
      loginClickHandler(); // 로그인 버튼 클릭 시뮬레이션
    }
  };


  // 에러 메시지 표시 후 일정 시간이 지나면 초기화
  // useEffect(() => {
  //   if (errorMessage) {
  //     const timeoutId = setTimeout(() => {
  //       setErrorMessage("");
  //     }, 5000); // 5초 후에 에러 메시지 초기화
  //     return () => clearTimeout(timeoutId); // 컴포넌트 언마운트 시 타임아웃 클리어
  //   }
  // }, [errorMessage]);

  const [email, onChangeEmailHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();

  const sanitizedEmail = email.trim();
  const sanitizedPassword = password.trim();

  const loginMutation = useMutation(login, {
    onSuccess: (response) => {
      dispatch(logIn2());
      dispatch(setUserInfo(response.data));
      navigate("/");
      toast.success('로그인 되었습니다!', {position: 'top-center'});
    },
    onError: (error) => {
      // 에러 발생 시 에러 메시지 표시
      //console.log("Error response from server:", error?.response?.data);
      //console.log(error.response);
      toast.error('로그인 정보를 찾을 수 없습니다.', {position: 'top-center'});
     // setErrorMessage(".");
    },
  });

  const loginClickHandler = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
     // setErrorMessage("이메일 형식이 아닙니다.");
      toast.error('이메일 형식으로 입력해주세요.', {position: 'top-center'});
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
        <Stinput2Container>
          <Stinput2
            type={showPassword ? "text" : "password"}
            placeholder={"비밀번호 입력"}
            value={password}
            onChange={onChangePasswordHandler}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            onKeyDown={handlePasswordKeyDown}
            $isFocused={isPasswordFocused}
            $hasValue={sanitizedPassword.length > 0}
          />
          <PasswordToggle onClick={togglePasswordVisibility}>
            {showPassword ? <Eye />: <ClosedEye />}
          </PasswordToggle>
        </Stinput2Container>
       
      </Stbox>

    
      <Stbox>
     
        <Stbutton onClick={loginClickHandler}>로그인</Stbutton>
      </Stbox>
    </InnerContainer>

    
  );
};

export default BasicLogin;


const Stinput2Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordToggle = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  position: absolute;
  right: 10px;
`;


const Eye = styled(EyeSVG)`
width: 24px; /* 원하는 크기로 조정 */
  height: 24px; /* 원하는 크기로 조정 */
`;

const ClosedEye = styled(ClosedEyeSVG)`
width: 24px; /* 원하는 크기로 조정 */
  height: 24px; /* 원하는 크기로 조정 */
`;

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
