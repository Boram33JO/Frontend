export type Location = {
    id: string;
    address: string;
    latitude: number;
    longtitude: number;
    placeName: string;
}

export type Song = {
    id: string;
    album: string;
    artistName: string;
    songTitle: string;
    thumbnail: string;
    audioUrl: string;
    externalUrl: string;
}

export type Comment = {
    commentId: string,
    nickname: string,
    userImage: string,
    content: string,
    createdAt: string
}

export type Post = {
    userId: number;
    postId: number;
    postTitle: string;
    category: number;
    content: string;
    nickname: string;
    userImage: string;
    location?: Location;
    createdAt: string;
    follow: boolean;
    wishlist: boolean;
    wishlistCount: number;
    songs: Song[];
    comments?: Comment[];
}