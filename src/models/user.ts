export type User = {
    userId?: number;
    nickname?: string;
    userImage?: string;
}

export type User2 = {
    id?: number;
    nickname?: string;
    userImage?: string;
}

export type UserInfo = {
    userId: number;
    nickname: string;
    userImage: string | null;
    introduce: string | null;
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