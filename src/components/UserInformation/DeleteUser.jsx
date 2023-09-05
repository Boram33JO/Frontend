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
  const LoginUser = useSelector((state) => state.user);
  const isMyProfile = Number(userId) === LoginUser.userId;

  const navigateTomain = async () => {
  navigate('/');
  }

  const handleUserDeleteChange = async () => {
   try {
     const result = await deleteUser();
     if (result.success){
      console.log(result)
       toast.success('탈퇴가 완료되었습니다. 감사합니다.', { position: 'top-center' });
        navigate("/");
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
     console.error('탈퇴오류:', error);
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
            <Stbutton2 onClick={navigateTomain}>뒤로</Stbutton2>
            <Stbutton2 onClick={handleUserDeleteChange}>계정삭제</Stbutton2>
          </Stbox>
        </InnerContainer>
      </>
    
  );
};

export default DeleteUser;



const InnerContainer = styled.div`
  width: 100%;
  display: flex;
   align-items: center;
   padding: 0 20px;
   padding-top: 275px;
`;

const StBox2 = styled.div`

`;

const Stbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 14px;
`;


const Stbutton2 = styled.button`
  width: 168px;
  height: 44px;
  background: #45424E;
  color: #e7e6f0;
  &:hover {
    color: #141414;
  }
  border: none;
  border-radius: 6px;
  font-size: 17px;
  font-weight: 500;
  align-items: center;
  cursor: pointer;
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