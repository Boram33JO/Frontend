import axios from "axios";
import { logout } from "../redux/modules/userSlice";
import store from "../redux/config/configStore";

export const instance = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

instance.interceptors.request.use(
    async function (config) {
        // 로컬 스토리지에서 토큰 값 가져오기
        const accessToken = localStorage.getItem("AccessToken");

        // 토큰이 존재하면 헤더에 담아서 요청 보내기
        if (accessToken) {
            config.headers.AccessToken = `${accessToken}`;
        }
        return config;
    },

    function (error) {
        // console.log(error);
        // console.log("인터셉트 요청 오류!");
        return Promise.reject(error);
    }
);

function isAccessTokenExpired() {
    const accessToken = localStorage.getItem("AccessToken");
    if (!accessToken) {
        return false;
    }

    const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    return currentTime > expirationTime;
}

instance.interceptors.response.use(
    function (response) {
        if (response.headers.accesstoken) {
            localStorage.setItem("AccessToken", response.headers.accesstoken);
        }
        if (response.headers.refreshtoken) {
            localStorage.setItem("RefreshToken", response.headers.refreshtoken);
        }
        // console.log("인터셉트 사용", response);
        return response;
    },
    // 토큰 에러 발생 시 토큰 재발급 후 재요청
    async function (error) {
        // console.log("에러 발생", error);
        const { config } = error;
        if (error.response.data.statusCode === 4001 || isAccessTokenExpired()) {
            try {
                const response = await instance.post(`/token/refresh`, null, {
                    headers: { RefreshToken: localStorage.getItem("RefreshToken"), },
                });
                if (response.data.statusCode === 200) {
                    localStorage.setItem("AccessToken", response.headers.accesstoken);
                    return instance(config);
                } else if (response.data.statusCode === 40012) {
                    store.dispatch(logout());
                    alert("토큰이 만료되었습니다. 로그아웃됩니다.");
                    window.location.replace("/login");
                }
            } catch (error) {
                store.dispatch(logout());
                alert("잘못된 접근입니다. 로그아웃됩니다.");
                window.location.replace("/login");
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
