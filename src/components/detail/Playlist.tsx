import { styled } from "styled-components"
import spotify from '../../assets/images/Spotify_Icon_RGB_White.png'
import Preview from "../common/Preview"
import { useState } from "react"
import { Song } from "../../models/post"

interface Songs {
    songs: Song[]
}

const Playlist: React.FC<Songs> = ({ songs }) => {
    const [songIndex, setSongIndex] = useState(0);
    const [preview, setPreview] = useState(false);
    const handleClickListItem = (index: number) => {
        setSongIndex(index);
        setPreview(true);
    }
    return (
        <PlaylistContainer>
            <PlaylistSection>
                {songs.map((song, index) => {
                    return (
                        <PlaylistItem key={song.id} onClick={() => { handleClickListItem(index) }}>
                            <PlaylistLeft>
                                <MusicThumbnail src={song.thumbnail} />
                                <MusicInfo>
                                    <StP $color={"#FAFAFA"} $size={"16px"}>
                                        {song.songTitle}
                                    </StP>
                                    <StP $color={"#A6A3AF"} $size={"14px"}>
                                        {song.artistName}
                                    </StP>
                                </MusicInfo>
                            </PlaylistLeft>
                            <SpotifyIcon src={spotify} />
                        </PlaylistItem>
                    )
                })}
                {preview && <Preview url={songs[songIndex].audioUrl} song={songs[songIndex]} setPreview={setPreview} />}
            </PlaylistSection>
        </PlaylistContainer>
    )
}

export default Playlist

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
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`

const PlaylistLeft = styled.div`
    display: inline-flex;
    gap: 10px;
`

const MusicThumbnail = styled.img`
    width: 42px;
    height: 42px;
`

const MusicInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const StP = styled.p<{ $color: string, $size: string }>`
    font-family: "Pretendard";
    color: ${(props) => props.$color};
    font-size: ${(props) => props.$size};
    font-weight: 600;
    line-height: calc(100% + 2px);
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
    margin-left: 10px;
`

const SvgIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
`