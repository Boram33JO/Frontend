import React, { useState } from "react";
import { styled } from "styled-components";
import useInput from "../../hooks/useInput";
import { ReactComponent as CameraIcon } from "../../assets/images/profile_camera.svg"; // 프로필 카메라 SVG 아이콘 추가



const EditProfile = () => {
  const [email, onChangeEmailHandler] = useInput();
  const [nickname, onChangeNicknameHandler] = useInput();
  const [profileImage, setProfileImage] = useState(null);

  // 이미지 선택 시 처리
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setProfileImage(URL.createObjectURL(selectedImage));
  };



  return (
    <>
      <H1>프로필 수정</H1>
      <Stbox>
        <ImageUpload >
          <ImagePreview>
            {profileImage ? (
              <img src={profileImage} alt="미리보기" />
            ) : (
              <DefaultImage>
                <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <CameraIconWrapper >
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
              placeholder={"2~8자 입력"}
              // value={nickname} // Display nickname value
              // onChange={onChangeNicknameHandler}
            />
            <Stbutton1>중복체크</Stbutton1> 
          </Stname>
        </Stnickname>
      </Stbox>

      <H3>자기소개</H3>
      <Stbox>
        <Stinput1
          type={"text"}
          placeholder={"자기소개를 입력해주세요."}
          // value={email} // Display email value
          // onChange={onChangeEmailHandler}
        />
      </Stbox>

      <Stbox>
      <Stbutton2>변경하기</Stbutton2>
      </Stbox>
    </>
  );
};

export default EditProfile;


// 오류 코드
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
  font-size: 16px;
  color: #e7e6f0;
  font-weight: 500;

  line-height: 24px;
  padding-left: 20px;
  margin-bottom: 40px;
  padding-top: 50px;
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

  font-size: 14px;
  color: #85848b;

  background-color: #252628;
  border: none;
  border-radius: 6px;
  outline: none;
  margin-bottom: 10px;
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
  padding-left: 20px;
  padding-top: 50px;
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

  font-size: 14px;
  color: #85848b;

  background-color: #252628;

  border: none;
  border-radius: 6px;
  outline: none;
`;

// 중복체크 버튼
const Stbutton1 = styled.button`
  width: 80px;
  height: 38px;
  margin-left: 10px;
  background-color: #45424E;
 
  color: #D9D8DF;

  &:hover {
    color: #141414;
  }

  border: none;
  border-radius: 6px;
  font-size: 14px; //16
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
  font-size: 16px;
  font-weight: 500;

  cursor: pointer;

  margin-top: 20px;
  margin-bottom: 100%;
`;
