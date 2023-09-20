import { SortType } from "../components/profiledetail/SortButton";
import instance from "./common";

// 마이페이지 관련 api

// 정렬 로직을 공통 함수로 추출
const getSortedData = async (url: string, page: number, size: number, sort: SortType) => {
  const sortOptions = {
    [SortType.Newest]: "createdAt,desc",
    [SortType.Oldest]: "createdAt,asc",
    [SortType.wishlistCount]: "wishlistCount,desc",
    [SortType.viewCount]: "viewCount,desc",
  };

  const sortString = sortOptions[sort] || '';

  const response = await instance.get(url, {
    params: {
      page,
      size,
      sort: sortString,
    },
  });
  return response;
};

// 전체 프로필 조회
export const getProfileLists = async (userId: string | undefined) => {
  try {
    const response = await instance.get(`/user/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 내가 쓴 포스팅 조회
export const getMyPostLists = async (
  userId: string | undefined,
  page: number,
  sort: SortType
) => {
  return getSortedData(`/user/${userId}/posts`, page, 6, sort);
};

//내가 좋아요한 포스팅 조회
export const getFavLists = async (
  userId: string | undefined,
  page: number,
  sort: SortType
) => {
  return getSortedData(`/user/${userId}/wishlist`, page, 6, sort);
};

// 팔로워 조회
export const getFollowLists = async (userId: string | undefined, page: number) => {
  return getSortedData(`/user/${userId}/follow`, page, 20, SortType.Newest);
};

// 댓글 조회
export const getCommentsLists = async (
  userId: string | undefined,
  page: number,
  sort: SortType
) => {
  return getSortedData(`/user/${userId}/comments`, page, 10, sort);
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
