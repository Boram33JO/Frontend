import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ChangePw, TempPassword, addUsers, emailCheckTofindPassword, mobileCheck, mobileDoubleCheck } from "../../api/user2";
import { getProfileLists, nicknameCheck } from "../../api/profile";
import { emailCheck, emailDoubleCheck } from "../../api/user2";
import { ReactComponent as EyeSVG } from "../../assets/images/login_signup_profile/icon_visibility.svg"; // 변경된 부분
import { ReactComponent as ClosedEyeSVG } from "../../assets/images/login_signup_profile/icon_visibility_non.svg"; // 변경된 부분
import { toast } from 'react-hot-toast';
import { useSelector } from "react-redux";
import store, { RootState } from "../../redux/config/configStore";
import { logIn2, logout, setUserInfo } from "../../redux/modules/userSlice";



const ChangePassword = () => {
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


  // 포커스
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isNumberFocused, setIsNumberFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);


  const [showPassword_1, setShowPassword_1] = useState(false);
  const [showPassword_2, setShowPassword_2] = useState(false);
  const [showPassword_3, setShowPassword_3] = useState(false);

  const codeRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/; // password: 대소문자, 숫자, 특수문자 포함 8~15자 이내, 각 요소 1개이상 포함

  const togglePasswordVisibility_1 = () => {
    setShowPassword_1((prevShowPassword) => !prevShowPassword);
  };
  const togglePasswordVisibility_2 = () => {
    setShowPassword_2((prevShowPassword) => !prevShowPassword);
  };
  const togglePasswordVisibility_3 = () => {
    setShowPassword_3((prevShowPassword) => !prevShowPassword);
  };

  const pathname = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  const handlePasswordChange = async () => {
   
     // 새 비밀번호 유효성 검사
     if (code !== password) {
      toast.error("새 비밀번호가 일치하지 않습니다.");
      return;
    }
     if (!code || !codeRegex.test(password)) {
      toast.error("새 비밀번호 필수 요건을 지켜주세요.");
      return;
    }
   

    // 두 번째 새 비밀번호 입력 필드와 비교하여 동일한지 확인
    
      
    try {
      const result = await ChangePw({
        // email: `${LoginUser.email}`,
        originPassword: email,
        changePassword: password,
      }, userId);
      //console.log(result)
      if (result.success){
        toast.success('비밀번호가 바뀌었습니다. 다시 로그인 해주세요.', { position: 'top-center' });
         navigate("/");
         store.dispatch(logout());
       //  console.log(result.success);
      }
     if (result.success===false)
     {
     // console.log(result);
      toast.error(`${result}`);
     }
      
     
    } catch (error) {
      // 오류 처리 로직
     //toast.error(`${error}`);
      //console.error('비밀번호 변경 오류:', error);
      if (error.response || error.response.error) {
        toast.error(`${error.response.data.error}`, { position: 'top-center' });
      //  console.log(error)
      } else {
        toast.error("서버 에러가 발생했습니다.", { position: 'top-center' });
      }
    }
  };

  return (


    <>

    <InnerContainer>
    
          
      
      <Stbox>
      <StEmail>로그인 된 이메일 : {LoginUser.email}</StEmail>
        <Stnickname>
       
          <Stname>
          <Stinput2Container>
            <Stinput4
              type={showPassword_1 ? "text" : "password"}
              placeholder={"기존 비밀번호 입력"}
              value={email}
              onChange={onChangeEmailHandler}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              $isFocused={isEmailFocused}
              $hasValue={email.length > 0}
            />
            <PasswordToggle onClick={togglePasswordVisibility_1}>
            {showPassword_1 ? <Eye />: <ClosedEye />}
          </PasswordToggle>
        </Stinput2Container>
            
          </Stname>
        </Stnickname>
        
        
        <Stnickname>
            <Stname>
            <Stinput2Container>
              <Stinput4
                type={showPassword_2 ? "text" : "password"}
                value={code}
                placeholder={`새 비밀번호 입력 (8~15자 이내)`}
                onChange={onChangenumberHandler}
                onFocus={() => setIsNumberFocused(true)}
                onBlur={() => setIsNumberFocused(false)}
                $isFocused={isNumberFocused}
                $hasValue={code.length > 0}
                
              />
              <PasswordToggle onClick={togglePasswordVisibility_2}>
            {showPassword_2 ? <Eye />: <ClosedEye />}
          </PasswordToggle>
        </Stinput2Container>
            </Stname>
          </Stnickname>
      
          <Stnumber>대문자, 소문자, 숫자, 특수문자 각 1개 이상 포함</Stnumber>
          <Stnickname4>
            <Stname>
            <Stinput2Container>
              <Stinput4
                 type={showPassword_3 ? "text" : "password"}
                value={password}
                placeholder={`새 비밀번호 확인`}
                onChange={onChangePasswordHandler}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                $isFocused={isPasswordFocused}
                $hasValue={code.length > 0}
              />
              <PasswordToggle onClick={togglePasswordVisibility_3}>
            {showPassword_3 ? <Eye />: <ClosedEye />}
          </PasswordToggle>
        </Stinput2Container>
              
              
            </Stname>
            <Stbutton2 onClick={handlePasswordChange}>변경하기</Stbutton2>
          </Stnickname4>

          </Stbox>
           </InnerContainer>
           </>
    
    );
};

export default ChangePassword;

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

const StEmail = styled.div`
 font-size: 16px;
  color: #e7e6f0;
  font-weight: 500;
  padding-bottom: 44px;
  width: 300px;
  margin-left: -46px;
  display: flex; /* flex 컨테이너 설정 */
  align-items: flex-start; 
`

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

const Stnickname4 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
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
  font-weight: 600;

  cursor: pointer;
  margin-top: 90px;
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