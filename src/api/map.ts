import instance from "./common";

// 포스팅 데이터 등록
export const postData = async (latlng: any) => {
    try {
        const response = await instance.post(`/api/posts/map?page=0&size=10`, latlng);
        return response;
    } catch (error) {
        console.log(error);
    }
};

// // 포스팅 카테고리 데이터 등록
export const postCategoryData = async (latlng: any, categoryId: number) => {
    try {
        const response = await instance.get(`/api/posts/category/${categoryId}?page=0&size=10`, latlng);
        return response;
    } catch (error) {
        console.log(error);
    }
};
