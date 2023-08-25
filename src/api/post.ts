import instance from "./common"

// 메인 페이지 인기 포스팅 조회
export const getPopularPosts = async () => {
    const response = await instance.get(`posts/top-wishlists`)
    return response;
}

// 메인 페이지 인기 노래 조회
export const getPopularSongs = async () => {
    const response = await instance.get(`song/category/top4`)
    return response;
}

// 메인 페이지 카테고리별 최신 게시글 조회
export const getNewestPosts = async () => {
    const response = await instance.get(`posts`)
    return response;
}

// 메인 페이지 인기 팔로워 조회
export const getPopularPeople = async () => {
    const response = await instance.get(`top-follows`)
    return response;
}

// 게시글 리스트 카테고리별 조회
export const getPostLists = async (categoryId: string | undefined) => {
    const response = await instance.get(`posts/category/${categoryId}`,
        {
            params: { page: 0, size: 10 }
        }
    )
    return response;
}

// 게시글 상세 조회
export const getDetailPost = async (postId: string | undefined) => {
    const response = await instance.get(`posts/${postId}`)
    return response;
}

// 게시글 삭제
export const deletePost = async (postId: string | undefined) => {
    const response = await instance.delete(`posts/${postId}`)
    return response;
}

// 게시글 좋아요
export const likePost = async (postId: string | undefined) => {
    const response = await instance.post(`posts/${postId}/wishlists`)
    return response;
}

// 유저 팔로우
export const followUser = async (userId: number | undefined) => {
    const response = await instance.post(`user/${userId}/follows`)
    return response;
}