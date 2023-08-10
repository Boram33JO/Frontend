import DetailContent from '../components/detail/DetailContent'
import Playlist from '../components/detail/Playlist'
import CommentList from '../components/detail/CommentList'
import CommentForm from '../components/detail/CommentForm'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getDetailPost } from '../api/post'
import { styled } from 'styled-components'

type Location = {
    id: string;
    address: string;
    latitude: number;
    longtitude: number;
    placeName: string;
}

export type Comment = {
    commentId: string,
    nickname: string,
    userImage: string,
    content: string,
    createdAt: string
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
    userId: number;
    postId: number;
    postTitle: string;
    category: string;
    content: string;
    nickname: string;
    userImage: string;
    location?: Location;
    createdAt: string;
    follow: boolean;
    wishlist: boolean;
    wishlistCount: number;
    songs: Song[];
    comments: Comment[];
}

const DetailPage = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery(
        ["posts"],
        async () => {
            const response = await getDetailPost(id);
            // console.log(response.data);
            return response.data;
        }
    )

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error...</div>
    }

    return (
        <>
            <DetailContent post={data} />
            <Playlist songs={data.songs} />
            <StyledHr />
            <CommentList comments={data.comments} />
            <CommentForm />
        </>
    )
}

export default DetailPage

const StyledHr = styled.hr`
    background-color: #242325;
    height: 8px;
    margin: 0;
    border: none;
`