import React from 'react'
import { styled } from 'styled-components'
import notfound from '../assets/images/not_found.svg'
import { useNavigate } from 'react-router'
const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <InnerContainer>
                <img src={notfound} alt="not_found" />
                <NotFoundComment>
                    <P $size="32px" $weight="700">Not Found...</P>
                    <P>{`존재하는 컨텐츠가 아니거나\n삭제된 컨텐츠입니다.`}</P>
                </NotFoundComment>
                <MainButton onClick={() => navigate(`/`)}>메인으로</MainButton>
            </InnerContainer>
        </Container>
    )
}

export default NotFoundPage

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;
    gap: 28px;
`

const NotFoundComment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 14px;
`

const P = styled.p<{ $color?: string, $size?: string, $weight?: string }>`
    color: ${(props) => props.$color || "#EAE9F4"};
    font-size: ${(props) => props.$size || "16px"};
    font-weight: ${(props) => props.$weight || "500"};
    line-height: calc(100% + 6px);
    white-space: pre-wrap;
    text-align: center;
`

const MainButton = styled.button`
    width: 132px;
    height: 36px;
    border-radius: 36px;
    background: linear-gradient(132deg, #C290EE 0%, #9782F4 100%);
    color: #FFFFFF;
    cursor: pointer;
    margin-top: 12px;
`