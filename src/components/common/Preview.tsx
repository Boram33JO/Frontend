import React, { useState } from 'react'
import { styled } from 'styled-components';
import { Song } from '../../models/post';
import spotify from '../../assets/images/spotify/Spotify_Logo_RGB_White.svg'
import external from '../../assets/images/external.svg'
import { ReactComponent as NoPreviewImage } from "../../assets/images/no_preview.svg"

interface Props {
    url: string;
    song: Song;
    setPreview: any;
}

const Preview = ({ url, song, setPreview }: Props) => {
    const handleClickBackground = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(false)
    }

    return (
        <>
            <ModalBackground onClick={handleClickBackground} />
            <ModalContainer>
                <ModalContent>
                    <ModalContentTop>
                        <Icon src={spotify} alt="spotify" />
                    </ModalContentTop>
                    <PlaylistItem key={song.id} onClick={() => { window.open(song.externalUrl) }}>
                        <PlaylistLeft>
                            <MusicThumbnail src={song.thumbnail} alt="thumbnail" />
                            <MusicInfo>
                                <StP $color={"#FAFAFA"} $size={"16px"}>
                                    {song.songTitle}
                                </StP>
                                <StP $color={"#A6A3AF"} $size={"14px"}>
                                    {song.artistName}
                                </StP>
                            </MusicInfo>
                        </PlaylistLeft>
                        <Icon src={external} alt="external" $height='20px' />
                    </PlaylistItem>
                </ModalContent>
                {url ? (<StIframe title="External Content" src={url} />) : <NoPreview><NoPreviewImage /><NoPreviewMessage>해당 곡은 미리듣기가 제공되지 않습니다.</NoPreviewMessage></NoPreview>}
            </ModalContainer>
        </>
    )
}

export default Preview

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
    width: 100vh;
    height: 100vh;
    background-color: black;
    opacity: 0.7;
`

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 340px;
    transform: translateX(-50%) translateY(-50%);
    z-index: 10;
    background-color: #2A282C;
    color: #FAFAFA;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
    gap: 14px;
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 14px;
`

const ModalContentTop = styled.div`
    display: flex;
    justify-content: flex-start;
`

const PlaylistItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
    gap: 10px;
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
    color: ${(props) => props.$color};
    font-size: ${(props) => props.$size};
    font-weight: 600;
    line-height: calc(150%);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
`

const StIframe = styled.iframe`
    border-radius: 10px;
    box-sizing: border-box;
`

const NoPreview = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 150px;
    gap: 10px;
`

const NoPreviewMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Icon = styled.img<{ $height?: string }>`
    height: ${(props) => props.$height || "24px"};
`