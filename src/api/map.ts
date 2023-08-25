import instance from "./common";

// 포스팅 데이터 등록
export const postData = async (latlng: any) => {
    try {
        const response = await instance.post(`/posts/map?page=0&size=4`, latlng);
        return response;
    } catch (error) {
        console.log(error);
    }
};

// // 포스팅 카테고리 데이터 등록
export const postCategoryData = async (latlng: any, categoryId: number) => {
    try {
        const response = await instance.get(`/posts/category/${categoryId}?page=0&size=4`, latlng);
        return response;
    } catch (error) {
        console.log(error);
    }
};
