import instance from "./common";

// 인기 리스트
export const getSearchList = async () => {
    try {
        const response = await instance.get(`/posts/search`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// 검색
export const getSearchKeyword = async (keyword: string) => {
    try {
        const response = await instance.get(`/posts/search/box`, {
            params: {
                keyword,
                type: "all",
                page: 0,
                size: 100,
                sortBy: "wishlist",
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

// all
// title
// songName
// nickname
// location

//  "wishlist"
//  "views"
//  "oldest"
