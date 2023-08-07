import React, { useRef, useState } from 'react';
import { styled } from 'styled-components'
import { postComment } from '../../api/comment';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

const CommentForm = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
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

    const handlePostButtonClick = async () => {
        if (id) {
            commentMutation.mutate(id);
            setContent("");
        }
    }

    return (
        <Container>
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
                    <CommentButton onClick={handlePostButtonClick}>
                        입력
                    </CommentButton>
                </CommentButtonArea>
            </CommentContent>
        </Container>
    )
}

export default CommentForm

const Container = styled.div`
    width: inherit;
    box-sizing: border-box;
    margin-top: 48px;
    margin-bottom: 20px;
    padding: 0px 20px;
`

const CommentContent = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
    background-color: #D9D9D9;
    border-radius: 8px;
`

const CommentTextArea = styled.textarea`
    flex: 1 0 0;
    min-height: 20px;

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
    
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;

    padding: 0px;
`