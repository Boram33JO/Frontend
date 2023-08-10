import { useState } from "react"
import { styled } from "styled-components"
import { Comment } from "../../pages/DetailPage"
import { useMutation, useQueryClient } from "react-query"
import { deleteComment } from "../../api/comment"
import CommentForm from "./CommentForm"
import { displayedAt } from "../utils/displayedAt"

interface Comments {
    comments: Comment[]
}

const CommentList: React.FC<Comments> = ({ comments }) => {
    const queryClient = useQueryClient();
    const [updateTarget, setUpdateTarget] = useState("");

    const deleteMutation = useMutation((commentId: string) => deleteComment(commentId), {
        onSuccess: (response) => {
            queryClient.invalidateQueries("posts");
            console.log(response.data);
        }
    });

    const CommentButtonHandler = () => { }

    const CommentUpdateButtonHandler = (id: string) => {
        setUpdateTarget(id);
    }

    const CommentDeleteButtonHandler = (id: string) => {
        deleteMutation.mutate(id);
    }

    return (
        <CommentListContainer>
            <CommentP $color="#D9D8E2">
                댓글 {comments?.length}
            </CommentP>
            {
                comments.map(item => {
                    return (
                        <CommentListItem key={item.commentId}>
                            <ListItemTop>
                                <UserImage src={item.userImage === null ? "https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?gif=1&w=640&h=640&c=c&webp=1" : item.userImage} />
                                <CommentP $color="#FAFAFA">
                                    {item.nickname}
                                </CommentP>
                            </ListItemTop>
                            {(updateTarget !== item.commentId) ?
                                <>
                                    <ListItemMiddle>
                                        <CommentP $color="#DEDCE7">
                                            {item.content}
                                        </CommentP>
                                    </ListItemMiddle>
                                    <ListItemBottom>
                                        <CommentP $color="#A6A3AF">
                                            {displayedAt(item.createdAt)}
                                        </CommentP>
                                        <Divider />
                                        <CommentButton onClick={CommentButtonHandler}>
                                            댓글 달기
                                        </CommentButton>
                                        {(true) &&
                                            <>
                                                <Divider />
                                                <CommentButton onClick={() => CommentUpdateButtonHandler(item.commentId)}>
                                                    수정
                                                </CommentButton>
                                                <Divider />
                                                <CommentButton onClick={() => CommentDeleteButtonHandler(item.commentId)}>
                                                    삭제
                                                </CommentButton>
                                            </>
                                        }
                                    </ListItemBottom>
                                </>
                                :
                                <>
                                    <CommentForm setTarget={setUpdateTarget} commentId={item.commentId} comment={item.content} />
                                </>
                            }
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
    background-color: black;
    padding: 20px 20px;
`
const CommentListItem = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-top: 20px;
    gap: 10px;
`

const UserImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
`

const ListItemTop = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

const ListItemMiddle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const ListItemBottom = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const CommentP = styled.p< { $color: string } >`
    color: ${props => props.$color};
    font-size: 16px;
    line-height: 22px;
`

const CommentButton = styled.p`
    font-size: 16px;
    line-height: 22px;
    color: #A6A3AF;
    background: none;
    border: none;
    padding: none;
    margin: none;

    cursor: pointer;
`

const Divider = styled.div`
    height: 14px;
    width: 1px;
    background-color: #A6A3AF;
    padding: 0;
`