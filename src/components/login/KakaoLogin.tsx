import React from 'react';
import kakao_login_medium_wide from '../../img/kakao_login_medium_wide.png'
// import { useNavigate } from 'react-router-dom';
// import {REST_API_KEY, REDIRECT_URI} from "../../api/kakaoLogin"

const KakaoLogin = () => {
  // const navigate = useNavigate()
  // const REST_API_KEY = '545665f819304672fe24245d39231f28';
  // const REDIRECT_URI = `http://localhost:3000/kakao/auth` 
  const KAKAO_AUTH_URL = `http://43.201.22.74/api/oauth/kakao`;
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
  // console.log(REST_API_KEY)
  // console.log(REDIRECT_URI)
  
  const handleKakaoLogin = () => {
      window.location.href = KAKAO_AUTH_URL
      // navigate(`/kakao/auth`)
    };

  return(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' ,cursor: 'pointer',marginBottom: '100%'}}>
       <img
        src={kakao_login_medium_wide}
        alt="카카오톡 로그인"
        className="kakaoLoginImage"
        onClick={handleKakaoLogin}
      />
    </div>
  )
}

export default KakaoLogin


// interface KakaoUser {
//   id: number;
//   kakao_account: {
//     email?: string;
//     profile?: {
//       nickname?: string;
//       profile_image_url?: string;
//       thumbnail_image_url?: string;
//     };
//   };
// }


//   카카오 개발자 페이지에서 발급 받은 클라이언트 아이디와 등록한 리디렉션 URI로 변경해야 합니다. 
//   또한, 리디렉션 URI의 콜백 처리를 서버에서 안전하게 처리해야 하며, 보안을 고려하여 Access Token을 관리해야 함.
//   리디렉션 URI(Uniform Resource Identifier)는 웹 애플리케이션에서 인증 및 로그인 과정에서 사용되는 URI입니다. 카카오 로그인 API와 같은 OAuth 2.0 기반의 인증 시스템에서 사용
// const KakaoLogin: React.FC = () => {
  
  // const clientId = '';
  // const redirectUri = `http://localhost:3000/kakao/auth` 
  // console.log(redirectUri)
  // console.log(clientId)
  // Must match the one registered in Kakao Developers //  Kakao Developers 여기에 등록도 하고 
  // const handleKakaoLogin = () => {
  //   window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  // };




//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' ,cursor: 'pointer',marginBottom: '100%'}}>
//       <img
//         src={kakao_login_medium_wide}
//         alt="카카오톡 로그인"
//         className="kakaoLoginImage"
//         onClick={handleKakaoLogin}
//       />
//     </div>
//   );
// };

// export default KakaoLogin;