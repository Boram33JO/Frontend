import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { findEmail, findmobileCheck } from "../../api/user";
import { ReactComponent as EyeSVG } from "../../assets/images/login_signup_profile/icon_visibility.svg"; // 변경된 부분
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";

const Email: React.FC = () => {
  const navigate = useNavigate();
  const LoginUser = useSelector((state: RootState) => state.user);

  // const [email, onChangeEmailHandler, resetEmail] = useInput();
  const [code, onChangenumberHandler, resetNumber] = useInput();

  const [phoneNumber, onChangeMobileHandler, resetMobile] = useInput();
  const [smsConfirmNum, onChangeMobileCodeHandler, resetMobileCode] =
    useInput();

  const [isMobileFocused, setIsMobileFocused] = useState(false);
  const [isMobileNumberFocused, setIsMobileNumberFocused] = useState(false);

  // 중복확인 버튼 비활성화 여부 상태 변수
  const [isEmailButtonDisabled, setIsEmailButtonDisabled] = useState(false);
  const [isMobileButtonDisabled, setIsMobileButtonDisabled] = useState(false);

  // 타이머 상태 변수
  const [emailVerificationTimer, setEmailVerificationTimer] = useState(0);
  const [mobileVerificationTimer, setmobileVerificationTimer] = useState(0);

  // 타이머 5분 계산 함수
  // const formatTime = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  //   const formattedSeconds =
  //     remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  //   return `${formattedMinutes}:${formattedSeconds}`;
  // };

  // 인중 발송중일 때 상태값.
  const [emailButtonContent, setEmailButtonContent] = useState("확인하기");
  const [mobileButtonContent, setmobileButtonContent] = useState("인증코드");

  const [responseData, setResponseData] = useState(null);

  const handleLonginClick = () => {
    navigate(`/login`);
    return;
  };

  // 모바일 인증
  const MobilehandleCheckButton = async () => {
    const phoneNumberRegex = /^(010|011)[0-9]{8}$/;

    if (!phoneNumberRegex.test(phoneNumber)) {
      toast.error("11자리 숫자만 입력해주세요.", { position: "top-center" });
      resetMobile(); // 입력 칸 비우기
      return;
    }
    setmobileButtonContent("발송 중");
    // setIsMobileButtonDisabled(true);
    // setmobileVerificationTimer(300);
    try {
      // 버튼 내용 변경
      const response = await findmobileCheck(phoneNumber);
      setmobileButtonContent("재전송");
      setIsMobileButtonDisabled(false);
      // console.log(response);
      //setShowMobileInput(true);
      // 5분 타이머 시작
      toast.success("모바일 인증 번호를 발송했습니다.", {
        position: "top-center",
      });
    } catch (error: any) {
      if (
        error.response ||
        error.response.data ||
        error.response.data.message
      ) {
        // 서버에서 반환한 에러 메시지를 사용자에게 표시
        // toast.error(error.response.data.error, { position: 'top-center' });
        toast.error(`가입되지 않은 이메일입니다.`, { position: "top-center" });
      } else {
        // 기타 에러 처리
        toast.error("서버 오류가 발생했습니다.", { position: "top-center" });
      }
      // console.log(error);
    }
  };

  // 모바일 6자리 검증 숫자 검사 (유효기간 5분)
  const MobileDoubleCheckhandleButton = async () => {
    const response = await findEmail(phoneNumber, smsConfirmNum);
    // console.log(response, "숫자 확인1");

    if (response.data.success === true) {
      //setIsMobileVerified(true);
      toast.success("인증이 완료되었습니다. 아래의 이메일을 확인하세요.", {
        position: "top-center",
      });
      // console.log(response);
      // setShowMobileInput(false);
      setIsEmailButtonDisabled(true); // 인증하기 버튼 비활성화
      setIsMobileButtonDisabled(true);
      setmobileButtonContent("완료");
      setEmailButtonContent("완료");
      //  console.log(response.data.data, "숫자 확인2");
      //  console.log(response)
      setResponseData(response.data.data);
    } else if (response.data.success === false) {
      // setIsMobileVerified(false);

      setIsMobileButtonDisabled(false);
      // console.log(response.data, "숫자 확인3");
      toast.error("모바일 인증에 실패했습니다. 다시 시도해주세요.", {
        position: "top-center",
      });
      setmobileButtonContent("재전송");
      resetMobile();
      resetMobileCode();
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
                placeholder={"핸드폰 번호"}
                value={phoneNumber}
                onChange={onChangeMobileHandler}
                onFocus={() => setIsMobileFocused(true)}
                onBlur={() => setIsMobileFocused(false)}
                $isFocused={isMobileFocused}
                $hasValue={phoneNumber.length > 0}
                // disabled={isMobileVerified} // 여기서 disabled 속성을 설정
              />
              <Stbutton1
                onClick={MobilehandleCheckButton}
                disabled={isMobileButtonDisabled}
              >
                {mobileButtonContent}
              </Stbutton1>
            </Stname>
          </Stnickname>
        </Stbox>
        <Stnickname>
          <Stname>
            <Stinput4
              type={"text"}
              value={smsConfirmNum}
              placeholder={`인증코드 입력`}
              onChange={onChangeMobileCodeHandler}
              onFocus={() => setIsMobileNumberFocused(true)}
              onBlur={() => setIsMobileNumberFocused(false)}
              $isFocused={isMobileNumberFocused}
              $hasValue={code.length > 0}
            />
            <Stbutton1
              onClick={MobileDoubleCheckhandleButton}
              disabled={isEmailButtonDisabled}
            >
              {emailButtonContent}
            </Stbutton1>
          </Stname>
        </Stnickname>

        <H3>가입한 이메일 계정</H3>
        <Stbox>
          <Stnickname>
            <Stname>
              <Stinput5
               
               type="text"
               placeholder={responseData === null ? "" : `${responseData}`}
            
              />
            </Stname>
          </Stnickname>
          <Stbutton2 onClick={handleLonginClick}>로그인하기</Stbutton2>
        </Stbox>
      </InnerContainer>
    </>
  );
};

export default Email;

const InnerContainer = styled.div`
  width: 100%;
`;

const Stbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Stnickname = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H3 = styled.h3`
  font-size: 20px;
  color: #e7e6f0;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-top: 40px;
`;

const Stname = styled.div`
  display: flex; /* 가로 정렬을 위해 추가 */
  justify-content: center; /*요소들을 수평 가운데 정렬하기 위해 변경  */
  align-items: center; /* 세로 중앙 정렬을 위해 추가 */
  padding-bottom: 8px;
`;
const Stinput4 = styled.input<{ $isFocused: boolean; $hasValue: boolean }>`
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
  background: ${(props) => (props.disabled ? "#45424e" : "#45424e")};
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
  margin-top: 115px;
`;

const Stinput5 = styled.input`
  width: 329px;
  height: 24px;
  padding: 10px;

  font-size: 16px;
  font-weight: 500;
  
  background-color: #252628;

  border: none;
  border-radius: 6px;
  outline: none;
  
`;
