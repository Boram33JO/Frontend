import instance from "./common"

// 마이페이지 관련 api

// 전체 프로필 조회
export const getProfileLists = async (userId: string | undefined) => {
    try {
        const response = await instance.get(`/api/profile/${userId}`);
        console.log('Response:', response);
        return response;
    } catch (error) {
        console.error('요청 실패:', error);
        throw error;
    }
};

// 마이페이지 하위 페이지들
// 내가 쓴 포스팅 조회
export const getMyPostLists = async (userId: string | undefined) => {
    const response = await instance.get(`/api/profile/${userId}/posts`)
    return response;
}

// 내가 좋아요한 단 포스팅 조회
export const getFavLists = async (userId: string | undefined) => {
    const response = await instance.get(`/api/profile/${userId}/wishlist`,
        // {
        //     params: { page: 0, size: 10 }
        // }
    )
    return response;
}


// 팔로워 조회
export const getFollowLists = async (userId: string | undefined) => {
    const response = await instance.get(`/api/profile/${userId}/follow`)
    return response;
}


// 내가 댓글 단 포스팅 조회
export const getCommentsLists = async (userId: string | undefined) => {
    const response = await instance.get(`/api/profile/${userId}/comments`,
        // {
        //     params: { page: 0, size: 10 }
        // }
    )
    return response;
}


// 유저 팔로우
export const followUser = async (userId: number | undefined) => {
    const response = await instance.post(`api/profile/${userId}/follow`)
    return response;
}
