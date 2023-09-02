import default_profile from '../assets/images/default_profile.svg'

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
    return (image) ? image : default_profile
}

// Debouncing
export const debounce = (callback: (...args: any[]) => void, delay: number) => {
    let timerId: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, delay)
    }
}

// Throttling
export const throttle = (handler: (...args: any[]) => void, timeout = 300) => {
    let invokedTime: number
    let timer: number
    return function (this: any, ...args: any[]) {
        if (!invokedTime) {
            handler.apply(this, args)
            invokedTime = Date.now()
        } else {
            clearTimeout(timer)
            timer = window.setTimeout(() => {
                if (Date.now() - invokedTime >= timeout) {
                    handler.apply(this, args)
                    invokedTime = Date.now()
                }
            }, Math.max(timeout - (Date.now() - invokedTime), 0))
        }
    }
}

export const showCount = (num: number) => {
    const showNum = (num >= 1000000) ? `${Math.floor(num / 1000000)}M` : (num >= 1000) ? `${Math.floor(num / 1000)}K` : num
    return showNum;
}