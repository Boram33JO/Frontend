import instance from "./common";

// 포스팅 카테고리 데이터 등록
export const postCategoryData = async (latlng: any) => {
    try {
        const response = await instance.post(`/posts/map`, latlng, {
            params: { page: 0, size: 200 },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
