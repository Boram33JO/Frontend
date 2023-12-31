import { useState } from "react"
import { styled } from "styled-components"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { deleteComment, getComments } from "../../api/comment"
import CommentForm from "./CommentForm"
import { displayedAt, getProfileImage } from "../../utils/common"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/config/configStore"
import { useNavigate, useParams } from "react-router-dom"
import { Comment } from "../../models/post"
import { ReactComponent as Start } from "../../assets/images/page_start.svg"
import { ReactComponent as End } from "../../assets/images/page_end.svg"
import { ReactComponent as Prev } from "../../assets/images/page_prev.svg"
import { ReactComponent as Next } from "../../assets/images/page_next.svg"
import { ReactComponent as Empty } from "../../assets/images/comment_empty.svg"
import toast from 'react-hot-toast'
import Modal from "../common/Modal"

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
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const navigate = useNavigate();

    const deleteMutation = useMutation((commentId: string) => deleteComment(commentId), {
        onSuccess: () => {
            queryClient.invalidateQueries(["comment", page, totalPage]);
            toast.success("댓글 삭제 완료", { position: "bottom-center" });
        },
        onError: () => {
            toast.error("댓글 삭제 실패", { position: "bottom-center" });
        }
    });

    const CommentUpdateButtonHandler = (id: string) => {
        setIsEdit(true);
        setUpdateTarget(id);
    }

    const CommentDeleteToggleHandler = (id: string) => {
        setUpdateTarget(id);
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
                                <UserInfo onClick={() => navigate(`/profile/${item.userId}`)}>
                                    <UserImage src={getProfileImage(item.userImage)} />
                                    <P $color="#FAFAFA">
                                        {item.nickname}
                                    </P>
                                </UserInfo>
                            </ListItemTop>
                            {(updateTarget === item.commentId && isEdit) ?
                                <CommentForm setTarget={setUpdateTarget} setIsEdit={setIsEdit} commentId={item.commentId} comment={item.content} />
                                :
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
                                        {(userInfo.nickname === item.nickname) &&
                                            <>
                                                <Divider />
                                                <CommentP onClick={() => CommentUpdateButtonHandler(item.commentId)}>
                                                    수정
                                                </CommentP>
                                                <Divider />
                                                <CommentP onClick={() => CommentDeleteToggleHandler(item.commentId)}>
                                                    삭제
                                                </CommentP>
                                            </>
                                        }
                                    </ListItemBottom>
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
            {
                (deleteToggle) && (
                    <Modal
                        first="정말 해당 댓글을 삭제하시겠어요?"
                        second="삭제된 댓글은 다시 복구할 수 없습니다."
                        buttonName="삭제"
                        setToggle={setDeleteToggle}
                        clickButton={() => CommentDeleteButtonHandler(updateTarget)}
                    />)
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
`

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
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
    word-break: break-all;
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

const CommentEmpty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 25px 0px;
    gap: 21px;
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