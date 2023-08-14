import { useState } from 'react'
import { styled } from 'styled-components'
import { getDateNotation } from '../../utils/common'
import spotify from '../../assets/images/Spotify_Icon_RGB_White.png'
import { useQuery } from 'react-query'
import { getPopularSongs } from '../../api/post'
import { Song } from '../../models/post'
import Category from '../common/Category'

const Recommend = () => {
    const [categoryNum, setCategoryNum] = useState<number>(0);
    const { data, isLoading, isError } = useQuery(["recommend"],
        async () => {
            const response = await getPopularSongs();
            console.log(response.data);
            return response.data;
        }
    )

    if (isLoading) {
        return <div>Loading...</div>
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
                        <Balloon>
                            음악 선택 시 스포티파이로 이동합니다.
                        </Balloon>
                        피플의 플리
                    </TitleSectionSub>
                </TitleSection>
                <Category categoryNum={categoryNum} setCategoryNum={setCategoryNum} />
                <Playlist>
                    {
                        data[categoryNum].songResponseDtos.map((song: Song, index: number) => {
                            return (
                                <PlaylistItem key={song.id} onClick={() => window.open(`${song.externalUrl}`)}>
                                    <PlaylistItemLeft>
                                        <MusicThumbnail src={song.thumbnail} />
                                        <MusicRanking>
                                            <StP $color={"#FFFFFF"} $size={"16px"}>
                                                {index + 1}
                                            </StP>
                                        </MusicRanking>
                                        <MusicInfo>
                                            <StP $color={"#FAFAFA"} $size={"16px"}>
                                                {song.songTitle}
                                            </StP>
                                            <StP $color={"#A6A3AF"} $size={"14px"}>
                                                {song.artistName}
                                            </StP>
                                        </MusicInfo>
                                    </PlaylistItemLeft>
                                    <PlaylistItemRight>
                                        <SpotifyIcon src={spotify} />
                                    </PlaylistItemRight>
                                </PlaylistItem>
                            )
                        })
                    }
                </Playlist>
            </InnerContainer>
            <TodayArea>
                {getDateNotation()} 기준 업데이트
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
    gap: 20px;
`

const TitleSection = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`

const TitleSectionSub = styled.div`
    position: relative;
    color: #E7E6F0;
    font-size: 14px;
    line-height: 16px;
`

const Balloon = styled.div`
    position: absolute;
    width: 150px;
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
    line-height: 24px;
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
`

const StP = styled.p<{ $color: string, $size: string }>`
    color: ${(props) => props.$color};
    font-size: ${(props) => props.$size};
    line-height: calc(100% + 2px);
    word-break: break-all;

    & {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
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