import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn2, setUserInfo } from "../../redux/modules/userSlice";
import { toast } from "react-hot-toast";

const RedirectKakao: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const KAKAO_CODE = location.search.split("=")[1];

        axios.post(`${process.env.REACT_APP_SERVER_URL}/oauth/token?code=${KAKAO_CODE}`).then((response) => {
            // console.log("kakao", response);
            localStorage.setItem("AccessToken", response.headers.accesstoken);
            localStorage.setItem("RefreshToken", response.headers.refreshtoken);
            dispatch(logIn2());
            dispatch(setUserInfo({ ...response.data }));
            toast.success("로그인되었습니다.", {position: 'top-center'});
            navigate("/");
        });
    });

    return <div>Kakao</div>;
};

export default RedirectKakao;
