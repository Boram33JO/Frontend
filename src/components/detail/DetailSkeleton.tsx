import { keyframes, styled } from "styled-components"
import { ReactComponent as Like } from '../../assets/images/like.svg'

const DetailSkeleton = () => {
    return (
        <>
            <DetailContainer>
                <ProfileSection>
                    <ProfileArea>
                        <IconContainer $width='30px' $height='30px' $color="#414141" />
                        <ProfileInfo>
                            <SkeletonDiv $width='60px' $height='22px' />
                        </ProfileInfo>
                    </ProfileArea>
                    <FollowBtn />
                </ProfileSection>
                <TitleSection>
                    <SkeletonDiv $width='150px' $height='24px' />
                    <TitleSub>
                        <TitleSubLeft>
                            <SkeletonDiv $width='70px' $height='20px' />
                            <Divider />
                            <SkeletonDiv $width='50px' $height='20px' />
                        </TitleSubLeft>
                        <TitleSubRight>
                            <IconContainer $width='26px' $height='26px' $color="#414141" />
                            <LikeCount>
                                <SkeletonDiv $width='20px' $height='20px' />
                            </LikeCount>
                        </TitleSubRight>
                    </TitleSub>
                </TitleSection>
                <ContentSection>
                    <ContentContainer>
                        <SkeletonDiv $color="#55505B" $width='120px' $height='20px' />
                    </ContentContainer>
                </ContentSection>
                <LocationSection>
                    <LocationInfo>
                        <IconContainer $width='34px' $height='34px' />
                        <SkeletonDiv $color="#55505B" $width='120px' $height='20px' />
                    </LocationInfo>
                    <SkeletonDiv $color="#55505B" $width='30px' $height='20px' />
                </LocationSection>
            </DetailContainer>
            <PlaylistContainer>
                <PlaylistSection>
                    <PlaylistItem>
                        <PlaylistLeft>
                            <SkeletonDiv $color="#55505B" $width='42px' $height='42px' />
                            <MusicInfo>
                                <SkeletonDiv $color="#55505B" $width='100px' $height='16px' />
                                <SkeletonDiv $color="#55505B" $width='50px' $height='14px' />
                            </MusicInfo>
                        </PlaylistLeft>
                        <IconContainer $width='26px' $height='26px' />
                    </PlaylistItem>
                </PlaylistSection>
            </PlaylistContainer>
            <StyledHr />
            <SkeletonDiv style={{ marginLeft: '20px' }} $width='50px' $height='20px' />
        </>
    )
}

export default DetailSkeleton

const loadingAnimation = keyframes`
    0% {
        opacity: 1
    }
    50% {
        opacity: 0.5
    }
    100% {
        opacity: 1
    }
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: inherit;
    margin-top: 26px;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #141414;
    color: #FAFAFA;
    gap: 10px;
`

const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
    margin-bottom: 24px;
`

const ProfileArea = styled.div`
    display: flex;
    align-items: center;
    height: inherit;
    gap: 10px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
`

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
`

const FollowBtn = styled.div`
    width: 74px;
    height: 30px;
    border-radius: 30px;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;        
        background: #414141;
        animation: ${loadingAnimation} 2s infinite ease-in-out;
    }
`

const TitleSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    box-sizing: border-box;
    margin-bottom: 12px;
    gap: 7px;
`

const TitleSub = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 5px;
`

const TitleSubLeft = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const TitleSubRight = styled.div`
    display: flex;
    height: auto;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
`

const LikeCount = styled.div`
    display: flex;
    align-items: center;
`

const ContentSection = styled.div`
    display: block;
    height: auto;

    color: #D9D8DF;
    font-family: "Pretendard";
    font-size: 16px;
    line-height: 22px;

    background-color: #434047;
    border-radius: 6px;

    box-sizing: border-box;
    padding: 20px;
`

const ContentContainer = styled.div`
    height: 154px;
    white-space: pre-wrap;
    overflow: hidden; 
`

const LocationSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: #434047;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 10px 14px;
    margin: 2px 0px;
`

const LocationInfo = styled.div`
    display: flex;
    align-items: center;
    
    gap: 10px;
`

const IconContainer = styled.div<{ $width?: string, $height?: string, $color?: string }>`
    width: ${({ $width }) => $width || "20px"};
    height: ${({ $height }) => $height || "20px"};
    border-radius: 50%;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${({ $color }) => $color || "#55505B"};
        animation: ${loadingAnimation} 2s infinite ease-in-out;
    }
`

const Divider = styled.div`
    height: 12px;
    width: 1px;
    background-color: #414141;
    padding: 0;
`

const SkeletonDiv = styled.div<{ $color?: string, $width?: string, $height?: string }>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    box-sizing: border-box;    
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${({ $color }) => $color || "#414141"};
        animation: ${loadingAnimation} 2s infinite ease-in-out;
    }
`

const PlaylistContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: #141414;
    justify-content: center;
    box-sizing: border-box;
    padding: 0px 20px;
`

const PlaylistSection = styled.div`
    width: 100%;
    max-height: 182px;

    display: flex;
    flex-direction: column;
    background-color: #434047;
    border-radius: 6px;
    overflow-y: scroll;

    box-sizing: border-box;
    padding: 14px 20px;
    gap: 14px;

    &::-webkit-scrollbar {
        width: 6px;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #C6C6C6;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: #75717B;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-button:vertical:start:decrement,
    &::-webkit-scrollbar-button:vertical:end:decrement {
        display:block;
        height: 20px;
    }
`

const PlaylistItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const PlaylistLeft = styled.div`
    display: inline-flex;
    gap: 10px;
`

const MusicInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
`

const StyledHr = styled.hr`
    background-color: #242325;
    height: 8px;
    margin: 0;
    margin-top: 42px;
    margin-bottom: 20px;
    border: none;
`