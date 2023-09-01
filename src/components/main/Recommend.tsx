import { useState } from 'react'
import { keyframes, styled } from 'styled-components'
import { getDateNotation } from '../../utils/common'
import spotify from '../../assets/images/spotify/Spotify_Icon_RGB_White.svg'
import { useQuery } from 'react-query'
import { getPopularSongs } from '../../api/post'
import { Song } from '../../models/post'
import Category from '../common/Category'
import Preview from '../common/Preview'
import RecommendSkeleton from './RecommendSkeleton'

const Recommend = () => {
    const [categoryNum, setCategoryNum] = useState<number>(0);
    const [songIndex, setSongIndex] = useState(0);
    const [preview, setPreview] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickListItem = (index: number) => {
        setSongIndex(index);
        setPreview(true);
    }

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    }

    const { data, isLoading, isError } = useQuery(["recommend"],
        async () => {
            const response = await getPopularSongs();
            // console.log("추천 플리 요청", response);
            return response.data;
        }
    )

    if (isLoading) {
        return <RecommendSkeleton />
    }

    if (isError) {
        return <div>Error...</div>
    }

    return (
        <Container>
            <InnerContainer>
                <TitleSection>
                    <H3>
                        어디서든 피플 추천 플리
                    </H3>
                    <TitleSectionSub>
                        <Balloon $isOpen={isOpen}>
                            음악 선택 시 스포티파이 미리듣기가 제공됩니다.
                        </Balloon>
                        <StP style={{ cursor: "pointer" }} onClick={handleButtonClick}>피플의 플리</StP>
                    </TitleSectionSub>
                </TitleSection>
                <ContentSection>
                    <Category categoryNum={categoryNum} setCategoryNum={setCategoryNum} />
                    <Playlist>
                        {
                            data[categoryNum].songResponseDtos.map((song: Song, index: number) => {
                                return (
                                    <PlaylistItem key={song.id} onClick={() => { handleClickListItem(index) }}>
                                        <PlaylistItemLeft>
                                            <MusicThumbnail src={song.thumbnail} alt="albumArt" />
                                            <MusicRanking>
                                                <StP $color={"#FFFFFF"} $size={"16px"}>
                                                    {index + 1}
                                                </StP>
                                            </MusicRanking>
                                            <MusicInfo>
                                                <StP $color={"#FAFAFA"} $size={"16px"}>
                                                    {song.songTitle}
                                                </StP>
                                                <StP $color={"#FAFAFA"} $size={"14px"}>
                                                    {song.artistName}
                                                </StP>
                                            </MusicInfo>
                                        </PlaylistItemLeft>
                                        <PlaylistItemRight>
                                            <SpotifyIcon src={spotify} alt="spotify" />
                                        </PlaylistItemRight>
                                    </PlaylistItem>
                                )
                            })
                        }
                    </Playlist>
                </ContentSection>
                {preview && <Preview url={data[categoryNum].songResponseDtos[songIndex].audioUrl} song={data[categoryNum].songResponseDtos[songIndex]} setPreview={setPreview} />}
            </InnerContainer>
            <TodayArea>
                실시간 업데이트
            </TodayArea>
        </Container>
    )
}

export default Recommend

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

const TitleSectionSub = styled.div`
    position: relative;
    color: #E7E6F0;
    font-size: 14px;
    line-height: 16px;
`

const Balloon = styled.div<{ $isOpen?: boolean }>`
    position: absolute;
    width: 140px;
    height: 44px;
    background-color: #342E3C;
    border: 1px solid #7B7190;
	border-radius: 3px;
    top: -60px;
    right: 0;

    color: #DBDBE3;
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;

    box-sizing: border-box;
    padding: 5px 10px;
    margin-bottom: 8px;
    visibility: ${(props) => props.$isOpen ? "visible" : "hidden"};

    &:after {
        content: '';
	    display: block;
	    position: absolute;
	    border-style: solid;
	    border-width: 8px 8px 0px 0px;
	    border-color: #342E3C transparent;
	    width: 0;
	    z-index: 1;
	    bottom: -5.5px; 
	    right: 7px; 
    }

    &:before 
	{
	    content: '';
	    display: block;
	    position: absolute;
	    border-style: solid;
	    border-width: 8px 8px 0px 0px;
	    border-color: #7B7190 transparent;
	    width: 0;
	    z-index: 0;
	    bottom: -8px;
	    right: 8px; 
	}
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: calc(150%);
    font-weight: 600;
`

const Playlist = styled.ol`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const PlaylistItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 26px;
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
    width: 100%;
`

const PlaylistItemRight = styled.div`

`

const MusicThumbnail = styled.img`
    width: 76px;
    height: 76px;
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
    width: 100%;
`

const StP = styled.p<{ $color?: string, $size?: string }>`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: pre-line;
    overflow: hidden;

    color: ${(props) => props.$color};
    font-size: ${(props) => props.$size};
    line-height: calc(150%);
    &::before {
        vertical-align: -0.25em;
    }
`

const SpotifyIcon = styled.img`
    width: 24px;
    height: 24px;
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