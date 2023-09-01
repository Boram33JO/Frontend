import React from "react";
import styled from "styled-components";
import { ReactComponent as Spotify } from "../../assets/images/spotify/Spotify_Icon_RGB_White.svg";

const RecommendSong = () => {
    return (
        <StSongList>
            <StSongListLeft>
                <img
                    src="https://images.unsplash.com/photo-1690585433335-66d64209a38e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8UzRNS0xBc0JCNzR8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                    alt="imagedd"
                />
                <StSongListInfo>
                    <h3>제목vkwlfkv weln kvnklfnvkw</h3>
                    <p>가수이름clas kv lk nkvnkanfksnvknkanlnkk</p>
                </StSongListInfo>
            </StSongListLeft>
            <Spotify style={{ width: "24px" }} />
        </StSongList>
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

    h3 {
        width: 130px;
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
        font-size: 14px;
        color: #a6a3af;
        font-weight: 500;
        line-height: 120%;
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
