import { useState } from "react"
import { styled } from "styled-components"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { deleteComment, getComments } from "../../api/comment"
import CommentForm from "./CommentForm"
import { displayedAt, getProfileImage } from "../../utils/common"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/config/configStore"
import { useParams } from "react-router-dom"
import { Comment } from "../../models/post"
import { ReactComponent as Start } from "../../assets/images/page_start.svg"
import { ReactComponent as End } from "../../assets/images/page_end.svg"
import { ReactComponent as Prev } from "../../assets/images/page_prev.svg"
import { ReactComponent as Next } from "../../assets/images/page_next.svg"
import { ReactComponent as Empty } from "../../assets/images/comment_empty.svg"

interface Comments {
    content: Comment[];
    empty: boolean;
}

const CommentList = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [updateTarget, setUpdateTarget] = useState("");
    const [deleteToggle, setDeleteToggle] = useState(false);
    const userInfo = useSelector((state: RootState) => state.user);
    const [page, setPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [pageButton, setPageButton] = useState<number[]>([]);

    const deleteMutation = useMutation((commentId: string) => deleteComment(commentId), {
        onSuccess: () => {
            queryClient.invalidateQueries(["comment", page, totalPage]);
        }
    });

    const CommentButtonHandler = () => { }

    const CommentUpdateButtonHandler = (id: string) => {
        setUpdateTarget(id);
    }

    const CommentDeleteToggleHandler = () => {
        setDeleteToggle(true);
    }

    const CommentDeleteButtonHandler = (id: string) => {
        deleteMutation.mutate(id);
        setDeleteToggle(false);
    }

    const { data, isLoading, isError } = useQuery<Comments>(["comment", page, totalPage],
        async () => {
            const response = await getComments(id, page);
            // console.log(response.data);
            setTotal(response.data.totalElements);
            setTotalPage(response.data.totalPages);
            if (page === totalPage && page > 0) {
                setPage(page - 1);
            }
            const pageBasicRange = 5; // 기본 페이지 수
            const pageRange = Math.min(pageBasicRange, totalPage); // 표시될 페이지 수 : 총 페이지 수가 기본 페이지 수보다 작으면 총 페이지 수 만큼만 버튼 보이게
            const middlePage = Math.floor(pageRange / 2); // 표시될 페이지 수의 중간값
            const startPage = ((page - middlePage) < totalPage - pageRange + 1) ? Math.max(0, page - middlePage) : totalPage - pageRange; // 표시될 페이지의 시작 번호
            const array = Array.from({ length: pageRange }, (_, i) => startPage + i + 1);
            setPageButton(array);
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
        <CommentListContainer>
            <P $color="#D9D8E2">
                댓글 {total}
            </P>
            {data?.empty === false ? (
                data?.content?.map(item => {
                    return (
                        <CommentListItem key={item.commentId}>
                            <ListItemTop>
                                <UserImage src={getProfileImage(item.userImage)} />
                                <P $color="#FAFAFA">
                                    {item.nickname}
                                </P>
                            </ListItemTop>
                            {(updateTarget !== item.commentId) ?
                                <>
                                    <ListItemMiddle>
                                        <P $color="#DEDCE7">
                                            {item.content}
                                        </P>
                                    </ListItemMiddle>
                                    <ListItemBottom>
                                        <P $size="14px" $color="#A6A3AF">
                                            {displayedAt(item.createdAt)}
                                        </P>
                                        {/* <Divider />
                                            <CommentP>
                                                댓글 달기
                                            </CommentP> */}
                                        {(userInfo.nickname === item.nickname) &&
                                            <>
                                                <Divider />
                                                <CommentP onClick={() => CommentUpdateButtonHandler(item.commentId)}>
                                                    수정
                                                </CommentP>
                                                <Divider />
                                                <CommentP onClick={CommentDeleteToggleHandler}>
                                                    삭제
                                                </CommentP>
                                            </>
                                        }
                                    </ListItemBottom>
                                    {
                                        (deleteToggle) && (
                                            <>
                                                <ModalBackground onClick={() => setDeleteToggle(false)} />
                                                <DeleteModal>
                                                    <P>
                                                        {`댓글을 삭제하시겠습니까?\n삭제한 댓글은 되돌릴 수 없습니다.`}
                                                    </P>
                                                    <DeleteButtonArea>
                                                        <DeleteModalButton onClick={() => setDeleteToggle(false)} >
                                                            취소
                                                        </DeleteModalButton>
                                                        <DeleteModalButton $delete={true} onClick={() => CommentDeleteButtonHandler(item.commentId)}>
                                                            삭제
                                                        </DeleteModalButton>
                                                    </DeleteButtonArea>
                                                </DeleteModal>
                                            </>
                                        )
                                    }
                                </>
                                :
                                <>
                                    <CommentForm setTarget={setUpdateTarget} commentId={item.commentId} comment={item.content} />
                                </>}
                        </CommentListItem>
                    )
                })) : (
                <CommentEmpty>
                    <StEmpty />
                    <P $color={"#4D4D4D"}>해당 포스팅의 첫 댓글을 남겨주세요!</P>
                </CommentEmpty>
            )
            }
            {data?.empty === false &&
                <CommentListPagination>
                    <SvgIcon onClick={() => { setPage(0) }}><Start /></SvgIcon>
                    <SvgIcon onClick={() => { if (page > 0) setPage(page - 1) }}><Prev /></SvgIcon>
                    <Pagination>
                        {
                            pageButton.map((item) => {
                                return (
                                    <PageButton key={item} $click={item === page + 1} onClick={() => { setPage(item - 1) }}>
                                        {item}
                                    </PageButton>
                                )
                            })
                        }
                    </Pagination>
                    <SvgIcon onClick={() => { if (page < totalPage - 1) setPage(page + 1) }}><Next /></SvgIcon>
                    <SvgIcon onClick={() => { setPage(totalPage - 1) }}><End /></SvgIcon>
                </CommentListPagination>
            }
        </CommentListContainer>
    )
}

export default CommentList

const CommentListContainer = styled.div`
    width: inherit;
    box-sizing: border-box;
    padding: 20px 20px;
`

const CommentListItem = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-top: 20px;
    gap: 14px;
`

const UserImage = styled.img`
    width: 32px;
    height: 32px;
    background-color: #ECECEC;
    border-radius: 50%;
`

const ListItemTop = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

const ListItemMiddle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    gap: 10px;
`

const ListItemBottom = styled.div`
    display: flex;
    align-items: center;
    margin-left: 40px;
    margin-top: 5px;
    gap: 10px;
`

const P = styled.p< { $size?: string, $color?: string } >`
    color: ${props => props.$color ? props.$color : "#FAFAFA"};
    font-size: ${(props) => props.$size ? props.$size : "16px"};
    line-height: calc(100% + 6px);
    white-space: pre-wrap;
`

const CommentP = styled.p`
    font-size: 14px;
    line-height: calc(100% + 6px);
    color: #A6A3AF;
    background: none;
    border: none;
    padding: none;
    margin: none;

    cursor: pointer;
`

const Divider = styled.div`
    height: 10px;
    width: 1px;
    background-color: #A6A3AF;
    padding: 0;
`

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;
    width: 100vh;
    height: 100vh;
    background-color: gray;
    opacity: 0.3;
`

const DeleteModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 5;
    width: 300px;
    background-color: #141414;
    color: #FAFAFA;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
    gap: 20px;
`

const DeleteButtonArea = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    gap: 10px;
`

const DeleteModalButton = styled.div<{ $delete?: boolean }>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    
    flex: 1 0 0;
    background: ${(props) => props.$delete ? "linear-gradient(135deg, #8084F4, #C48FED)" : "#2C2A30"};
    
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;
    color: ${(props) => props.$delete ? "#FAFAFA" : "#797582"};
    border-radius: 6px;
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;
    &:hover {
        color: ${(props) => props.$delete ? "#141414" : "#FAFAFA"};
    }
`

const CommentEmpty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 60px 0px;
    gap: 20px;
`

const StEmpty = styled(Empty)`
    
`

const CommentListPagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    margin: 40px 0px 10px;
    gap: 10px;
`

const SvgIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
`

const Pagination = styled.div`
    display:flex;
`

const PageButton = styled.div < { $click: boolean }> `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: ${(props) => props.$click ? "#7462E2" : "transparent"};
    color: ${(props) => props.$click ? "#FAFAFA" : "#535258"};
    cursor: pointer;
`