import React from "react";
import styled from "styled-components";
import { ReactComponent as Spotify } from "../../assets/images/spotify/Spotify_Icon_RGB_White.svg";

interface SearchProps {
    topSongs: any;
    categoryNum: any;
}

const RecommendSong: React.FC<SearchProps> = ({ topSongs, categoryNum }) => {
    const onClickExternalLink = (externalUrl: string) => {
        window.location.href = externalUrl;
    };

    return (
        <>
            {topSongs &&
                topSongs.length > 0 &&
                topSongs
                    .filter((item: any) => item.category === categoryNum + 1)
                    .map((item: any) =>
                        item.songResponseDtos.map((song: any, index: number) => (
                            <StSongList
                                key={index}
                                onClick={() => onClickExternalLink(song.externalUrl)}
                            >
                                <StSongListLeft>
                                    <img
                                        src={song.thumbnail}
                                        alt="imagedd"
                                    />
                                    <StSongListInfo>
                                        <h3>{song.songTitle}</h3>
                                        <div>{song.artistName}</div>
                                    </StSongListInfo>
                                </StSongListLeft>
                                <Spotify style={{ width: "24px" }} />
                            </StSongList>
                        ))
                    )}
        </>
    );
};

export default RecommendSong;

const StSongList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: #fafafa;
    margin-bottom: 14px;
    cursor: pointer;

    h3 {
        width: 100%;
        font-size: 16px;
        font-weight: 500;
        line-height: 120%;
        color: #fafafa;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }
    div {
        width: 100%;
        font-size: 14px;
        text-align: start;
        color: #a6a3af;
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }

    img {
        width: 76px;
        height: 76px;
        /* background: var(--iu-1, url(<path-to-image>), lightgray 50% / cover no-repeat); */
    }
`;

const StSongListLeft = styled.div`
    width: 70%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const StSongListInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 156px;
`;
