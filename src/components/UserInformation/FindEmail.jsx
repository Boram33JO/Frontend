import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-query";
import { TempPassword, addUsers, emailCheckTofindPassword, mobileCheck, mobileDoubleCheck } from "../../api/user2";
import { nicknameCheck } from "../../api/profile";
import { emailCheck, emailDoubleCheck } from "../../api/user2";
import { ReactComponent as EyeSVG } from "../../assets/images/login_signup_profile/icon_visibility.svg"; // 변경된 부분
import { ReactComponent as ClosedEyeSVG } from "../../assets/images/login_signup_profile/icon_visibility_non.svg"; // 변경된 부분
import { toast } from 'react-hot-toast';



const Email = () => {
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
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  

  // 인중 발송중일 때 상태값.
  const [emailButtonContent, setEmailButtonContent] = useState("이메일찾기");
  const [mobileButtonContent, setmobileButtonContent] = useState("확인하기");

 // 비밀번호 토글
//   const [showPassword, setShowPassword] = useState(false);
//  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  // const togglePasswordVisibility_1 = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword);
  // };


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
    
    const timerInterval = setInterval(() => {
      setEmailVerificationTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(timerInterval);
          setIsEmailButtonDisabled(false);
          setEmailButtonContent("재발송"); // 5분이 지나면 버튼 다시 활성화
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    try {
      const response = await emailCheckTofindPassword(email);
      toast.success(`${response.data}`, {position: 'top-center'});
      // setShowCodeInput(true);
    } catch (error) {
      toast.error(('서버 에러가 발생했습니다.'), {position: 'top-center'});
    } finally {
      // 응답 처리 후 버튼 활성화 및 로딩 해제
      setIsEmailButtonDisabled(false);
      setEmailButtonContent("재발송");//보내고 비번 인증전에 메일 바꿔도 또 보내기 가능
    }
  };

  // 임시비번 검증 숫자 검사 (유효기간 5분)
  const DoubleCheckhandleButton = async () => {
    const response = await TempPassword(email, code);

    if (response.data === true) {
      
      setIsEmailButtonDisabled(true); // 인증하기 버튼 비활성화
      setIsMobileButtonDisabled(true);
      toast.success( <div>
        임시 비밀번호 발급이 완료되었습니다.
        <br />
        로그인 해주세요!
      </div>, {position: 'top-center'});
      setEmailButtonContent("완료");
      setmobileButtonContent("발급완료")
    
     
    } else if (response.data === false) {
    
      setIsEmailButtonDisabled(false); // 중복확인 버튼 다시 활성화
      toast.error(
      <div>
      이메일 인증에 실패했습니다.
      <br />
      다시 시도해주세요.
    </div>, {position: 'top-center'});
      resetEmail();
      resetNumber();
    }
  };


  return (
    <>

    <InnerContainer>
      <Stbox>
        <Stnickname>
          <Stname>
            <Stinput4
              type={"text"}
              placeholder={"가입한 핸드폰 번호를 입력해주세요."}
              value={email}
              onChange={onChangeEmailHandler}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              $isFocused={isEmailFocused}
              $hasValue={email.length > 0}
              
            />
            <Stbutton1
              onClick={EmailhandleCheckButton}
              disabled={isEmailButtonDisabled}
            >
              {emailButtonContent}
            </Stbutton1>
          </Stname>
        </Stnickname>
        
          <Stnickname>
            <Stname>
              <Stinput4
                type={"text"}
                value={code}
                placeholder={` (${formatTime(
                  emailVerificationTimer
                )})`}
                onChange={onChangenumberHandler}
                onFocus={() => setIsNumberFocused(true)}
                onBlur={() => setIsNumberFocused(false)}
                $isFocused={isNumberFocused}
                $hasValue={code.length > 0}
                
              />
             <Stbutton1 onClick={DoubleCheckhandleButton} disabled={isMobileButtonDisabled}>
  {mobileButtonContent}
              </Stbutton1>
            </Stname>
      
          </Stnickname>
          </Stbox>
           </InnerContainer>
           </>
    
  );
};

export default Email;

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
//#6c6a71
// #f1f1f1
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

