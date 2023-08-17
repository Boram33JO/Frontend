import DetailContent from '../components/detail/DetailContent'
import Playlist from '../components/detail/Playlist'
import CommentList from '../components/detail/CommentList'
import CommentForm from '../components/detail/CommentForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deletePost, getDetailPost } from '../api/post'
import { styled } from 'styled-components'
import { useSelector } from "react-redux"
import { RootState } from '../redux/config/configStore'
import { useEffect, useState } from 'react'

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

const DetailPage = () => {
    const { id } = useParams();
    const { pathname } = useLocation();
    const [deleteToggle, setDeleteToggle] = useState<Boolean>(false);
    const navigate = useNavigate();
    const userInfo = useSelector((state: RootState) => state.user);
    const queryClient = useQueryClient();

    const DeleteMutation = useMutation(deletePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(["post"]);
        }
    })

    const handleDeleteButton = () => {
        DeleteMutation.mutate(id);
        navigate(-1);
    }

    const handleDeleteToggle = () => {
        setDeleteToggle(true);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const { data, isLoading, isError } = useQuery(["post", id],
        async () => {
            const response = await getDetailPost(id);
            // console.log(response.data)
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
            {
                (userInfo.nickname === data.nickname) && (
                    <UpdateSection>
                        <StButton>수정</StButton>
                        <Divider />
                        <StButton onClick={handleDeleteToggle}>삭제</StButton>
                    </UpdateSection>
                )
            }
            <StyledHr />
            {
                (deleteToggle) && (
                    <>
                        <ModalBackground onClick={() => setDeleteToggle(false)} />
                        <DeleteModal>
                            <P>
                                {`게시글을 삭제하시겠습니까?`}
                            </P>
                            <DeleteButtonArea>
                                <DeleteModalButton onClick={() => setDeleteToggle(false)} >
                                    취소
                                </DeleteModalButton>
                                <DeleteModalButton $delete={true} onClick={handleDeleteButton}>
                                    삭제
                                </DeleteModalButton>
                            </DeleteButtonArea>
                        </DeleteModal>
                    </>
                )
            }
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
    margin-top: 20px;
    border: none;
`

const UpdateSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    box-sizing: border-box;
    padding: 0px 20px;
    margin-top: 10px;
`

const Divider = styled.div`
    height: 14px;
    width: 1px;
    background-color: #A6A3AF;
    padding: 0;
`

const StButton = styled.p`
    font-size: 16px;
    line-height: 22px;
    color: #A6A3AF;
    background: none;
    border: none;
    padding: none;
    margin: none;

    cursor: pointer;
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
    /* background-color: rgba(33, 38, 41, 0.3); */
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
    color: ${(props) => props.$delete ? "#FAFAFA" : "#797582"};
    border-radius: 6px;
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;
    &:hover {
        color: ${(props) => props.$delete ? "#141414" : "#FAFAFA"};
    }
`

const P = styled.p`
    font-size: 16px;
    line-height: 22px;
    white-space: pre-wrap;
`