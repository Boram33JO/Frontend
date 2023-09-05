import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components'
import { postComment, updateComment } from '../../api/comment';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import Modal from '../common/Modal';
import { toast } from 'react-hot-toast';

interface Comment {
    setTarget?: any;
    setIsEdit?: any;
    commentId?: string;
    comment?: string;
}

const CommentForm: React.FC<Comment> = ({ setTarget, setIsEdit, commentId, comment }) => {
    const { id } = useParams();
    const [content, setContent] = useState('' || comment);
    const [toggle, setToggle] = useState<boolean>(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const LoginUser = useSelector((state: RootState) => state.user);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleClickOKButton = () => {
        navigate(`/login`);
        return
    }

    const handleResizeHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleResizeHeight();
        setContent(event.target.value);
    };

    const commentMutation = useMutation((postId: string) => postComment(postId, { content: content }), {
        onSuccess: () => {
            queryClient.invalidateQueries("comment");
            toast.success('댓글 작성 완료');
        },
        onError: () => {
            toast.success('댓글 작성 실패');
        }
    });

    const updateMutation = useMutation((commentId: string) => updateComment(commentId, { content: content }), {
        onSuccess: () => {
            queryClient.invalidateQueries("comment");
            toast.success('댓글 수정 완료');
        },
        onError: () => {
            toast.error('댓글 수정 실패');
        }
    });

    const handlePostButtonClick = async () => {
        if (LoginUser.isLogin) {
            if (id && content) {
                commentMutation.mutate(id);
                setContent("");
            } else {
                toast.error('댓글 내용을 입력하세요');
                return
            }
        } else {
            setToggle(true);
            return
        }
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    }

    const handleUpdateButtonClick = async () => {
        if (commentId && content) {
            updateMutation.mutate(commentId);
            setTarget("");
            setIsEdit(false);
        } else {
            toast.error('댓글 내용을 입력하세요');
            return
        }
    }

    useEffect(() => {
        handleResizeHeight();
    }, [])

    return (
        <Container $edit={Boolean(comment)}>
            <CommentContent>
                <CommentTextArea
                    ref={textareaRef}
                    spellCheck={"false"}
                    placeholder={"댓글 남기기"}
                    value={content}
                    onChange={handleContentChange}
                    rows={1}
                />
                <CommentButtonArea>
                    {(comment)
                        ? <CommentButton $fill={!!content} onClick={handleUpdateButtonClick}>
                            수정
                        </CommentButton>
                        : <CommentButton $fill={!!content} onClick={handlePostButtonClick}>
                            입력
                        </CommentButton>
                    }
                </CommentButtonArea>
            </CommentContent>
            {toggle &&
                <Modal
                    first={`로그인 후 댓글을 작성할 수 있습니다.`}
                    second={`로그인 하시겠습니까?`}
                    buttonName={"확인"}
                    setToggle={setToggle}
                    clickButton={handleClickOKButton}
                />
            }
        </Container>
    )
}

export default CommentForm

const Container = styled.div<{ $edit: boolean }>`
    width: inherit;
    box-sizing: border-box;
    background-color: #141414;
    padding: ${props => props.$edit ? "" : "20px"};
    padding-top: 0px;
`

const CommentContent = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
    background-color: #2C2A30;
    border-radius: 8px;
`

const CommentTextArea = styled.textarea`
    flex: 1 0 0;
    min-height: 20px;

    color: #FAFAFA;
    font-family: "Pretendard";
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.1px;

    border: none;
    background: none;
    outline: none; 
    resize: none;
    overflow-y: auto;
    border-radius: 8px;

    box-sizing: border-box;
    padding: 20px;

    &::-webkit-scrollbar {
        display: none;
    }
`

const CommentButtonArea = styled.div`
    box-sizing: border-box;
    display: flex;
    padding: 20px;
    padding-left: 0px;
`

const CommentButton = styled.div<{ $fill?: boolean }>`
    display: inline-block;
    border: none;
    background: none transparent;
    
    color: ${(props) => props.$fill ? "#FAFAFA" : "#797582"};
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;

    padding: 0px;
`