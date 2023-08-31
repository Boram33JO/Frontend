import { keyframes, styled } from 'styled-components'

const RecommendSkeleton = () => {
    const dummy = Array.from({ length: 4 }, (_, i) => i);

    return (
        <Container>
            <InnerContainer>
                <TitleSection>
                    <SkeletonDiv $width={"187px"} $height={"26px"} />
                </TitleSection>
                <ContentSection>
                    <CategoryList>
                        {dummy.map((_, index) => { return <CategoryListItem key={index} /> })}
                    </CategoryList>
                    <Playlist>
                        {
                            dummy.map((_, index) => {
                                return (
                                    <PlaylistItem key={index} >
                                        <PlaylistItemLeft>
                                            <MusicThumbnail />
                                            <MusicRanking>
                                                <SkeletonDiv $width={"7px"} $height={"20px"} />
                                            </MusicRanking>
                                            <MusicInfo>
                                                <SkeletonDiv $width={"140px"} $height={"20px"} />
                                                <SkeletonDiv $width={"70px"} $height={"20px"} />
                                            </MusicInfo>
                                        </PlaylistItemLeft>
                                        <PlaylistItemRight>
                                            <SpotifyIcon />
                                        </PlaylistItemRight>
                                    </PlaylistItem>
                                )
                            })
                        }
                    </Playlist>
                </ContentSection>
            </InnerContainer>
            <TodayArea>
                <SkeletonDiv $width={"140px"} $height={"16px"} />
            </TodayArea>
        </Container>
    )
}

export default RecommendSkeleton

const loadingAnimation = keyframes`
    0% { opacity: 1 }
    50% { opacity: 0.5 }
    100% { opacity: 1 }
`

const Container = styled.div`
    display: block;

`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 40px 20px;

    background-color: #202020;
    gap: 16px;
`

const TitleSection = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`

const ContentSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const CategoryList = styled.div`
    display: flex;
    gap: 10px;
    box-sizing: border-box;
`

const CategoryListItem = styled.div`
    width: 50px;
    height: 32px;
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
        background: #515151;
        animation: ${loadingAnimation} 2s infinite ease-in-out;
    }
`

const SkeletonDiv = styled.div<{ $width?: string, $height?: string }>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;        
        background: #515151;
        animation: ${loadingAnimation} 2s infinite ease-in-out;
    }
`

const Playlist = styled.ol`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const PlaylistItem = styled.li`
    display: flex;
    align-items: center;
    gap: 28px;
`

const PlaylistItemLeft = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 28px;
    flex: 1 0 0;
`

const PlaylistItemRight = styled.div`
    flex: 0.1 0 0;   
`

const MusicThumbnail = styled.div`
    width: 76px;
    height: 76px;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;        
        background: #515151;
        animation: ${loadingAnimation} 2s infinite ease-in-out;
    }
`

const MusicRanking = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const MusicInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
`

const SpotifyIcon = styled.div`
    width: 24px;
    height: 24px;
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
        background: #515151;
        animation: ${loadingAnimation} 2s infinite ease-in-out;
    }
`

const TodayArea = styled.div`
    display: flex;
    justify-content: flex-end;

    color: #827E86;
    font-size: 14px;
    line-height: 16px;

    width: 100%;
    box-sizing: border-box;
    padding-top: 10px;
    padding-right: 20px;
`