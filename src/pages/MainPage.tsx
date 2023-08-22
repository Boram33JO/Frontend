import { styled } from 'styled-components'
import SlideBanner from '../components/main/SlideBanner'
import LookAround from '../components/main/LookAround'
import PopularPosts from '../components/main/PopularPosts'
import Recommend from '../components/main/Recommend'
import FamousPeople from '../components/main/FamousPeople'
import PostList from '../components/main/PostList'
import { ReactComponent as Edit } from '../assets/images/side/edit.svg'
import { ReactComponent as Top } from '../assets/images/top.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const MainPage = () => {
    const pathname = useLocation();
    const navigate = useNavigate();

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
            {/* <PostList /> */}
            <Post onClick={() => navigate(`/edit`)}><StEdit /></Post>
            <Test onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} ><StTop /></Test>
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

const Post = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: sticky;
    bottom: 110px;
    left: 90%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: gray;
    cursor: pointer;
    /* &:hover{
        * {
            fill: #141414;
            stroke: #141414
        }
    } */
`

const Test = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: sticky;
    bottom: 40px;
    left: 90%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: gray;
    cursor: pointer;
`

const StEdit = styled(Edit)`
    width: 30px;
    height: 30px;
`

const StTop = styled(Top)`
    width: 30px;
    height: 30px;
    path {
        fill: #FAFAFA;
        stroke: #FAFAFA;
    }
`