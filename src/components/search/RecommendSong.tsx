import React from "react";
import styled from "styled-components";
import { ReactComponent as Spotify } from "../../assets/images/spotify/Spotify_Icon_RGB_White.svg";

interface SearchProps {
    topSongs: any;
    categoryNum: any;
}

const RecommendSong: React.FC<SearchProps> = ({ topSongs, categoryNum }) => {
    console.log("ddd", topSongs);

    // const filteredData = response.topSongs.filter((item: any) => item.category === categoryNum);

    //     return (
    //         <StSongList>
    //             {topSongs.filter.map((item:any) => (
    //  <StSongListLeft>
    //  <img
    //      src="https://images.unsplash.com/photo-1690585433335-66d64209a38e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8UzRNS0xBc0JCNzR8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
    //      alt="imagedd"
    //  />
    //  <StSongListInfo>
    //      <h3>제목vkwlfkv weln kvnklfnvkwjjkjvhvkhvkh</h3>
    //      <p>가수이름clas kv lk nkvnkanfksnvknkanlnkk</p>
    //  </StSongListInfo>
    // </StSongListLeft>
    // <Spotify style={{ width: "24px" }} />
    //                 ))}

    //         </StSongList>
    //     );

    return (
        <>
            {topSongs &&
                topSongs.length > 0 &&
                topSongs
                    .filter((item: any) => item.category === categoryNum + 1)
                    .map((item: any) =>
                        item.songResponseDtos.map((song: any, index: number) => (
                            <StSongList>
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
