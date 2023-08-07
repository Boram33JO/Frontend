import { styled } from "styled-components"
import { Comment, Post } from "../../pages/DetailPage"
import { useMutation, useQueryClient } from "react-query"
import { deleteComment } from "../../api/comment"

type PostProps = {
    post: Post
}

interface Comments {
    comments: Comment[]
}

const CommentList: React.FC<Comments> = ({ comments }) => {
    const queryClient = useQueryClient();

    // 작성 시간
    const displayedAt = (createdAt: string) => {
        const milliSeconds = new Date().getTime() - new Date(createdAt).getTime();
        const seconds = milliSeconds / 1000
        if (seconds < 60) return `방금 전`
        const minutes = seconds / 60
        if (minutes < 60) return `${Math.floor(minutes)}분 전`
        const hours = minutes / 60
        if (hours < 24) return `${Math.floor(hours)}시간 전`
        const days = hours / 24
        if (days < 7) return `${Math.floor(days)}일 전`
        const weeks = days / 7
        if (weeks < 5) return `${Math.floor(weeks)}주 전`
        const months = days / 30
        if (months < 12) return `${Math.floor(months)}개월 전`
        const years = days / 365
        return `${Math.floor(years)}년 전`
    }

    const deleteMutation = useMutation((commentId: string) => deleteComment(commentId), {
        onSuccess: (response) => {
            queryClient.invalidateQueries("posts");
            console.log(response.data);
        }
    });

    const CommentButtonHandler = () => { }
    const CommentDeleteButtonHandler = (id: string) => {
        deleteMutation.mutate(id);
    }

    return (
        <CommentListContainer>
            {
                comments.map(item => {
                    return (
                        <CommentListItem key={item.commentId}>
                            <ListItemLeft>
                                <UserImage src={item.userImage === null ? "https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?gif=1&w=640&h=640&c=c&webp=1" : item.userImage} />
                            </ListItemLeft>
                            <ListItemMiddle>
                                <ListItemTop>
                                    <CommentP $color="#222222">
                                        {item.nickname}
                                    </CommentP>
                                    <CommentP $color="#626262">
                                        {item.content}
                                    </CommentP>
                                </ListItemTop>
                                <ListItemBottom>
                                    <CommentP $color="#B4B4B4">
                                        {displayedAt(item.createdAt)}
                                    </CommentP>
                                    {/* <CommentP $color="#B4B4B4" onClick={CommentButtonHandler}>
                                        댓글 달기
                                    </CommentP> */}
                                </ListItemBottom>
                            </ListItemMiddle>
                            <ListItemRight>
                                <button onClick={() => CommentDeleteButtonHandler(item.commentId)}>삭제</button>
                            </ListItemRight>
                        </CommentListItem>
                    )
                })
            }
        </CommentListContainer>
    )
}

export default CommentList

const CommentListContainer = styled.div`
    width: inherit;
    box-sizing: border-box;
    margin-top: 48px;
    padding: 0px 20px;
`
const CommentListItem = styled.div`
    display: flex;
    margin-bottom: 20px;
    gap: 10px;
`

const ListItemLeft = styled.div`
    flex: 0.1 0 0;
`

const UserImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`

const ListItemMiddle = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.8 0 0;
    gap: 10px;
`

const ListItemTop = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const ListItemBottom = styled.div`
    display: flex;
    gap: 10px;
`

const ListItemRight = styled.div`
    flex: 0.2 0 0;
`

const CommentP = styled.p< { $color: string } >`
    font-size: 16px;
    line-height: 22px;
    color: ${props => props.$color};
`