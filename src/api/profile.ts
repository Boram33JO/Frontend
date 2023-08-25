import instance from "./common"

// 마이페이지 관련 api

// 전체 프로필 조회
export const getProfileLists = async (userId: string | undefined) => {
    try {
        const response = await instance.get(`/user/${userId}`);
        // console.log('Response:', response);
        return response;
    } catch (error) {
        //   console.error('요청 실패:', error);
        throw error;
    }
};

// 마이페이지 하위 페이지들
// 내가 쓴 포스팅 조회
export const getMyPostLists = async (userId: string | undefined) => {
    const response = await instance.get(`/user/${userId}/posts`)
    return response;
}

// 내가 좋아요한 포스팅 조회
export const getFavLists = async (userId: string | undefined) => {
    const response = await instance.get(`/user/${userId}/wishlist`)
    return response;
}


// 팔로워 조회
export const getFollowLists = async (userId: string): Promise<any> => {
    try {
        const response = await instance.get(`/user/${userId}/follow`);
        return response.data;
    } catch (error) {
        console.error("팔로워 조회 중 오류 발생:", error);
        throw error;
    }
};



// 내가 댓글 단 포스팅 조회 (댓글 조회)
export const getCommentsLists = async (userId: string | undefined) => {
    const response = await instance.get(`/user/${userId}/comments`,
        { params: { page: 0, size: 10, sort: "createdAt,asc" } }
    )
    return response;
}


// 유저 팔로우 
// export const followUser = async (userId: number | undefined) => {
//     const response = await instance.post(`api/profile/${userId}/follow`)
//     return response;
// }


// 프로필 수정
export const updateProfile = async (userId: string | undefined, formData: FormData) => {
    const response = await instance.put(`/user/${userId}`, formData);
    return response;
}

// 닉네임 중복체크
export const nicknameCheck = async (nickname: string) => {
    const response = await instance.post(`/user/check`, { nickname });
    return response;
}