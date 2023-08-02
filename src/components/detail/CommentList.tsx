import { styled } from "styled-components"
import { PostType } from "../../pages/DetailPage"

type PostProps = {
    post: PostType
}

const CommentList: React.FC<PostProps> = ({ post }) => {
    const CommentButtonHandler = () => {}
    return (
        <CommentListContainer>
            {
                post.comments.map(item => {
                    return (
                        <CommentListItem>
                            <ListItemLeft>
                                <UserImage src={item.userImage} />
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
                                        {item.createdAt} 
                                    </CommentP>
                                    <CommentP $color="#B4B4B4" onClick={CommentButtonHandler}>
                                        댓글 달기
                                    </CommentP>
                                </ListItemBottom>
                            </ListItemMiddle>
                            <ListItemRight>
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
    flex: 0.1 0 0;
`

const CommentP = styled.p< { $color: string } >`
    font-size: 16px;
    color: ${props => props.$color};
`