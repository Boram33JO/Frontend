import React from 'react'
import { styled } from 'styled-components'

interface Props {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const NotifyNavbar = ({ page, setPage }: Props) => {
    const navigation = ["좋아요", "댓글", "팔로우"]
    return (
        <Container>
            {
                navigation.map((item, index) => {
                    return (
                        <Navigation $clicked={page === index} key={index} onClick={() => setPage(index)}>
                            {item}
                        </Navigation>
                    )
                })
            }
        </Container>
    )
}

export default NotifyNavbar

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 44px;
    box-shadow: 0 -2px 0 0 #48474D inset;
    box-sizing: border-box;
    padding: 0px 20px;
`

const Navigation = styled.div<{ $clicked: boolean }>`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    box-shadow: 0 -2px 0 0 ${({ $clicked }) => $clicked ? "#8B87F4" : ""} inset;

    color: ${({ $clicked }) => $clicked ? "#FAFAFA" : "#48474D"};
    font-weight: 600;
    box-sizing: border-box;
    padding-bottom: 6px;
    width: 100%;

    cursor: pointer;
`