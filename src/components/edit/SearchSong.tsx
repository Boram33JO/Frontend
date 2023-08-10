import axios from "axios";
import React, { useState } from "react";
import { styled } from "styled-components";

// export enum TodoStatus {
//     ACTIVE = "active",
//     COMPLETED = "completed"
// }

export type SongListType = {
    album: string;
    artistName: string;
    audioUrl: string;
    externalUrl: string;
    id: number;
    songNum: string;
    songTitle: string;
    thumbnail: string;
};

const SearchSong: React.FC = () => {
    const [searchSong, setSearchSong] = useState<string>("");
    const [songList, setSongList] = useState<Array<SongListType>>([]);

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchSong(event.target.value);
    };
    console.log("searchSong", searchSong);

    const searchSongHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://43.201.22.74/api/search?keyword=${searchSong}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            console.log("성공", response);
            setSongList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(songList);

    return (
        <>
            <form onSubmit={searchSongHandler}>
                <input
                    onChange={changeInputHandler}
                    value={searchSong}
                />
                <button>검색</button>
            </form>
            <StContainer>
                {songList.map((item) => (
                    <StSongList>
                        <img
                            key={item.id}
                            src={item.thumbnail}
                            alt={`Thumbnail for ${item.songTitle}`}
                        />
                        <div>
                            <h3>{item.songTitle}</h3>
                            <p>{item.artistName}</p>
                        </div>
                    </StSongList>
                ))}
            </StContainer>
        </>
    );
};

export default SearchSong;

const StContainer = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 300px;
`;
const StSongList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
        width: 56px;
        height: 56px;
    }
`;
