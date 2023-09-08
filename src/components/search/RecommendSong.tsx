import React, { useState } from "react";
import styled from "styled-components";
import Preview from "../common/Preview";

import spotify from "../../assets/images/spotify/Spotify_Icon_RGB_White.svg";

interface SearchProps {
    topSongs: any;
    categoryNum: any;
}

const RecommendSong: React.FC<SearchProps> = ({ topSongs, categoryNum }) => {
    const [songIndex, setSongIndex] = useState(0);
    const [preview, setPreview] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickListItem = (index: number) => {
        setSongIndex(index);
        setPreview(true);
    };

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };
    return (
        <Container>
            <InnerContainer>
                {topSongs &&
                    topSongs.length > 0 &&
                    topSongs
                        .filter((item: any) => item.category === categoryNum + 1)
                        .map((item: any) => (
                            <div key={item.id}>
                                <TitleSectionSub>
                                    <Balloon $isOpen={isOpen}>음악 선택 시 스포티파이 미리듣기가 제공됩니다.</Balloon>
                                    <StP
                                        $color="#A19FAB"
                                        style={{ cursor: "pointer", userSelect: "none" }}
                                        onClick={handleButtonClick}
                                    ></StP>
                                </TitleSectionSub>
                                <ContentSection>
                                    <Playlist>
                                        {item.songResponseDtos.map((song: any, index: number) => (
                                            <PlaylistItem
                                                key={song.id}
                                                onClick={() => {
                                                    handleClickListItem(index);
                                                }}
                                            >
                                                <PlaylistItemLeft>
                                                    <MusicThumbnail
                                                        src={song.thumbnail}
                                                        alt="albumArt"
                                                    />
                                                    <MusicInfo>
                                                        <div>{song.songTitle}</div>
                                                        <span>{song.artistName}</span>
                                                    </MusicInfo>
                                                </PlaylistItemLeft>
                                                <SpotifyIcon
                                                    src={spotify}
                                                    alt="spotify"
                                                />
                                            </PlaylistItem>
                                        ))}
                                    </Playlist>
                                </ContentSection>
                                {preview && (
                                    <Preview
                                        url={item.songResponseDtos[songIndex].audioUrl}
                                        song={item.songResponseDtos[songIndex]}
                                        setPreview={setPreview}
                                    />
                                )}
                            </div>
                        ))}
            </InnerContainer>
        </Container>
    );
};
export default RecommendSong;

const Container = styled.div`
    display: block;
`;

const InnerContainer = styled.div``;

const ContentSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TitleSectionSub = styled.div`
    position: relative;
    color: #e7e6f0;
    font-size: 14px;
    line-height: 16px;
`;

const Balloon = styled.div<{ $isOpen?: boolean }>`
    position: absolute;
    width: 140px;
    height: 44px;
    background-color: #342e3c;
    border: 1px solid #7b7190;
    border-radius: 3px;
    top: -60px;
    right: 0;

    color: #dbdbe3;
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;

    box-sizing: border-box;
    padding: 5px 10px;
    margin-bottom: 8px;
    visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};

    &:after {
        content: "";
        display: block;
        position: absolute;
        border-style: solid;
        border-width: 8px 8px 0px 0px;
        border-color: #342e3c transparent;
        width: 0;
        z-index: 1;
        bottom: -5.5px;
        right: 7px;
    }

    &:before {
        content: "";
        display: block;
        position: absolute;
        border-style: solid;
        border-width: 8px 8px 0px 0px;
        border-color: #7b7190 transparent;
        width: 0;
        z-index: 0;
        bottom: -8px;
        right: 8px;
    }
`;

const Playlist = styled.ol`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const PlaylistItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 26px;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

const PlaylistItemLeft = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 28px;
    width: 100%;
`;

const MusicThumbnail = styled.img`
    min-width: 76px;
    min-height: 76px;
    width: 76px;
    height: 76px;
`;

const MusicInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    div {
        color: #fafafa;
        font-size: 16px;
        font-weight: 500;
    }
    span {
        color: #a6a3af;
        font-size: 14px;
        font-weight: 500;
    }
`;

const StP = styled.p<{ $color?: string; $size?: string }>`
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
`;

const SpotifyIcon = styled.img`
    width: 24px;
    height: 24px;
`;
