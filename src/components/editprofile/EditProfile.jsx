import React, { useEffect, useState } from "react";
import { css, styled } from "styled-components";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ReactComponent as CameraIcon } from "../../assets/images/profile_camera.svg"; // 프로필 카메라 SVG 아이콘 추가
import { useSelector } from "react-redux";
import { nicknameCheck, updateProfile } from "../../api/profile";
import { setUserInfo } from "../../redux/modules/userSlice";
import { toast } from 'react-hot-toast';


const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState("");
  const [introduce, setIntroduce] = useState("");

  const [uploadImage, setUploadimage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isCheck, setIsCheck] = useState(true);

  const userInfo = useSelector((state) => state.user);
  const formData = new FormData();

  // 인풋창
  const [isNicknameFocused, setNicknameFocused] = useState(false);
  const [isIntroduceFocused, setIsFocused] = useState(false);

  const INTRODUCE_MAX_LENGTH = 38; // 필요한 대로 조정


  // 이미지 선택 시 처리
  const handleImageChange = (event) => {
    const selectedImage = event.target.files?.[0];
    const imgSize = event.target.files?.[0].size;
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (imgSize > maxSize) {

      toast.error("이미지 용량은 5MB 이내로 등록 가능합니다.");
      return;
    }
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result); // Use the result as the image source
        setUploadimage(selectedImage);
      };
      reader.readAsDataURL(selectedImage); // Read the image as a data URL
    }
  };
  
  useEffect(() => {
    setNickname(userInfo.nickname);
    if (userInfo.introduce) {
      setIntroduce(userInfo.introduce);
    }
    setProfileImage(userInfo.userImage);
  }, []);

  useEffect(() => {
    if (nickname === userInfo.nickname) {
      setIsCheck(true);
    }
  }, [nickname]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsCheck(false);
  };

  const handleIntroduceChange = (e) => {
    const newIntroduce = e.target.value;
    if (newIntroduce.length <= INTRODUCE_MAX_LENGTH) {
      setIntroduce(newIntroduce);
    }
  };
  

  const handleCheckButton = async () => {
    try {
      const response = await nicknameCheck(nickname);
     // console.log(response);
      if (response.data.message){
        toast.success(`${response.data.message}`);
        setIsCheck(true);
      } else {
        toast.error(`${response.data.error}`);
      // console.log(response.data.error)
        setIsCheck(false);
  
      }
    } catch (error) {
      toast.error("오류가 발생했습니다. 재시도 해주세요.");
    }
  };

  const handleSubmitButton = async () => {
    if (isCheck) {
      formData.set("userImage", uploadImage);
      formData.set(
        "requestDto",
        new Blob([JSON.stringify({ nickname, introduce })], {
          type: "application/json",
        })
      );
      try {
        const response = await updateProfile(userInfo.userId, formData);
        if (response.status <= 300) {
          toast.success('업데이트 성공했습니다');
          // console.log("Profile Update:", response);
          const accessToken = response.headers.accesstoken;
          const refreshToken = response.headers.refreshtoken;
          // console.log("accessToken:", accessToken);
          if (accessToken) {
            // 닉네임 변경 후 토큰 최신화
            localStorage.setItem("AccessToken", accessToken);
            localStorage.setItem("RefreshToken", refreshToken);
          }
          dispatch(
            setUserInfo({ nickname, introduce, userImage: response.data.data })
          );
          navigate(-1);
        }
      } catch (error) {
       // console.log(error);
       toast.error(`${error}`);
      }
    } else {
      toast.error("먼저 닉네임 중복체크를 완료해주세요.");
      return;
    }
  };

 

  return (
    <>
     <InnerContainer>
      <H1>프로필 관리</H1>
      <Stbox>
        <ImageUpload>
          <ImagePreview
            // 이미지를 클릭하면 input 영역을 클릭한 것과 같은 효과를 내도록 설정
            onClick={(event) => {
              event.preventDefault(); // 기본 클릭 동작 방지
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.click(); // 파일 선택 창 열기
              input.addEventListener("change", handleImageChange);
            }}
          >
            {profileImage ? (
              <img src={profileImage} alt="미리보기" />
            ) : (
              <DefaultImage>
                <CameraIconWrapper>
                  <CameraIcon />
                </CameraIconWrapper>
              </DefaultImage>
            )}
          </ImagePreview>
        </ImageUpload>
      </Stbox>

      <H3>닉네임</H3>
      <Stbox>
        <Stnickname>
          <Stname>
            <Stinput4
              type={"text"}
              placeholder={"2~8자 입력"} // 이 부분도 로컬스토리지나 서버에서 받아와서 기본 값이 담겨 있어야함.
              value={nickname} // Display nickname value
              onChange={handleNicknameChange}
              onFocus={() => setNicknameFocused(true)}
              onBlur={() => setNicknameFocused(false)}
              $isFocused={isNicknameFocused}
              $hasValue={nickname.length > 0}
            />
            <Stbutton1 $isCheck={isCheck} onClick={handleCheckButton}>
              중복체크
            </Stbutton1>
          </Stname>
        </Stnickname>
      </Stbox>

      <HH3>자기소개</HH3>
      <Stbox>
        <Stinput1
          type={"text"}
          placeholder={"자기소개를 입력해주세요."}
          value={introduce} // Display email value
          onChange={handleIntroduceChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          $isFocused={isIntroduceFocused}
          $hasValue={introduce.length > 0}
        />
        <CharacterCount>
  {introduce.length}/{INTRODUCE_MAX_LENGTH}
</CharacterCount>
      </Stbox>

      <Stbox>
        <Stbutton2 onClick={handleSubmitButton}>변경완료</Stbutton2>
      </Stbox>
      </InnerContainer>
      <StLine></StLine>
    </>
  );
};

export default EditProfile;

const InnerContainer = styled.div`
  display: block;

  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  padding-top: 40px;
  gap: 20px;
`;

const CharacterCount = styled.div`
padding-left: 300px;
font-size: 16px;
font-weight: 500;
color: #a6a3af;
`

// 이미지
const ImageUpload = styled.div`
  position: relative;
`;

const ImagePreview = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid #8084f4;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #252628;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  cursor: pointer;
`;

const DefaultImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #85848b;
  span {
    padding: 5px;
  }
  cursor: pointer;
`;

// 카메라 아이콘을 위한 스타일
const CameraIconWrapper = styled.div`
  position: absolute;
  bottom: 25px;
  right: 5px;
  background-color: #8084f4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;

  svg {
    fill: white;
    width: 30px;
    height: 30px;
  }
`;

// 프로필 수정
const H1 = styled.h1`
  font-size: 20px;
  color: #e7e6f0;
  font-weight: 600;
  line-height: 24px;
  /* padding-left: 20px; */
  margin-bottom: 44px;
  /* padding-top: 50px; */
`;

const Stbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 자기소개 인풋창
const Stinput1 = styled.input`
  width: 330px;
  height: 18px;
  padding: 10px;

  font-size: 16px;
  color: #85848b;

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
  font-size: 16px;
  color: #e7e6f0;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 10px;
  /* padding-left: 50px; */
  padding-top: 44px;
`;

const HH3 = styled.h3`
  font-size: 16px;
  color: #e7e6f0;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 10px;
  /* padding-left: 50px; */
  padding-top: 20px;
`;

const Stname = styled.div`
  display: flex; /* 가로 정렬을 위해 추가 */
  justify-content: center; /*요소들을 수평 가운데 정렬하기 위해 변경  */
  align-items: center; /* 세로 중앙 정렬을 위해 추가 */
`;

// 닉네임
const Stinput4 = styled.input`
  width: 240px;
  height: 18px;
  padding: 10px;

  font-size: 16px;
  color: #85848b;

  background-color: #252628;

  border: none;
  border-radius: 6px;
  outline: none;

  border: 1px solid ${(props) => (props.$isFocused ? "#8084f4" : "#141414;")};
  color: ${(props) => (props.$hasValue ? "#d9d9d9" : "#85848b")};
`;

// 중복체크 버튼
const Stbutton1 = styled.button`
  width: 80px;
  height: 38px;
  margin-left: 10px;
  background: linear-gradient(135deg, #8084f4, #c48fed);

  color: #d9d8df;

  &:hover {
    color: #141414;
  }

  border: none;
  border-radius: 6px;
  font-size: 16px; 
  font-weight: 500;
  cursor: pointer;

  ${(props) =>
    props.$isCheck &&
    css`
      background: #45424e;
      color: #141414;
      pointer-events: none;
    `}
`;

//  변경하기 버튼
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
  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  margin-top: 38px;
  /* margin-bottom: 100%; */
`;

const StLine = styled.div`
  background-color: #242325;
  height: 8px;
  margin-top: 32px;
`;