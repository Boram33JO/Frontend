import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { BannerItem } from '../components/main/SlideBanner'
import { ReactComponent as Left } from '../assets/images/onboard/03_left.svg'
import { ReactComponent as Right } from '../assets/images/onboard/04_right.svg'
import onboard1 from '../assets/images/onboard/08_intro_onboard_01.svg'
import onboard2 from '../assets/images/onboard/09_intro_onboard_02.svg'
import { Navigate, useNavigate } from 'react-router-dom'

const IntroPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const navigate = useNavigate();
    const slideRef = useRef<HTMLDivElement>(null);
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

    const handleNextSlideButton = () => {
        if (currentPage < totalPage) setCurrentPage(current => current + 1);
    };

    const handlePrevSlideButton = () => {
        if (currentPage > 0) setCurrentPage(current => current - 1);
    }

    const handleMoveSlideButton = (num: number) => {
        setCurrentPage(num);
    }

    useEffect(() => {
        if (slideRef.current) {
            slideRef.current.style.transition = "all 0.5s ease-in-out";
            slideRef.current.style.transform = `translateX(-${currentPage}00%`;
        }
    }, [currentPage])

    return (
        <Container>
            <InnerContainer>
                <Header>
                    <P $size={true}>P.Ple</P>
                </Header>
                <Middle>
                    <SlideContainer ref={slideRef}>
                        <Banner>
                            {
                                banners.map(item => {
                                    return (
                                        <BannerContent key={item.id} $position={item.position}>
                                            <BannerImage $url={item.image} />
                                            <BannerComment>
                                                <P $size={true}>{item.comment1}</P>
                                                <P>{item.comment2}</P>
                                            </BannerComment>
                                        </BannerContent>
                                    )
                                })
                            }
                        </Banner>
                    </SlideContainer>
                    <NavigationButton type="button" $left="10px" aria-label="slideLeft" onClick={handlePrevSlideButton}><Left /></NavigationButton>
                    <NavigationButton type="button" $right="10px" aria-label="slideRight" onClick={handleNextSlideButton}><Right /></NavigationButton>
                    <Pagination>
                        {
                            banners.map(item => {
                                return (
                                    <Bullet
                                        key={item.id}
                                        $current={(item.id === currentPage)}
                                    />
                                )
                            })
                        }
                    </Pagination>
                </Middle>
                <ButtonSection>
                    {currentPage === 0
                        ? <>
                            <LoginButton onClick={handleNextSlideButton}>다음으로</LoginButton>
                            <Span />
                        </>
                        : <>
                            <LoginButton onClick={() => navigate(`/login`)}>로그인 / 회원가입</LoginButton>
                            <Span onClick={() => navigate(`/`)}>둘러보기</Span>
                        </>
                    }
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
`

const InnerContainer = styled.div`
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

    @media (max-width: 480px) {
        min-width: 390px;
        width: 100%;
        height: 100%;
        max-height: 100%;
    }
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    
    color: #FAFAFA;
`

const Middle = styled.div`
    display: flex;
    flex-direction: column;
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
    gap: 30px;
    padding: 0px 30px;
`

const BannerImage = styled.div<{ $url: string }>`
    width: 90%;
    height: 90%;
    background: url(${(props) => props.$url});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
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

const P = styled.p< { $size?: boolean, $color?: string } >`
    color: ${props => props.$color ? props.$color : "#FAFAFA"};
    font-size: ${(props) => props.$size ? "27px" : "17px"};
    font-weight: 600;
    line-height: calc(100% + 6px);
    text-align: center;
    white-space: pre-wrap;
    @media (max-width: 480px) {
        font-size: ${(props) => props.$size ? "5.6vw" : "3.56vw"};
    }
    @media (max-width: 390px) {
        font-size: ${(props) => props.$size ? "22px" : "14px"};
    }    
`

const NavigationButton = styled.button<{ $left?: string, $right?: string }>`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: ${(props) => props.$left};
    right: ${(props) => props.$right};
    width: 40px;
    height: 40px;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: border-box;
    cursor: pointer;
    
    &:hover{
        opacity: 0.7;
    }
`

const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 20px;
    gap: 8px;
    box-sizing: border-box;
    margin-top: 40px;
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
    height: 150px;
    transition: all 0.5s ease-in-out;

    box-sizing: border-box;
    padding: 30px 20px;
`

const LoginButton = styled.div<{ $visible?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 45px;
    background: linear-gradient(135deg, #8084F4, #C48FED);
    border-radius: 6px;
    color: #FAFAFA;
    transition: all 0.3s ease-in-out;
    /* opacity: ${(props) => props.$visible ? "1" : "0"};
    visibility: ${(props) => props.$visible ? "visible" : "hidden"}; */
    font-size: 17px;
    line-height: calc(100% +6px);
    font-weight: 600;
`

const Span = styled.span<{ $visible?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    color: #D9D8D3;
    transition: all 0.3s ease-in-out;
    /* opacity: ${(props) => props.$visible ? "1" : "0"};
    visibility: ${(props) => props.$visible ? "visible" : "hidden"}; */
    font-size: 17px;
    line-height: calc(100% +6px);
    font-weight: 500;
`