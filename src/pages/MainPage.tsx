import { styled } from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SlideBanner from '../components/main/SlideBanner'
import LookAround from '../components/main/LookAround'
import PopularPosts from '../components/main/PopularPosts'
import Recommend from '../components/main/Recommend'
import FamousPeople from '../components/main/FamousPeople'
import PostList from '../components/main/PostList'
import RecommendSkeleton from '../components/main/RecommendSkeleton'
import FamousPeopleSkeleton from '../components/main/FamousPeopleSkeleton'
import PostListSkeleton from '../components/main/PostListSkeleton'

const MainPage = () => {
    const navigate = useNavigate();
    const [renderRecommend, setRenderRecommend] = useState<boolean>(false);
    const [renderFamousPeople, setRenderFamousPeople] = useState<boolean>(false);
    const [renderPostList, setRenderPostList] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<boolean>(false);
    const recommendRef = useRef<HTMLDivElement>(null);
    const famousPeopleRef = useRef<HTMLDivElement>(null);
    const postListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setOpacity(true);
        const isVisited = Boolean(localStorage.getItem("visited"));
        if (!isVisited) {
            navigate("/intro");
        }
        localStorage.setItem("visited", "true")

        const options: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        };

        const recommendObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setRenderRecommend(true);
                recommendObserver.disconnect();
            }
        }, options);

        const famousPeopleObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setRenderFamousPeople(true);
                famousPeopleObserver.disconnect();
            }
        }, options);

        const postListObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setRenderPostList(true);
                postListObserver.disconnect();
            }
        }, options);

        if (recommendRef.current) recommendObserver.observe(recommendRef.current);
        if (famousPeopleRef.current) famousPeopleObserver.observe(famousPeopleRef.current);
        if (postListRef.current) postListObserver.observe(postListRef.current);

        return () => {
            recommendObserver.disconnect();
            famousPeopleObserver.disconnect();
            postListObserver.disconnect();
        };
    }, []);

    return (
        <Container $opacity={opacity}>
            <SlideBanner />
            <LookAround />
            <PopularPosts />
            <div ref={recommendRef}>{renderRecommend ? <Recommend /> : <RecommendSkeleton />}</div>
            <div ref={famousPeopleRef}>{renderFamousPeople ? <FamousPeople /> : <FamousPeopleSkeleton />}</div>
            <div ref={postListRef}>{renderPostList ? <PostList /> : <PostListSkeleton />}</div>
        </Container>
    )
}

export default MainPage

const Container = styled.div<{ $opacity?: boolean }>`
    display: flex;
    flex-direction: column;
    background-color: #141414;
    color: #FAFAFA;
    gap: 32px;
    transition: all 0.5s ease-in-out;
    opacity: ${({ $opacity }) => $opacity ? "1" : "0"}
`
