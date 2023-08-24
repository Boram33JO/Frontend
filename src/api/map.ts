import instance from "./common";

// 포스팅 데이터 등록
export const postData = async (latlng: any) => {
    try {
        const response = await instance.post(`/api/posts/map?page=0&size=10`, latlng);
        console.log("성공", response);
        return response;
    } catch (error) {
        console.log(error);
    }
};
