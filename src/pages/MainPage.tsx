import { styled } from 'styled-components'
import SlideBanner from '../components/main/SlideBanner'
import LookAround from '../components/main/LookAround'
import PopularPosts from '../components/main/PopularPosts'
import Recommend from '../components/main/Recommend'
import FamousPeople from '../components/main/FamousPeople'
import PostList from '../components/main/PostList'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const MainPage = () => {
    const pathname = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Container>
            <SlideBanner />
            <LookAround />
            <PopularPosts />
            <Recommend />
            <FamousPeople />
            <PostList />
        </Container>
    )
}

export default MainPage

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #141414;
    color: #FAFAFA;
    gap: 32px;
`