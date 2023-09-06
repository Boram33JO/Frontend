import instance from "./common";

// 알림 목록 조회
export const getNotification = async () => {
    const response = await instance.get(`/notifications`);
    // console.log("내가받은 알림 조회", response);
    return response.data;
};

// 알림 삭제
export const deleteNotification = async (id: number) => {
    const response = await instance.patch(`/notifications/${id}`);
    // console.log("알림 삭제", response)
    return response.data;
};