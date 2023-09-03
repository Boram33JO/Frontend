export type User = {
    userId?: number;
    nickname?: string;
    userImage?: string;
}

export type User2 = {
    id?: number;
    nickname?: string;
    userImage?: string;
    followCount: number;
}

export type UserInfo = {
    userId: number;
    nickname: string;
    userImage: string | null;
    introduce: string | null;
}

export type LoginUser = {
    isLogin: boolean;
    userId: number | null;
    nickname: string | null;
    userImage: string | null;
    introduce: string | null;
    eamil: string | null;
}

export type SignupFormat = {
    email: string;
    password: string;
    nickname: string;
    to: string;
}

export type PwChangeFormat = {
    email: string;
    originPassword: string;
    changePassword: string;
    
}

export type LoginFormat = {
    email: string;
    password: string;
}