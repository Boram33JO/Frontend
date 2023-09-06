import { SortType } from "../components/profiledetail/SortButton";
import instance from "./common";

// 마이페이지 관련 api

// 전체 프로필 조회
export const getProfileLists = async (userId: string | undefined) => {
  try {
    const response = await instance.get(`/user/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 마이페이지 하위 페이지들

// 내가 쓴 포스팅 조회
export const getMyPostLists = async (
  userId: string | undefined,
  page: number,
  sort: SortType
) => {
  const response = await instance.get(`/user/${userId}/posts`, {
    params: {
      page,
      size: 6,
      sort: sort === SortType.Newest
        ? "createdAt,desc"
        : sort === SortType.Oldest
          ? "createdAt,asc"
          : sort === SortType.wishlistCount
            ? "wishlistCount,desc" // 좋아요순은 likeCount를 기준으로 내림차순 정렬
            : sort === SortType.viewCount
              ? "viewCount,desc" : ""
    },
  });
  return response;
};



//내가 좋아요한 포스팅 조회
export const getFavLists = async (userId: string | undefined, page: number, sort: SortType) => {
  const response = await instance.get(`/user/${userId}/wishlist`, {
    params: {
      page,
      size: 6,
      sort: sort === SortType.Newest
        ? "createdAt,desc"
        : sort === SortType.Oldest
          ? "createdAt,asc"
          : "wishlistCount,desc",
      // 좋아요순은 likeCount를 기준으로 내림차순 정렬
    },
  });
  return response;
};

//팔로워 조회
export const getFollowLists = async (
  userId: string,
): Promise<any> => {
  const response = await instance.get(`/user/${userId}/follow`, {
  });
  return response.data;
};

// 팔로워 조회 
// export const getFollowLists = async ( userId: string | undefined, page: number,) => {
//   const response = await instance.get(`/user/${userId}/comments`, {
//      params: { page, size: 20}});
//      console.log(response);
//   return response;
// };


// 내가 댓글 단 포스팅 조회 (댓글 조회)
export const getCommentsLists = async (userId: string | undefined, page: number, sort: SortType) => {
  const response = await instance.get(`/user/${userId}/comments`, {
    params: {
      page, size: 10, sort: sort === SortType.Newest
        ? "createdAt,desc"
        : sort === SortType.Oldest
          ? "createdAt,asc"
          : "wishlistCount,desc", // 좋아요순은 likeCount를 기준으로 내림차순 정렬
    },
  });
  return response;
};

// 프로필 수정
export const updateProfile = async (userId: string | undefined, formData: FormData) => {
  const response = await instance.put(`/user/${userId}`, formData);
  return response;
};

// 닉네임 중복체크
export const nicknameCheck = async (nickname: string) => {
  const response = await instance.post(`/user/check`, { nickname });
  return response;
};
