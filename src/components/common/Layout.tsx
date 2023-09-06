import Header from './Header'
import Footer from './Footer'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Side from './Side'
import { throttle } from '../../utils/common'
import { ReactComponent as Post } from '../../assets/images/floating_post.svg'
import { ReactComponent as Top } from '../../assets/images/floating_top.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/config/configStore'
import logo from '../../assets/images/logo_text.svg'
import background from '../../assets/images/background.svg'

// Context API를 통해 MiddleRef를 전역으로 사용
const MiddleRefContext = createContext<React.RefObject<HTMLDivElement> | undefined>(undefined);

export const useMiddleRef = () => {
    return useContext(MiddleRefContext);
};

const Layout = () => {
    const [sideOpen, setSideOpen] = useState<boolean>(false);
    const innerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const middleRef = useRef<HTMLDivElement>(null);
    const outletRef = useRef<HTMLDivElement>(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const LoginUser = useSelector((state: RootState) => state.user);

    const handleScrollTop = () => {
        if (middleRef.current) {
            middleRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const sideRender = () => {
        let path = ["edit", "login", "signup"]
        const isInclude = path.some(i => window.location.href.includes(i));
        return isInclude;
    }

    // Progress 바
    useEffect(() => {
        if (progressRef.current) progressRef.current.style.width = `0%`;
        const handleScroll = throttle(() => {
            if (middleRef.current && outletRef.current && progressRef.current && innerRef.current) {
                const scrollTop = middleRef.current.scrollTop;
                const progress = (scrollTop / (outletRef.current.scrollHeight - middleRef.current.clientHeight)) * 100;
                progressRef.current.style.width = `${progress}%`;
            }
        }, 100);

        if (middleRef.current) {
            middleRef.current.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (middleRef.current) {
                middleRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (middleRef.current) {
            middleRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (progressRef.current) {
            progressRef.current.style.width = `0%`;
        }
    }, [location.pathname]);

    return (
        <Container>
            <Background>
                <BackgroundTop>
                    <LogoObject data={logo} aria-label="logo" />
                    <BackgroundContent>
                        오늘은 어디서 어떤 음악을 들었나요?<br />우리 같이 들을까요?
                    </BackgroundContent>
                </BackgroundTop>
                <BackgroundImage data={background} aria-label="bg-object" />
            </Background>
            <InnerContainer ref={innerRef}>
                <Header setSideOpen={setSideOpen} handleScrollTop={handleScrollTop} />
                <ProgressBar ref={progressRef}></ProgressBar>
                <MiddleRefContext.Provider value={middleRef}>
                    <Middle ref={middleRef}>
                        <OutletContainer ref={outletRef}>
                            <Outlet />
                        </OutletContainer>
                    </Middle>
                </MiddleRefContext.Provider>
                {/* <Footer /> */}
                <Left $open={sideOpen}>
                    <Side
                        sideOpen={sideOpen}
                        setSideOpen={setSideOpen}
                    />
                </Left>
                {
                    (!sideRender()) && (
                        <Right>
                            {LoginUser.isLogin && !!!id && <PostButton onClick={() => navigate(`/edit`)}><StPost /></PostButton>}
                            {!!!id && <TopButton onClick={handleScrollTop}><StTop /></TopButton>}
                        </Right>
                    )
                }
            </InnerContainer>
        </Container>
    );
};

export default Layout;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;    
    box-sizing: border-box;
    padding: 0px 260px;
    background: linear-gradient(288deg, #8285F4 -0.46%, #C28FEE 97.39%);

    @media (max-width: 1000px) {
        padding: 0;    
        justify-content: center;
    }
`

const Background = styled.div`
    position: absolute;
    left: 200px;
    bottom: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    min-height: 900px;
    height: 100%;

    box-sizing: border-box;
    padding-top: 200px;
    user-select: none;
    @media (max-width: 1300px) { opacity: 0; }
`

const BackgroundTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
`

const BackgroundContent = styled.div`
    color: #FAFAFA;
    font-size: 24px;
    font-weight: 600;
`

const LogoObject = styled.object`
    height: 80px;
`

const BackgroundImage = styled.object`
    pointer-events: none;
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
`;

const ProgressBar = styled.div`
    position: absolute;
    left: 0;
    top: 60px;
    z-index: 3;
    height: 3px;
    width: 100%;
    transition: width 0.2s;
    background-color: #7462e2;

    @media (max-width: 480px) {
        position: fixed;
    }
`;

const Middle = styled.div`
    width: 100%;
    height: calc(100% - 60px);
    overflow-y: scroll;
    box-sizing: border-box;

    &::-webkit-scrollbar {
        width: 0px;
    }

    @media (max-width: 480px) {
        margin-top: 60px;
    }
`;

const OutletContainer = styled.div`
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding-bottom: 50px;
`;

const Left = styled.div<{ $open: boolean }>`
    position: absolute;
    width: inherit;
    height: 100%;
    max-height: 900px;

    overflow: hidden;
    top: 0;
    z-index: 5;
    visibility: ${(props) => (props.$open ? "visible" : "hidden")};

    @media (max-width: 480px) {
        height: 100%;
        max-height: 100%;
    }
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;

    position: absolute;
    right: 5%;
    bottom: 5%;

    background-color: transparent;
    z-index: 4;

    gap: 10px;

    @media (max-width: 480px) {
        position: fixed;
        right: 5%;
        bottom: 5%;
    }
`;

const PostButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #B09FF5;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);

    cursor: pointer;
`;

const TopButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;
    background-color: #45424E;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    cursor: pointer;
`;

const StPost = styled(Post)`
    width: 22px;
    height: 22px;
`

const StTop = styled(Top)`
    width: 18px;
    height: 18px;
`;
