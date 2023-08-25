import Header from './Header'
import Footer from './Footer'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Side from './Side'
import { throttle } from '../../utils/common'
import { ReactComponent as Post } from '../../assets/images/floating_post.svg'
import { ReactComponent as Top } from '../../assets/images/floating_top.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/config/configStore'

// Context API를 통해 MiddleRef를 전역으로 사용
const MiddleRefContext = createContext<React.RefObject<HTMLDivElement> | undefined>(undefined);

export const useMiddleRef = () => {
    return useContext(MiddleRefContext);
};

const Layout = () => {
    const [sideOpen, setSideOpen] = useState<boolean>(false);
    const progressRef = useRef<HTMLDivElement>(null);
    const middleRef = useRef<HTMLDivElement>(null);
    const outletRef = useRef<HTMLDivElement>(null);
    const { id } = useParams();

    const navigate = useNavigate();
    const LoginUser = useSelector((state: RootState) => state.user);

    // Progress 바
    useEffect(() => {
        if (progressRef.current) progressRef.current.style.width = `0%`;
        const handleScroll = throttle(() => {
            if (middleRef.current && outletRef.current && progressRef.current) {
                const scrollTop = middleRef.current.scrollTop;
                const progress = (scrollTop / (outletRef.current.scrollHeight - document.documentElement.clientHeight)) * 100;
                progressRef.current.style.width = `${progress}%`;
            }
        }, 100);

        if (middleRef.current) { middleRef.current.addEventListener('scroll', handleScroll); }
        return () => { if (middleRef.current) { middleRef.current.removeEventListener('scroll', handleScroll); } }
    }, [])

    return (
        <Container>
            <InnerContainer>
                <Header setSideOpen={setSideOpen} />
                <ProgressBar ref={progressRef}></ProgressBar>
                <MiddleRefContext.Provider value={middleRef}>
                    <Middle ref={middleRef}>
                        <OutletContainer ref={outletRef}>
                            <Outlet />
                        </OutletContainer>
                    </Middle>
                </MiddleRefContext.Provider>
                {/* <Footer /> */}
                <Left $open={sideOpen} >
                    <Side sideOpen={sideOpen} setSideOpen={setSideOpen} />
                </Left>
                <Right>
                    {LoginUser.isLogin && !!!id && <PostButton onClick={() => navigate(`/edit`)}><StPost /></PostButton>}
                    {!!!id && <TopButton onClick={() => { middleRef.current?.scrollTo({ top: 0, behavior: 'smooth' }) }} ><StTop /></TopButton>}
                </Right>
            </InnerContainer>
        </Container>
    )
}

export default Layout

const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 1920px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

const InnerContainer = styled.div`
    position: relative;
    width: 480px;
    height: 100vh;
    max-height: 900px;
    overflow: hidden;
    box-shadow: none;
    box-sizing: border-box;
    background-color: #141414;

    @media (max-width: 480px) {
        min-width: 390px;
        width: 100%;
        height: 100%;
        max-height: 100%;
    }
`

const ProgressBar = styled.div`
    position: absolute;
    left: 0;
    top: 50px;
    z-index: 3;
    height: 3px;
    width: 100%;
    transition: width .2s;
    background-color: #7462E2;
`

const Middle = styled.div`
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: scroll;
    
    &::-webkit-scrollbar {
        width: 0px;
    }
`

const OutletContainer = styled.div`
    width: 100%;
    height: auto;
`

const Left = styled.div<{ $open: boolean }>`
    position: absolute;
    width: inherit;
    height: 100%;
    max-height: 900px;
    
    overflow: hidden;
    top: 0;
    z-index: 4;
    visibility: ${(props) => (props.$open ? "visible" : "hidden")};
    
    @media (max-width: 480px) {
        height: 100%;
        max-height: 100%;
    }
`

const Right = styled.div`
    display: flex;
    flex-direction: column;

    position: absolute;
    right: 20px;
    bottom: 10px;

    background-color: transparent;
    z-index: 3;

    gap: 10px;
`

const PostButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    bottom: 110px;
    left: 90%;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #A08DEC;
    cursor: pointer;
`

const TopButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    bottom: 40px;
    left: 90%;
    width: 44px;
    height: 44px;
    background-color: #45424E;
    border-radius: 50%;
    box-sizing: border-box;
    cursor: pointer;
`

const StPost = styled(Post)`
    width: 22px;
    height: 22px;
`

const StTop = styled(Top)`
    width: 22px;
    height: 22px;
    path {
        stroke: #A6A3AF;
    }
`