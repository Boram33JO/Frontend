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


//api/user/kakao/callback

import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/modules/userSlice";
import { logIn } from "../../redux/modules/loginSlice";

const RedirectKakao: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const KAKAO_CODE = location.search.split("=")[1];

        axios.post(`https://api.pple.today/api/oauth/token?code=${KAKAO_CODE}`).then((response) => {
            // console.log("kakao", response);
            // localStorage.setItem("token", response.headers.authorization);
            localStorage.setItem("AccessToken", response.headers.accesstoken);
            localStorage.setItem("RefreshToken", response.headers.refreshtoken);
            dispatch(logIn(null));
            dispatch(setUserInfo({ ...response.data }));
            alert("로그인되었습니다.");
            navigate("/");
        });
    });

    return <div>Kakao</div>;
};

export default RedirectKakao;
