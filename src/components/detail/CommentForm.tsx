import React, { useRef, useState } from 'react';
import { styled } from 'styled-components'
import { postComment, updateComment } from '../../api/comment';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

interface Comment {
    setTarget?: any;
    commentId?: string;
    comment?: string;
}

const CommentForm: React.FC<Comment> = ({ setTarget, commentId, comment }) => {
    const { id } = useParams();
    const [content, setContent] = useState('' || comment);
    const queryClient = useQueryClient();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
        onSuccess: (response) => {
            queryClient.invalidateQueries("posts");
            console.log(response.data);
        }
    });

    const updateMutation = useMutation((commentId: string) => updateComment(commentId, { content: content }), {
        onSuccess: (response) => {
            queryClient.invalidateQueries("posts");
            console.log(response.data);
        }
    });

    const handlePostButtonClick = async () => {
        if (id) {
            commentMutation.mutate(id);
            setContent("");
        }
    }

    const handleUpdateButtonClick = async () => {
        if (commentId) {
            updateMutation.mutate(commentId);
            setTarget("");
        }
    }

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
                        ? <CommentButton onClick={handleUpdateButtonClick}>
                            수정
                        </CommentButton>
                        : <CommentButton onClick={handlePostButtonClick}>
                            입력
                        </CommentButton>
                    }
                </CommentButtonArea>
            </CommentContent>
        </Container>
    )
}

export default CommentForm

const Container = styled.div<{ $edit: boolean }>`
    width: inherit;
    box-sizing: border-box;
    background-color: black;
    padding: ${props => props.$edit ? "" : "20px"};
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

    color: #797582;
    font-family: "Pretendard";
    font-size: 14px;
    line-height: 20px;

    border: none;
    background: none;
    outline: none; 
    resize: none;
    overflow-y: auto;
    border-radius: 8px;

    box-sizing: border-box;
    padding: 20px;
`

const CommentButtonArea = styled.div`
    box-sizing: border-box;
    display: flex;
    padding: 20px;
    padding-left: 0px;
    
`

const CommentButton = styled.div`
    display: inline-block;
    border: none;
    background: none transparent;
    
    color: #797582;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;

    padding: 0px;
`