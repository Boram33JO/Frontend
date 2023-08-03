import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import kakao_login_medium_wide from '../../img/kakao_login_medium_wide.png'

interface KakaoUser {
  id: number;
  kakao_account: {
    email?: string;
    profile?: {
      nickname?: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };
  };
}

//   카카오 개발자 페이지에서 발급 받은 클라이언트 아이디와 등록한 리디렉션 URI로 변경해야 합니다. 
//   또한, 리디렉션 URI의 콜백 처리를 서버에서 안전하게 처리해야 하며, 보안을 고려하여 Access Token을 관리해야 함.
//   리디렉션 URI(Uniform Resource Identifier)는 웹 애플리케이션에서 인증 및 로그인 과정에서 사용되는 URI입니다. 카카오 로그인 API와 같은 OAuth 2.0 기반의 인증 시스템에서 사용
const KakaoLogin: React.FC = () => {
  const clientId = '947372';
  const redirectUri = 'YOUR_REDIRECT_URI'; // Must match the one registered in Kakao Developers

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  };



  // 콜백 처리
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');

    if (code) {
      // Access Token 요청
      axios
        .post<any, AxiosResponse<{ access_token: string }>>(
          'https://kauth.kakao.com/oauth/token',
          {
            grant_type: 'authorization_code',
            client_id: clientId,
            redirect_uri: redirectUri,
            code: code,
          }
        )
        .then((response) => {
          const accessToken = response.data.access_token;

          // 사용자 정보 요청
          axios
            .get<KakaoUser>('https://kapi.kakao.com/v2/user/me', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((userResponse) => {
              const userInfo = userResponse.data;
              console.log(userInfo); // 사용자 정보 출력
            })
            .catch((error) => {
              console.error('Failed to get user info:', error);
            });
        })
        .catch((error) => {
          console.error('Failed to get access token:', error);
        });
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' ,cursor: 'pointer'}}>
      <img
        src={kakao_login_medium_wide}
        alt="카카오톡 로그인"
        className="kakaoLoginImage"
        onClick={handleKakaoLogin}
      />
    </div>
  );
};

export default KakaoLogin;