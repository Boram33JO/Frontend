import instance from "./common";

// 인기 리스트
export const getPopularSongsList = async () => {
    try {
        const response = await instance.get(`/song/top10`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// 노래 검색
export const getSearchSongs = async (searchSong: string) => {
    try {
        const response = await instance.get(`/song/search?keyword=${searchSong}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

// 포스팅 데이터 등록
export const postData = async (data: any) => {
    const response = await instance.post(`/posts`, data);
    return response;
};

// 포스팅 데이터 수정
export const putData = async (data: any, postId: string | undefined) => {
    const response = await instance.put(`/posts/${postId}`, data);
    console.log(response);
    return response;
};
