import instance from "./common"

// 게시글 상세 조회
const getDetailPost = async (postId: string | undefined) => {
    const response = await instance.get(`api/posts/${postId}`)
    return response;
}

export { getDetailPost }