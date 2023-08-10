import instance from "./common"

// 게시글 상세 조회
const getDetailPost = async (postId: string | undefined) => {
    const response = await instance.get(`api/posts/${postId}`)
    return response;
}

// 게시글 좋아요
const likePost = async (postId: string | undefined) => {
    const response = await instance.post(`api/posts/${postId}/wishlist`)
    return response;
}

// 유저 팔로우
const followUser = async (userId: number | undefined) => {
    const response = await instance.post(`api/profile/${userId}/follow`)
    return response;
}

export { getDetailPost, likePost, followUser }