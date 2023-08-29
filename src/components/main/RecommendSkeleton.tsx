import { styled } from 'styled-components'

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
                                                <SkeletonDiv $width={"200px"} $height={"20px"} />
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
    background: #3B3A40;
    width: 50px;
    height: 32px;
    border-radius: 30px;
    
    box-sizing: border-box;

    cursor: pointer;
`

const SkeletonDiv = styled.div<{ $width?: string, $height?: string }>`
    background-color: #3B3A40;
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
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
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
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
    background-color: #3B3A40;
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
    background-color: #3B3A40;
    border-radius: 50%;
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