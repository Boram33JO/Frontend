// 작성 시간 (6일 전까지만 표시, 7일 전 부터는 YY.MM.DD로 표시)
export const displayedAt = (createdAt: string) => {
    const milliSeconds = new Date().getTime() - new Date(createdAt).getTime();
    const seconds = milliSeconds / 1000
    if (seconds < 60) return `방금 전`
    const minutes = seconds / 60
    if (minutes < 60) return `${Math.floor(minutes)}분 전`
    const hours = minutes / 60
    if (hours < 24) return `${Math.floor(hours)}시간 전`
    const days = hours / 24
    if (days < 7) return `${Math.floor(days)}일 전`

    return getDateNotation(createdAt);
}

// 날짜 표기 (YY.MM.DD)
export const getDateNotation = (input?: string) => {
    const date = input ? new Date(input) : new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}.${month}.${day}`;
}

// 기본 이미지
export const getProfileImage = (image?: string | null) => {
    return (image) ? image : "https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?gif=1&w=640&h=640&c=c&webp=1"
}