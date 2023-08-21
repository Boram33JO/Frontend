import instance from "./common";

// 인기 리스트
export const getPopularSongsList = async () => {
    try {
        const response = await instance.get(`/api/song/AllMostSong`);
        // console.log("성공111122222", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// 노래 검색
export const getSearchSongs = async (searchSong: string) => {
    try {
        const response = await instance.get(`/api/song/search?keyword=${searchSong}`);
        // console.log("성공", response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

// 포스팅 데이터 등록
export const postData = async (data: any) => {
    try {
        const response = await instance.post(`/api/posts`, data);
        console.log("성공", response);
        return response;
    } catch (error) {
        console.log(error);
    }
};
