import React from 'react'
import { styled } from 'styled-components'

const CommentForm = () => {
    return (
        <Container>
            <CommentTextArea placeholder='댓글 남기기'>

            </CommentTextArea>
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

const CommentTextArea = styled.textarea`
    width: 100%;
    min-height: 100px;

    background-color: #D9D9D9;
    outline: none;    
    border: none;
    resize: none;
    border-radius: 8px;

    font-family: "Pretendard";
    font-size: 14px;

    box-sizing: border-box;
    padding: 20px;
`