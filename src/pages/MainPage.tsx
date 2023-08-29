import { styled } from 'styled-components'
import SlideBanner from '../components/main/SlideBanner'
import LookAround from '../components/main/LookAround'
import PopularPosts from '../components/main/PopularPosts'
import Recommend from '../components/main/Recommend'
import FamousPeople from '../components/main/FamousPeople'
import PostList from '../components/main/PostList'
import { useEffect, useRef, useState } from 'react'

const MainPage = () => {
    const [renderRecommend, setRenderRecommend] = useState<boolean>(false);
    const [renderFamousPeople, setRenderFamousPeople] = useState<boolean>(false);
    const [renderPostList, setRenderPostList] = useState<boolean>(false);

    const recommendRef = useRef<HTMLDivElement>(null);
    const famousPeopleRef = useRef<HTMLDivElement>(null);
    const postListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
        <Container>
            <SlideBanner />
            <LookAround />
            <PopularPosts />
            <div ref={recommendRef}>{renderRecommend && <Recommend />}</div>
            <div ref={famousPeopleRef}>{renderFamousPeople && <FamousPeople />}</div>
            <div ref={postListRef}>{renderPostList && <PostList />}</div>
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