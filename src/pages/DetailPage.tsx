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
import toast from 'react-hot-toast'
import DeleteModal from '../components/common/DeleteModal'

const DetailPage = () => {
    const { id } = useParams();
    const { pathname } = useLocation();
    const [deleteToggle, setDeleteToggle] = useState<boolean>(false);
    const navigate = useNavigate();
    const userInfo = useSelector((state: RootState) => state.user);
    const queryClient = useQueryClient();

    const DeleteMutation = useMutation(deletePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(["post"]);
            toast.success("게시글 삭제 성공");
        }
    })

    const handleDeleteButton = () => {
        DeleteMutation.mutate(id);
        navigate(-1);
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
            <UpdateSection>
                {
                    (userInfo.nickname === data.nickname) && (
                        <>
                            <StButton onClick={() => navigate(`/edit/${id}`)}>수정</StButton>
                            <Divider />
                            <StButton onClick={() => setDeleteToggle(true)}>삭제</StButton>
                        </>
                    )
                }
            </UpdateSection >
            <StyledHr />
            <CommentList />
            <CommentForm />
            {(deleteToggle) &&
                <DeleteModal
                    first="정말 해당 게시글을 삭제하시겠어요?"
                    second="삭제된 게시글은 다시 복구할 수 없습니다."
                    deleteToggle={setDeleteToggle}
                    deleteButton={handleDeleteButton} />}
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
    height: 22px;
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