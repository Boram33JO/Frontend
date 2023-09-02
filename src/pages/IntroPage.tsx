import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { BannerItem } from '../components/main/SlideBanner'
import { useNavigate } from 'react-router-dom'
import onboard1 from '../assets/images/onboard/08_intro_onboard_01.svg'
import onboard2 from '../assets/images/onboard/09_intro_onboard_02.svg'

const IntroPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const navigate = useNavigate();
    const slideRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState<boolean>(false);
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0);

    const banners: BannerItem[] = [
        {
            id: 0,
            image: onboard1,
            position: "0%",
            comment1: "P.Ple은 장소 기반의 음악\n공유 플랫폼이에요!",
            comment2: "실제 장소를 검색하여 유저들의 포스팅을 구경하세요."
        },
        {
            id: 1,
            image: onboard2,
            position: "100%",
            comment1: "나만의 플레이리스트로\n그날의 감성을 공유해 보세요!",
            comment2: "나의 포스팅에 좋아하는 음악을 담을 수 있습니다."
        },
    ]
    const totalPage = banners.length - 1;

    // 페이지 이동
    const handleNextSlideButton = () => { if (currentPage < totalPage) setCurrentPage(current => current + 1); }
    const handlePrevSlideButton = () => { if (currentPage > 0) setCurrentPage(current => current - 1); }
    const handleMoveSlideButton = (num: number) => { setCurrentPage(num); }

    // 드래그 동작
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setStartX(e.nativeEvent.offsetX);
        // console.log("클릭 시작 X:", e.nativeEvent.offsetX);
    };
    const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setEndX(e.nativeEvent.offsetX);
        // console.log("클릭 끝　 X:", e.nativeEvent.offsetX);
    };
    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setStartX(e.changedTouches[0].pageX);
        // console.log("터치 시작 X:", e.changedTouches[0].pageX);
    }
    const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        setEndX(e.changedTouches[0].pageX);
        // console.log("터치 끝　 X:", e.changedTouches[0].pageX);
    }

    // 버튼 클릭
    const handleClickButton = () => {
        const dragSpaceX = Math.abs(startX - endX);
        if (dragSpaceX <= 70) {
            if (currentPage === 0) {
                handleNextSlideButton();
            } else {
                navigate('/login');
                setOpacity(false);
            }
        }
    }

    useEffect(() => { setOpacity(true) }, [])

    useEffect(() => {
        const dragSpaceX = Math.abs(startX - endX);
        if (startX !== 0 && dragSpaceX > 70) {
            if (endX < startX) {
                if (currentPage < totalPage) handleNextSlideButton();
            } else if (endX > startX) {
                if (currentPage > 0) handlePrevSlideButton();
            }
        }
    }, [endX])

    useEffect(() => {
        if (slideRef.current) {
            slideRef.current.style.transition = "all 0.5s ease-in-out";
            slideRef.current.style.transform = `translateX(-${currentPage}00%`;
        }
    }, [currentPage])

    return (
        <Container>
            <InnerContainer ref={containerRef} $opacity={opacity} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                <SlideContainer ref={slideRef}>
                    <Banner>
                        {
                            banners.map(item => {
                                return (
                                    <BannerContent key={item.id} $position={item.position}>
                                        <BannerImage data={item.image} aria-label="onboard" />
                                        <BannerComment>
                                            <P $big={true}>{item.comment1}</P>
                                            <P>{item.comment2}</P>
                                        </BannerComment>
                                    </BannerContent>
                                )
                            })
                        }
                    </Banner>
                </SlideContainer>
                <Pagination>
                    {banners.map(item => <Bullet key={item.id} $current={(item.id === currentPage)} onClick={() => handleMoveSlideButton(item.id)} />)}
                </Pagination>
                <ButtonSection>
                    <LoginButton $visible={currentPage === 0} onClick={handleClickButton}>
                        <ButtonP $visible={currentPage === 0}>다음으로</ButtonP>
                        <ButtonP $visible={currentPage === 1}>로그인 / 회원가입</ButtonP>
                    </LoginButton>
                    <Span $visible={currentPage === 1} onClick={() => navigate(`/`)}>둘러보기</Span>
                </ButtonSection>
            </InnerContainer>
        </Container>
    )
}

export default IntroPage

const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 1920px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    & > * {
        user-select: none;
    }
`

const InnerContainer = styled.div<{ $opacity?: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: relative;
    width: 480px;
    height: 100vh;
    max-height: 900px;
    overflow: hidden;
    box-shadow: none;
    box-sizing: border-box;
    background-color: #17054A;
    padding: 50px 0px;
    gap: 5%;
    transition: all 0.5s ease-in-out;
    opacity: ${(props) => props.$opacity ? "1" : "0"};

    @media (max-width: 480px) {
        min-width: 390px;
        width: 100%;
        height: 100%;
        max-height: 100%;
    }
`

const SlideContainer = styled.div`
    width: 100%;
    display: flex;
    transform: translateX(-0%);
`

const Banner = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 120%;
`

const BannerContent = styled.div<{ $position: string }>`
    display: flex;
    flex-direction: column;    
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%; 
    height: 100%;
    top: 0;
    left: ${(props) => props.$position};

    box-sizing: border-box;
    gap: 2vh;
    padding: 0px 30px;
`

const BannerImage = styled.object`
    width: 80%;
    height: 80%;
    pointer-events: none;
`

const BannerComment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: relative;

    width: 100%;
    box-sizing: border-box;
    gap: 10px;
`

const P = styled.p< { $big?: boolean, $color?: string } >`
    color: ${props => props.$color ? props.$color : "#FAFAFA"};
    font-size: ${(props) => props.$big ? "27px" : "17px"};
    font-weight: 600;
    line-height: calc(100% + 6px);
    text-align: center;
    white-space: pre-wrap;
    @media (max-width: 480px) {
        font-size: ${(props) => props.$big ? "5.6vw" : "3.56vw"};
    }
    @media (max-width: 390px) {
        font-size: ${(props) => props.$big ? "22px" : "14px"};
    }    
`

const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 8px;
    box-sizing: border-box;
`

const Bullet = styled.label<{ $current: boolean }>`
    display: inline-block;
    border-radius: 50%;
    background-color: ${(props) => props.$current ? "#FFFFFF" : "#7D778A"};
    width: 6px;
    height: 6px;
    cursor: pointer;
`

const ButtonSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in-out;

    box-sizing: border-box;
    padding: 0px 20px;
`

const LoginButton = styled.div<{ $visible?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 45px;
    background: linear-gradient(135deg, #8084F4, #C48FED);
    border-radius: 6px;
    cursor: pointer;
`

const ButtonP = styled.p<{ $visible?: boolean }>`
    position: absolute;
    color: #FAFAFA;
    font-size: 17px;
    line-height: calc(150%);
    font-weight: 600;

    transition: all 0.3s ease-in-out;
    opacity: ${(props) => props.$visible ? "1" : "0"};
    visibility: ${(props) => props.$visible ? "visible" : "hidden"};
`

const Span = styled.span<{ $visible?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;

    color: #D9D8D3;
    font-size: 17px;
    line-height: calc(150%);
    font-weight: 500;

    transition: all 0.3s ease-in-out;
    opacity: ${(props) => props.$visible ? "1" : "0"};
    visibility: ${(props) => props.$visible ? "visible" : "hidden"};

    cursor: pointer;
`
