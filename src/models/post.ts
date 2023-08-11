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

export type Post = {
    postId: number;
    postTitle: string;
    category: string;
    content: string;
    nickname: string;
    userImage: string;
    location?: Location;
    createdAt: string;
    wishlistCount: number;
    songs: Song[];
    comments?: Comment[];
}