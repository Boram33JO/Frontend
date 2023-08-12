import React from "react";
import kakao_login_medium_wide from "../../img/kakao_login_medium_wide.png";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";


const KakaoLogin = () => {
const REST_API_KEY = "545665f819304672fe24245d39231f28";
const REDIRECT_URI = `http://localhost:3000/api/oauth/token`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const navigate = useNavigate();

console.log(REST_API_KEY);
console.log(REDIRECT_URI);

const handleKakaoLogin = () => {
window.location.href = KAKAO_AUTH_URL;
// navigate(`/kakao/auth`)
};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: "100%",
      }}
    >
      <img
        src={kakao_login_medium_wide}
        alt="카카오톡 로그인"
        className="kakaoLoginImage"
        onClick={handleKakaoLogin}
      />
    <DOV>
  <div>아직 피플의 회원이 아니신가요?</div>
  &nbsp;
  <Stlink2 onClick={() => { navigate('/signup') }}>회원가입</Stlink2>
</DOV>

    </div>
  );
};

export default KakaoLogin;

const DOV = styled.div`
  color: #b2b2b2;
  font-weight: 400;
  display: flex;
  align-items: center; /* 요소들을 수직으로 가운데 정렬 */
  justify-content: center; /* 요소들을 수평으로 가운데 정렬 */
  flex-direction: row; /* 요소들을 가로로 배치 */
  padding-top: 120px;
  font-size: 16px;
`;

const Stlink2 = styled.a`
  text-decoration: underline;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  cursor: pointer;
  color: #b2b2b2; /* 선택 사항: 링크 색상을 변경할 수 있습니다. */
`;

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
