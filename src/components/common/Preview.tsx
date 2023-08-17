import React, { useState } from 'react'
import { styled } from 'styled-components';
import { Song } from '../../models/post';
import spotify from '../../assets/images/spotify/Spotify_Logo_RGB_White.svg'
import external from '../../assets/images/external.svg'

interface Props {
    url: string;
    song: Song;
    setPreview: any;
}

const Preview = ({ url, song, setPreview }: Props) => {
    return (
        <>
            <ModalBackground onClick={() => { setPreview(false) }} />
            <ModalContainer>
                <ModalContent>
                    <ModalContentTop>
                        <img src={spotify} style={{ height: "24px" }} alt="spotify" />
                    </ModalContentTop>
                    <PlaylistItem key={song.id} onClick={() => { window.open(song.externalUrl) }}>
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
                        <img src={external} style={{ height: "20px" }} alt="external" />
                    </PlaylistItem>
                </ModalContent>
                <iframe title="External Content" src={url} />
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
    z-index: 4;
    width: 100vh;
    height: 100vh;
    background-color: gray;
    opacity: 0.3;
`

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 5;
    background-color: black;
    color: #FAFAFA;
    border-radius: 25px;
    box-sizing: border-box;
    padding: 20px;
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: black;
    top: 20px;
    width: 100%;
    height: 85px;
    box-sizing: border-box;
    padding: 0px 20px;
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
    height: 24px;
`

const TestDiv = styled.div`
    position: absolute;
    background-color: #F1F3F4;
    right: 30px;
    bottom: 30px;
    width: 32px;
    height: 34px;
`