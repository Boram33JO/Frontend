import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useMutation, useQueryClient } from "react-query";
import { TempPassword, addUsers, deleteUser, emailCheckTofindPassword, mobileCheck, mobileDoubleCheck } from "../../api/user2";
import { nicknameCheck } from "../../api/profile";
import { emailCheck, emailDoubleCheck } from "../../api/user2";
import { ReactComponent as EyeSVG } from "../../assets/images/login_signup_profile/icon_visibility.svg"; // 변경된 부분
import { ReactComponent as ClosedEyeSVG } from "../../assets/images/login_signup_profile/icon_visibility_non.svg"; // 변경된 부분
import { toast } from 'react-hot-toast';
import store from "../../redux/config/configStore";
import { logout } from "../../redux/modules/userSlice";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";




const DeleteUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const LoginUser = useSelector((state) => state.user);
  const isMyProfile = Number(userId) === LoginUser.userId;

  
  const [email, onChangeEmailHandler, resetEmail] = useInput();
  const [code, onChangenumberHandler, resetNumber] = useInput();


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

  const handleUserDeleteChange = async () => {
   
    // 새 비밀번호 유효성 검사
  //   if (code) {
  //    toast.error('로그인 정보가 일치하지 않습니다.');
  //    return;
  //  }
   try {
     const result = await deleteUser({
       // email: `${LoginUser.email}`,
       eamil: email,
       password: code,
     }, userId);
     
     if (result.success){
       toast.success('탈퇴가 완료되었습니다. 감사합니다.', { position: 'top-center' });
        // navigate("/login");
        store.dispatch(logout());
       //console.log(result.success);
     }
    if (result.error)
    {
     toast.error(`${result.error}`);
    }
     
    
   } catch (error) {
     // 오류 처리 로직
     toast.error(`${error}`);
     //console.error('탈퇴오류:', error);
     if (error.response && error.response.data) {
       toast.error(`${error.response.data}`, { position: 'top-center' });
     } else {
       toast.error("서버 에러가 발생했습니다.", { position: 'top-center' });
     }
   }

   if (!isMyProfile) {
    // 사용자의 프로필이 아닌 경우, 404 페이지로 리디렉션합니다.
    return navigate(`/*`);
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
              placeholder={"이메일을 입력해 주세요."}
              value={email}
              onChange={onChangeEmailHandler}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              $isFocused={isEmailFocused}
              $hasValue={email.length > 0}
            />
            
          </Stname>
        </Stnickname>
        
          <Stnickname>
            <Stname>
              <Stinput4
                type={"text"}
                value={code}
                placeholder={`비밀번호를 입력해 주세요`}
                onChange={onChangenumberHandler}
                onFocus={() => setIsNumberFocused(true)}
                onBlur={() => setIsNumberFocused(false)}
                $isFocused={isNumberFocused}
                $hasValue={code.length > 0}
              />
            </Stname>
            <Stbutton2 onClick={handleUserDeleteChange}>탈퇴하기</Stbutton2>
          </Stnickname>
          </Stbox>
        </InnerContainer>
      </>
    
  );
};

export default DeleteUser;

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
   width: 329px;
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

// 비번찾기 일 경우
// 1. 회원이 친 이메일을 보내기를 눌렀을 때  
// 2. 회원가입되었는지의 여부 판단 - > 서버 진행 중 
// 3. 있으면 임시 비번을 바로 보내고/없으면 등록되지 않은 이메일 입니다 토스트 창
// 4. (임시 비번은 아님!)<<레디스에 잠깐 담기는 임시코드일 뿐>> 메일로 받는다.
// 5. 둘다 입력 후(임시비번 발급)받은 후 auth/check로 둘 다 보내면 되는데, 
// 다르면 알럿이나 발급받은 비번을 확인해 달라... 

// 임시 비밃너호가 정상적으로 확인 되었습니다. 같은면 로그인을 시도해주세요
// 다음창에서 바로 사용자가 본인이 사용할 비번을 갱신해서 보내기. 
// 다음 페이지로 

// 비번찾기 시 /auth/email로 가짐. -> true일 때. 
// 이메일이 있으면 보내면. 

// ---

// 아이디 찾기
// SMs/send로 등록되어 있는 번호가 맞으면 그 번호로 바로 인증코드가 감.
// 유저가 받는건 진짜 이메일이 아니라 <<임시코드가 폰으로 옴>>
// 인증코드와 폰번호랑 레디스 값이 같으면 sms/check 로 두가지를 다 보냄
// 맞으면 return로 이메일 이 담끼므로 내가 보여주면 됨. 

// 인증코드를 보내주면 맞으면 해당 이메일을 알려줌. 
// 이메일을 

// 파람스로 프론트 