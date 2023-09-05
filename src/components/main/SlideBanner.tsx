import { useState, useEffect, useRef } from 'react'
import { styled } from 'styled-components';
import { ReactComponent as Play } from '../../assets/images/onboard/01_play.svg'
import { ReactComponent as Pause } from '../../assets/images/onboard/02_pause.svg'
import { ReactComponent as Left } from '../../assets/images/onboard/03_left.svg'
import { ReactComponent as Right } from '../../assets/images/onboard/04_right.svg'
import onboard1 from '../../assets/images/onboard/05_onboard_01.svg'
import onboard2 from '../../assets/images/onboard/06_onboard_02.svg'
import onboard3 from '../../assets/images/onboard/07_onboard_03.svg'

export interface BannerItem {
    id: number;
    image: string;
    position: string;
    comment1: string;
    comment2: string;
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
            position: "0%",
            comment1: "언제 어디서든 모두들\nP.Ple 하는 중",
            comment2: "피플에서 함께 나누는 피플러들의 감성"
        },
        {
            id: 1,
            image: onboard2,
            position: "100%",
            comment1: "감성이 가득한 장소들을\nP.Ple에 모아모아",
            comment2: "그 때 그 감성 피플에서 함께 공유해 주세요!"
        },
        {
            id: 2,
            image: onboard3,
            position: "200%",
            comment1: "스포티파이와 함께하는\nP.Ple의 감성 플리",
            comment2: "다양한 음악들을 감상해 보세요!"
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
                            <Banner key={item.id} $url={item.image} $position={item.position}>
                                <BannerImage data={item.image} aria-label="onboard" />
                                <BannerComment>
                                    <P $size="22px">{item.comment1}</P>
                                    <P>{item.comment2}</P>
                                </BannerComment>
                            </Banner>
                        )
                    })
                }
            </SlideContainer>
            <Navigation>
                <NavigationButton onClick={handlePrevSlideButton} type="button" aria-label="slideLeft">
                    <Left />
                </NavigationButton>
                <PlayToggleButton onClick={handlePlayToggleButton}>
                    {
                        (play) ? <Pause /> : <Play />
                    }
                </PlayToggleButton>
                <BulletButton>
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
                </BulletButton>
                <NavigationButton onClick={handleNextSlideButton} type="button" aria-label="slideRight">
                    <Right />
                </NavigationButton>
            </Navigation>
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
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: calc(100% * 2 / 3);
`

const Banner = styled.div<{ $url: string, $position: string }>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: ${(props) => props.$position};
`

const BannerImage = styled.object`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    pointer-events: none;
`

const BannerComment = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;

    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 26px 20px;
    gap: 10px;
`

const P = styled.p< { $size?: string, $color?: string } >`
    color: ${props => props.$color ? props.$color : "#FAFAFA"};
    font-size: ${(props) => props.$size ? props.$size : "14px"};
    font-weight: 600;
    line-height: calc(130%);
    /* line-height: calc(100% + 6px); */
    white-space: pre-wrap; 
`

const Navigation = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 18px;
    right: 20px;
    bottom: 26px;
`

const NavigationButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 30px;
    cursor: pointer;
    z-index: 2px;
    &:hover{
        opacity: 0.7;
    }
`

const BulletButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    gap: 8px;
    padding: 0px 8px;
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
    width: 24px;
    height: 30px;
    cursor: pointer;
`