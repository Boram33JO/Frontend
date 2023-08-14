export type User = {
    id?: number;
    nickname?: string;
    userImage?: string;
}

export type UserInfo = {
    userId?: number;
    nickname?: string;
    userImage?: string;
    introduce?: string;
}

export type SignupFormat = {
    email: string;
    password: string;
    nickname: string;
}

export type LoginFormat = {
    email: string;
    password: string;
}