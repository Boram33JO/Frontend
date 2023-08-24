import instance from "./common"

// 메인 페이지 인기 포스팅 조회
export const getPopularPosts = async () => {
    const response = await instance.get(`api/posts/wishlist`)
    return response;
}

// 메인 페이지 인기 노래 조회
export const getPopularSongs = async () => {
    const response = await instance.get(`api/song/mostSong`)
    return response;
}

// 메인 페이지 카테고리별 최신 게시글 조회
export const getNewestPosts = async () => {
    const response = await instance.get(`api/posts`)
    return response;
}

// 메인 페이지 인기 팔로워 조회
export const getPopularPeople = async () => {
    const response = await instance.get(`api/popular`)
    return response;
}

// 게시글 리스트 카테고리별 조회
export const getPostLists = async (categoryId: string | undefined) => {
    const response = await instance.get(`api/posts/category/${categoryId}`,
        {
            params: { page: 0, size: 10 }
        }
    )
    return response;
}

// 게시글 상세 조회
export const getDetailPost = async (postId: string | undefined) => {
    const response = await instance.get(`api/posts/${postId}`)
    return response;
}

// 게시글 삭제
export const deletePost = async (postId: string | undefined) => {
    const response = await instance.delete(`api/posts/${postId}`)
    console.log(response);
    return response;
}

// 게시글 좋아요
export const likePost = async (postId: string | undefined) => {
    const response = await instance.post(`api/posts/${postId}/wishlist`)
    return response;
}

// 유저 팔로우
export const followUser = async (userId: number | undefined) => {
    const response = await instance.post(`api/profile/${userId}/follow`)
    return response;
}