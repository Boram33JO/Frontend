import React from "react";
import styled from "styled-components";
import { ReactComponent as Spotify } from "../../assets/images/spotify/Spotify_Icon_RGB_White.svg";

interface SearchProps {
    popularSongs: any;
}

const SearchSongs: React.FC<SearchProps> = ({ popularSongs }) => {
    return (
        <>
            {popularSongs?.map((song: any, index: number) => (
                <StSongList key={index}>
                    <StSongListLeft>
                        <img
                            src={song.thumbnail}
                            alt="imagedd"
                        />
                        <StSongListInfo>
                            <h3>{song.songTitle}</h3>
                            <p>{song.artistName}</p>
                        </StSongListInfo>
                    </StSongListLeft>
                    <Spotify style={{ width: "24px" }} />
                </StSongList>
            ))}
        </>
    );
};

export default SearchSongs;

const StSongList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: #fafafa;
    margin-bottom: 14px;

    h3 {
        width: 150%;
        font-size: 16px;
        font-weight: 500;
        line-height: 120%;
        color: #fafafa;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }
    p {
        width: 150%;
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
