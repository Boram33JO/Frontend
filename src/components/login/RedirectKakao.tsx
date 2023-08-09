// import React, { useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const RedirectKakao = () => {
//   const location = useLocation();
//   const KAKAO_CODE = location.search.split("=")[1];
//   console.log(KAKAO_CODE)
// useEffect(()=> {
//   const getKakaoToken = async (KAKAO_CODE: string) => {
//       const response = await axios.get(
//         `http://43.201.22.74/api/oauth/token?code=${KAKAO_CODE}` 
//       )
//       .then(() => {
//         console.log("llllll");
//         console.log(response);
//         })
//   };
//   if (KAKAO_CODE) {
//     getKakaoToken(KAKAO_CODE); // 호출 추가
//   }
// }, [KAKAO_CODE]); // KAKAO_CODE 변경 시에만 실행되도록

//   return <div>Kakao</div>;
// };

// export default RedirectKakao;


import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const RedirectKakao: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const KAKAO_CODE = location.search.split("=")[1];

    const getKakaoToken = (code: string) => {
      const response = axios.post(`http://43.201.22.74/api/oauth/token?code=${code}`)
      // const kakaotoken = response.headers.authorization;
      // localStorage.setItem("token", kakaotoken);
      
      console.log("llllll");
      console.log("akakak",response);
        
    };

    if (KAKAO_CODE) {
      getKakaoToken(KAKAO_CODE);
    }
  }, [location.search]);

  return <div>Kakao</div>;
};

export default RedirectKakao;
