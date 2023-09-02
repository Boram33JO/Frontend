import axios from "axios";

const TEST_URL = "https://api.weare777team.store/"

const testInstance = axios.create({
    baseURL: TEST_URL,
    headers: {
        "Content-Type": "text/event-stream",
    },
});

testInstance.interceptors.request.use(
    async function (config) {
        const accessToken = localStorage.getItem("AccessToken");
        if (accessToken) {
            config.headers.AccessToken = `${accessToken}`;
        }
        return config;
    },

    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);

testInstance.interceptors.response.use(
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
        console.log(error)
        return Promise.reject(error);
    }
);

export const connect = async () => {
    const response = await testInstance.get(`/notifications/connect`);
    // console.log("로그아웃", response);
    return response;
};