import { useState, useEffect, useRef } from 'react'
import { styled } from 'styled-components';
import { ReactComponent as Left } from '../../assets/images/onboard/onboard_left.svg'
import { ReactComponent as Right } from '../../assets/images/onboard/onboard_right.svg'
import { ReactComponent as Play } from '../../assets/images/onboard/onboard_play.svg'
import { ReactComponent as Pause } from '../../assets/images/onboard/onboard_pause.svg'
import onboard1 from '../../assets/images/onboard/onboard_1.svg'
import onboard2 from '../../assets/images/onboard/onboard_2.svg'
import onboard3 from '../../assets/images/onboard/onboard_3.svg'

interface BannerItem {
    id: number;
    image: string;
    comment: string;
}

const SlideBanner = () => {
    const [play, setPlay] = useState<boolean>(true);
    const [slideNum, setSlideNum] = useState<number>(0);
    const [currentTimerId, setCurrentTimerId] = useState<NodeJS.Timeout | null>(null);
    const slideRef = useRef<HTMLDivElement>(null);
    const banners: BannerItem[] = [
        {
            id: 0,
            image: onboard1,
            comment: "피플은 장소 기반의\n음악 공유 플랫폼 이에요!"
        },
        {
            id: 1,
            image: onboard2,
            comment: "장소를 탐색하고, 피플러들의\n포스팅을 구경하세요!"
        },
        {
            id: 2,
            image: onboard3,
            comment: "피플의 음악 검색으로\n빠르게 플리를 공유해 보세요!"
        },
    ]
    const totalSlides = banners.length - 1;

    const handleNextSlideButton = () => {
        setSlideNum(slideNum >= totalSlides ? 0 : slideNum + 1);
        if (currentTimerId) clearTimeout(currentTimerId);
    };

    const handlePrevSlideButton = () => {
        setSlideNum(slideNum === 0 ? totalSlides : slideNum - 1);
        if (currentTimerId) clearTimeout(currentTimerId);
    }

    const handleMoveSlideButton = (num: number) => {
        setSlideNum(num);
        if (currentTimerId) clearTimeout(currentTimerId);
    }

    const handlePlayToggleButton = () => {
        setPlay(!play);
        if (currentTimerId) clearTimeout(currentTimerId);
    }

    useEffect(() => {
        if (play) {
            const timer = setTimeout(() => handleNextSlideButton(), 3000);
            setCurrentTimerId(timer);
        }
        if (slideRef.current) {
            slideRef.current.style.transition = "all 0.5s ease-in-out";
            slideRef.current.style.transform = `translateX(-${slideNum}00%`;
        }
    }, [play, slideNum])

    return (
        <Container>
            <SlideContainer ref={slideRef}>
                {
                    banners.map(item => {
                        return (
                            <Banner key={item.id} $url={item.image}>
                                <BannerContent>
                                    <H3>
                                        {item.comment}
                                    </H3>
                                </BannerContent>
                            </Banner>
                        )
                    })
                }
            </SlideContainer>
            <Navigation>
                <NavigationButton onClick={handlePrevSlideButton}>
                    <Left />
                </NavigationButton>
                <NavigationButton onClick={handleNextSlideButton}>
                    <Right />
                </NavigationButton>
            </Navigation>
            <Pagination>
                <PlayToggleButton onClick={handlePlayToggleButton}>
                    {
                        (play) ? <Pause /> : <Play />
                    }
                </PlayToggleButton>
                {
                    banners.map(item => {
                        return (
                            <Bullet
                                key={item.id}
                                $current={(slideNum === (item.id))}
                                onClick={() => handleMoveSlideButton(item.id)}
                            />
                        )
                    })
                }
            </Pagination>
        </Container>
    )
}

export default SlideBanner

const Container = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
`

const SlideContainer = styled.div`
    width: 100%;
    display: flex;
`

const Banner = styled.div<{ $url: string }>`
    flex: 0 0 auto;
    width: 390px;
    height: 260px;
    background: url(${(props) => props.$url});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top;
`

const BannerContent = styled.div`
    display: flex;
    align-items: flex-end;
    position: relative;

    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(197, 197, 197, 0.0) 0%, #141414 100%);
    box-sizing: border-box;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: 26px;
    font-weight: 600;
    white-space: pre-wrap;
    position: absolute;
    left: 5%;
    bottom: 20%;
`

const Navigation = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: border-box;
    padding: 10px;
`

const NavigationButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
    
    &:hover{
        opacity: 0.7;
    }
`

const Pagination = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    right: 5%;
    bottom: 20%;
    gap: 8px;
`

const Bullet = styled.label<{ $current: boolean }>`
    display: inline-block;
    border-radius: 50%;
    background-color: ${(props) => props.$current ? "#FFFFFF" : "#7D778A"};
    width: 6px;
    height: 6px;
    cursor: pointer;
`

const PlayToggleButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    cursor: pointer;
`