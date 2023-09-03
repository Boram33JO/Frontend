import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-query";
import { addUsers, mobileCheck, mobileDoubleCheck } from "../../api/user2";
import { nicknameCheck } from "../../api/profile";
import { emailCheck, emailDoubleCheck } from "../../api/user2";
import { ReactComponent as EyeSVG } from "../../assets/images/login_signup_profile/icon_visibility.svg"; // 변경된 부분
import { ReactComponent as ClosedEyeSVG } from "../../assets/images/login_signup_profile/icon_visibility_non.svg"; // 변경된 부분
import { toast } from 'react-hot-toast';
import { isAxiosError } from "axios";



const BasicSignUp = () => {
  const navigate = useNavigate();

  const [email, onChangeEmailHandler, resetEmail] = useInput();
  const [code, onChangenumberHandler, resetNumber] = useInput();

  const [to, onChangeMobileHandler, resetMobile] = useInput();
  const [smsConfirmNum, onChangeMobileCodeHandler, resetMobileCode] =
    useInput();

  const [password, onChangePasswordHandler, resetPassword] = useInput();
  const [passwordCheck, onChangePasswordCheckHandler, resetPasswordCheck] =
    useInput();
  const [nickname, onChangeNicknameHandler, resetNickname] = useInput();

  const [isEmailVerified, setIsEmailVerified] = useState(false); // 회원가입하기 버튼 전에 이메일 인증여부로 막기
  const [isMobileVerified, setIsMobileVerified] = useState(false);

  const [isNicknameVerified, setIsNicknameVerified] = useState(false); // 회원가입하기 버튼 전에 닉네임 인증여부로 막기

  // 에러
  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  // const [passwordCheckError, setPasswordCheckError] = useState("");
  // const [nicknameError, setNicknameError] = useState("");

  const [nicknameServerError, setNicknameServerError] = useState(""); // 에러 메시지 저장

  // 포커스
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isNumberFocused, setIsNumberFocused] = useState(false);

  const [isMobileFocused, setIsMobileFocused] = useState(false);
  const [isMobileNumberFocused, setIsMobileNumberFocused] = useState(false);

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordCheckFocused, setIsPasswordCheckFocused] = useState(false);

  const [isNicknameFocused, setIsNicknameFocused] = useState(false);

  // 인증 번호 입력 창을 보여주는 상태 변수.
  const [showCodeInput, setShowCodeInput] = useState(false); // 상태 추가
  const [showMobileInput, setShowMobileInput] = useState(false);

  // 중복확인 버튼 비활성화 여부 상태 변수
  const [isEmailButtonDisabled, setIsEmailButtonDisabled] = useState(false);
  const [isMobileButtonDisabled, setIsMobileButtonDisabled] = useState(false);

  // 타이머 상태 변수
  const [emailVerificationTimer, setEmailVerificationTimer] = useState(0);
  const [mobileVerificationTimer, setmobileVerificationTimer] = useState(0);

  // 타이머 5분 계산 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // 인중 발송중일 때 상태값.
  const [emailButtonContent, setEmailButtonContent] = useState("메일인증");
  const [mobileButtonContent, setmobileButtonContent] = useState("번호인증");

 // 비밀번호 토글
  const [showPassword, setShowPassword] = useState(false);
 const [showPasswordCheck, setShowPasswordCheck] = useState(false);

 //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email: email 패턴 체크
 const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/; // password: 대소문자, 숫자, 특수문자 포함 8~15자 이내, 각 요소 1개이상 포함
 //const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,12}$/; // nickname: 알파벳소문자, 대문자, 한글 ,숫자로만 이루어지고, 2자 이상 12자 이하

  const togglePasswordVisibility_1 = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

    const togglePasswordVisibility_2 = () => {
    setShowPasswordCheck((prevShowPasswordCheck) => !prevShowPasswordCheck);
  };



  useEffect(() => {
    let interval;

    if (emailVerificationTimer > 0) {
      interval = setInterval(() => {
        setEmailVerificationTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [emailVerificationTimer]);

  useEffect(() => {
    let interval;

    if (mobileVerificationTimer > 0) {
      interval = setInterval(() => {
        setmobileVerificationTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [mobileVerificationTimer]);

  const addNewUserMutation = useMutation(addUsers, {
    onSuccess: () => {
      toast.success('회원가입 되었습니다!', {position: 'top-center'});
      navigate("/login");
    },

    onError: (error) => {
      if (error.response && error.response.data) {
       toast.error(`${error.response.data}`, {position: 'top-center'});
      } else {
        toast.error("서버 에러가 발생했습니다.", {position: 'top-center'});
      }
    },
  });

  const onSignUpClickHandler = () => {
    if (!isEmailVerified) {
      toast.error("이메일 인증을 먼저 진행해 주세요.", {position: 'top-center'});
      return;
    }
    if (!isMobileVerified) {
      toast.error("핸드폰 인증을 먼저 진행해 주세요.", {position: 'top-center'});
      return;
    }
    if(password!==passwordCheck)
    {
      toast.error("비밀번호를 다시 확인해주세요.", {position: 'top-center'});
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error('비밀번호의 필수 요소를 확인해주세요.', {position: 'top-center'});
      return;
    }
    if (!isNicknameVerified) {
      toast.error("닉네임 인증을 먼저 진행해 주세요.", {position: 'top-center'});
      return;
    }
    // const validPhoneNumber = to;
    // onSignUpClickHandler(validPhoneNumber);

    const newUser = {
      email: email,
      password: password,
      nickname: nickname,
      phonenumber: to,
    };
    addNewUserMutation.mutate(newUser);
  };


  // 이메일 검사
  const EmailhandleCheckButton = async () => {
    // 이메일 형식 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("올바른 이메일 형식이 아닙니다.", {position: 'top-center'});
      return;
    }
    // 비활성화 상태로 변경하고 로딩 표시
    setIsEmailButtonDisabled(true);
    setEmailButtonContent("발송 중");
    //setShowCodeInput(false); // 일단 입력 창을 숨김
    setEmailVerificationTimer(300); // 5분 타이머 시작

    try {
      const response = await emailCheck(email);
      toast.success(`${response.data}`, {position: 'top-center'});
      setShowCodeInput(true);
     // console.log(response);
    } catch (error) {
      
     // console.log(isAxiosError,"2")
      toast.error(('중복된 이메일입니다.'), {position: 'top-center'});
    } finally {
      // 응답 처리 후 버튼 활성화 및 로딩 해제
      setIsEmailButtonDisabled(false);
      setEmailButtonContent("재전송");
    }
  };

  // 이메일 6자리 검증 숫자 검사 (유효기간 5분)
  const DoubleCheckhandleButton = async () => {
    const response = await emailDoubleCheck(email, code);

    if (response.data === true) {
      setIsEmailVerified(true);
      setIsEmailButtonDisabled(true); // 중복확인 버튼 비활성화
      toast.success("사용할 수 있는 이메일입니다! 회원가입 절차를 계속 진행해주세요.", {position: 'top-center'});
     // setShowCodeInput(true);
      setShowCodeInput(false);
      setEmailButtonContent("인증완료");

    } else if (response.data === false) {
      setIsEmailVerified(false);
      setIsEmailButtonDisabled(false); // 중복확인 버튼 다시 활성화
      toast.error("이메일 인증에 실패했습니다. 처음부터 다시 시도해주세요.", {position: 'top-center'});
      resetEmail();
      resetNumber();
    }
  };

  // 모바일 인증
  const MobilehandleCheckButton = async () => {
    const phoneNumberRegex = /^(010|011)[0-9]{8}$/;

    if (!phoneNumberRegex.test(to)) {
      toast.error("11자리 숫자만 입력해주세요.", {position: 'top-center'});
      resetMobile(); // 입력 칸 비우기
      return;
    }
    setmobileButtonContent("발송 중");
    setIsMobileButtonDisabled(true);
    setmobileVerificationTimer(300);
    try {
      // 버튼 내용 변경
      const response = await mobileCheck(to);
      setmobileButtonContent("재전송");
      setIsMobileButtonDisabled(false);
    //  console.log(response);
      setShowMobileInput(true);
      // 5분 타이머 시작
      toast.success("모바일 인증 번호를 발송했습니다.", {position: 'top-center'});
      //  const validPhoneNumber = to; // 유효한 핸드폰 번호로 설정
      //  await onSignUpClickHandler(validPhoneNumber);
    } catch (error) {
      setmobileButtonContent("재전송");
      toast.error("서버 에러가 발생했습니다.", {position: 'top-center'});
     // console.log(error);
    }
  };

  // 모바일 6자리 검증 숫자 검사 (유효기간 5분)
  const MobileDoubleCheckhandleButton = async () => {
    const response = await mobileDoubleCheck(smsConfirmNum, to);
   // console.log(response, "숫자 확인1");

    if (response.data === true) {
      setIsMobileVerified(true);
      toast.success("유효한 핸드폰 번호입니다. 회원가입 절차를 계속 진행해주세요.", {position: 'top-center'});
      console.log(response);
      setShowMobileInput(false);
      setIsMobileButtonDisabled(true);
      setmobileButtonContent("인증완료");

      // console.log(response.data, "숫자 확인2");
    } else if (response.data === false) {
      setIsMobileVerified(false);

      setIsMobileButtonDisabled(false);
      // console.log(response.data, "숫자 확인3");
      toast.error("모바일 인증에 실패했습니다. 다시 시도해주세요.", {position: 'top-center'});
      setmobileButtonContent("재전송");
      resetMobile();
      resetMobileCode();
    }
  };
  
  // 닉네임 검사
  const handleCheckButton = async () => {
    const response = await nicknameCheck(nickname);
    // console.log(response);

    if (response.data.message) {
      toast.success(`${response.data.message}`, {position: 'top-center'});
      setIsNicknameVerified(true);
    } else {
      // setNicknameServerError(response.data.error);
      toast.error(`${response.data.error}`, {position: 'top-center'});
      setIsNicknameVerified(false);
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
              $isFocused={isEmailFocused}
              $hasValue={email.length > 0}
              disabled={isEmailVerified} // 여기서 disabled 속성을 설정
             
            />
            <Stbutton1
              onClick={EmailhandleCheckButton}
              disabled={isEmailButtonDisabled}
            >
              {emailButtonContent}
            </Stbutton1>
          </Stname>
        </Stnickname>
        {showCodeInput && (
          <Stnickname>
            <Stname>
              <Stinput4
                type={"text"}
                value={code}
                placeholder={`인증번호 8자리 (${formatTime(
                  emailVerificationTimer
                )})`}
                onChange={onChangenumberHandler}
                onFocus={() => setIsNumberFocused(true)}
                onBlur={() => setIsNumberFocused(false)}
                $isFocused={isNumberFocused}
                $hasValue={code.length > 0}
              />
              <Stbutton1 onClick={DoubleCheckhandleButton}>인증</Stbutton1>
            </Stname>
          </Stnickname>
        )}

        <Stnickname>
          <Stname>
            <Stinput4
              type={"text"}
              placeholder={"핸드폰 번호"}
              value={to}
              onChange={onChangeMobileHandler}
              onFocus={() => setIsMobileFocused(true)}
              onBlur={() => setIsMobileFocused(false)}
              $isFocused={isMobileFocused}
              $hasValue={email.length > 0}
              disabled={isMobileVerified} // 여기서 disabled 속성을 설정
            />
            <Stbutton1
              onClick={MobilehandleCheckButton}
              disabled={isMobileButtonDisabled}
            >
              {mobileButtonContent}
            </Stbutton1>
          </Stname>
        </Stnickname>

        {showMobileInput && (
          <Stnickname>
            <Stname>
              <Stinput4
                type={"text"}
                value={smsConfirmNum}
                placeholder={`인증번호 5자리 (${formatTime(
                  mobileVerificationTimer
                )})`}
                onChange={onChangeMobileCodeHandler}
                onFocus={() => setIsMobileNumberFocused(true)}
                onBlur={() => setIsMobileNumberFocused(false)}
                $isFocused={isMobileNumberFocused}
                $hasValue={code.length > 0}
              />
              <Stbutton1 onClick={MobileDoubleCheckhandleButton}>
                인증
              </Stbutton1>
            </Stname>
          </Stnickname>
        )}
<Stinput2Container>
        <Stinput2
           type={showPassword ? "text" : "password"}
          placeholder={"비밀번호 입력(8~15자 이내)"}
          value={password}
          onChange={onChangePasswordHandler}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          $isFocused={isPasswordFocused}
          $hasValue={password.length > 0}
        />
         <PasswordToggle onClick={togglePasswordVisibility_1}>
            {showPassword ? <Eye />: <ClosedEye />}
          </PasswordToggle>
           </Stinput2Container>
      </Stbox>
      <Stbox>
        <Stnumber>대문자, 소문자, 숫자, 특수문자 각 1개 이상 포함</Stnumber>
        
        <Stinput2Container>
        <Stinput3
          type={showPasswordCheck ? "text" : "password"}
          placeholder={"비밀번호 확인"}
          value={passwordCheck}
          onChange={onChangePasswordCheckHandler}
          onFocus={() => setIsPasswordCheckFocused(true)}
          onBlur={() => setIsPasswordCheckFocused(false)}
          $isFocused={isPasswordCheckFocused}
          $hasValue={passwordCheck.length > 0}
        />
        <PasswordToggle onClick={togglePasswordVisibility_2}>
            {showPasswordCheck ? <Eye />: <ClosedEye />}
          </PasswordToggle>
        </Stinput2Container>
      </Stbox>

      {/* <ErrorMessageContainer>
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        {passwordCheckError && (
          <ErrorMessage>{passwordCheckError}</ErrorMessage>
        )}
      </ErrorMessageContainer> */}

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
              $isFocused={isNicknameFocused}
              $hasValue={nickname.length > 0}
            />
            <Stbutton1 onClick={handleCheckButton}>중복확인</Stbutton1>
          </Stname>
          {/* {nicknameServerError && (
            <ErrorMessage>{nicknameServerError}</ErrorMessage>
          )} */}
          {/* {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>} */}
        </Stnickname>

        <Stbutton2 onClick={onSignUpClickHandler}>회원가입하기</Stbutton2>
      </Stbox>
    </InnerContainer>
  );
};

export default BasicSignUp;

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
  right: 12px;
`;


const Eye = styled(EyeSVG)`
width: 23px; /* 원하는 크기로 조정 */
  height: 23px; /* 원하는 크기로 조정 */
`;

const ClosedEye = styled(ClosedEyeSVG)`
width: 23px; /* 원하는 크기로 조정 */
  height: 23px; /* 원하는 크기로 조정 */
`;

const InnerContainer = styled.div`
  width: 100%;
`;

// const ErrorMessageContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: left;
//   padding-left: 48px;

//   /* align-items: center; */
// `;

// const ErrorMessage = styled.div`
//   color: #e7e6f0;
//   margin-top: 10px;
//   font-size: 14px;
// `;

const Stbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border-radius: 6px;
  outline: none;
  margin-bottom: 5px;
  border: 1px solid ${(props) => (props.$isFocused ? "#8084f4" : "#141414;")};
  color: ${(props) => (props.$hasValue ? "#d9d9d9" : "#85848b")};
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

  background-color: #252628;
  border: none;
  border-radius: 6px;
  outline: none;
  margin-bottom: 10px;
  border: 1px solid ${(props) => (props.$isFocused ? "#8084f4" : "#141414;")};
  color: ${(props) => (props.$hasValue ? "#d9d9d9" : "#85848b")};
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
  color: ${(props) =>
    props.$isFocused || props.$hasValue ? "#d9d9d9" : "#85848b"};

  background-color: #252628;

  border: none;
  border-radius: 6px;
  outline: none;
  border: 1px solid ${(props) => (props.$isFocused ? "#8084f4" : "#141414;")};
  //color: ${(props) => (props.$hasValue ? ": #d9d9d9" : "#85848b")};
`;
const Stbutton1 = styled.button`
  width: 90px;
  height: 45px;
  margin-left: 10px;
  background: ${(props) =>
    props.disabled ? "#45424e" : "#45424e"};
  color: ${(props) => (props.disabled ? "#6c6a71" : "#e7e6f0")};

  &:hover {
    color: ${(props) => (props.disabled ? "#6c6a71" : "#141414")};
  }

  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
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

