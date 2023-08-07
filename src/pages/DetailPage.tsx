import DetailContent from '../components/detail/DetailContent'
import Playlist from '../components/detail/Playlist'
import CommentList from '../components/detail/CommentList'
import CommentForm from '../components/detail/CommentForm'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getDetailPost } from '../api/post'

export type Comment = {
    commentId: string,
    nickname: string,
    userImage: string,
    content: string,
    createdAt: string
}

export type Song = {
    id: string,
    artistName: string,
    title: string,
    thumbnail: string
}

export type Post = {
    id: string,
    nickname: string,
    userImage: string,
    address: string,
    content: string,
    songs: Song[],
    comments: Comment[]
}

const DetailPage = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery(
        ["posts"],
        async () => {
            const response = await getDetailPost(id);
            return response.data;
        }
    )

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error occured while fetching data</div>
    }

    return (
        <>
            <DetailContent post={data} />
            <Playlist songs={data.songs} />
            <CommentList comments={data.comments} />
            <CommentForm />
        </>
    )
}

export default DetailPage