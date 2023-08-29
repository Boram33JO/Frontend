import React, { useEffect, useRef, useState } from "react"; // useEffect는 사용하지 않아서 제거
import { styled } from "styled-components";
import { ReactComponent as CheckBox } from "../../assets/images/check_slc.svg";
import { ReactComponent as NonCheckBox } from "../../assets/images/check_non.svg";
import { ReactComponent as Search } from "../../assets/images/search.svg";
import { getPopularSongsList, getSearchSongs } from "../../api/edit";
import { ReactComponent as Spotify } from "../../assets/images/spotify/Spotify_Icon_RGB_White.svg";

interface SongListType {
    album: string;
    artistName: string;
    audioUrl: string;
    externalUrl: string;
    songNum: string;
    songTitle: string;
    thumbnail: string;
    checked: boolean;
}

interface PopularSongListType {
    album: string;
    artistName: string;
    audioUrl: string;
    externalUrl: string;
    songNum: string;
    songTitle: string;
    thumbnail: string;
    checked: boolean;
}

interface ChooseSongListType {
    album: string;
    artistName: string;
    audioUrl: string;
    externalUrl: string;
    songNum: string;
    songTitle: string;
    thumbnail: string;
}

interface SearchSongProps {
    chooseSongList: ChooseSongListType[]; // Props 타입 수정
    setChooseSongList: React.Dispatch<React.SetStateAction<ChooseSongListType[]>>;
    isData: any;
    setIsData: any;
}

const SearchSong: React.FC<SearchSongProps> = ({ chooseSongList, setChooseSongList, isData, setIsData }) => {
    const [searchSong, setSearchSong] = useState<string>("");
    const [songList, setSongList] = useState<Array<SongListType>>([]);
    const [popularSongList, setPopularSongList] = useState<Array<PopularSongListType>>([]);

    //-------------------------------------------------- 검색시 스크롤 맨 위로 올림
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollToTop = () => {
        if (scrollRef.current) {
            const { scrollHeight, clientHeight } = scrollRef.current;
            scrollRef.current.scrollTop = clientHeight - scrollHeight;
        }
    };

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchSong(event.target.value);
    };

    useEffect(() => {
        const getPopularSongs = async () => {
            try {
                const response = await getPopularSongsList();
                if (response) {
                    setPopularSongList(response);
                } else {
                    alert("검색 결과 없음");
                }
            } catch (error) {
                console.log(error);
            }
        };
        getPopularSongs();
    }, []);

    const getSearchSongHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await getSearchSongs(searchSong);
            console.log("11", response?.data.statusCode);
            if (response?.data.statusCode === 204) {
                return alert("다시 검색해주세요.");
            } else if (response?.data !== undefined) {
                setSongList(response.data);
                // console.log(songList);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isData) {
            setChooseSongList(isData.songs);
        }
    }, [isData]);

    useEffect(() => {
        scrollToTop();
    }, [songList]);

    const addToChooseSongList = (item: SongListType) => {
        const isAlreadyAdded = chooseSongList.some((addedItem) => addedItem.songNum === item.songNum);
        if (isAlreadyAdded) {
            removeFromChooseSongList(item);
        } else if (chooseSongList.length >= 10) {
            return alert("한 번에 추가 할 수 있는 곡의 수는 10개 입니다.");
        } else {
            setChooseSongList((prevList) => {
                const newList = [...prevList, item];
                return newList;
            });
        }
    };

    const removeFromChooseSongList = (song: ChooseSongListType) => {
        const updatedList = chooseSongList.filter((item) => item.songNum !== song.songNum);
        setChooseSongList(updatedList);
    };

    return (
        <Container>
            <StSearchForm onSubmit={getSearchSongHandler}>
                <div>
                    <Search style={{ width: "16px", height: "16px", marginLeft: "16px", marginRight: "12px" }} />
                </div>
                <input
                    placeholder="음악을 입력해보세요"
                    onChange={changeInputHandler}
                    value={searchSong}
                />
            </StSearchForm>
            {songList.length === 0 ? (
                <StPopularContainer>
                    <h2>이 노래는 어때요?</h2>
                    <StSongListContainer>
                        {popularSongList.map((item) => (
                            <StSongList
                                key={item.songNum}
                                onClick={() => {
                                    addToChooseSongList(item);
                                }}
                            >
                                <StSongListLeft>
                                    <Spotify style={{ width: "21px" }} />
                                    <img
                                        src={item.thumbnail}
                                        alt={`Thumbnail for ${item.songTitle}`}
                                    />
                                    <StSongListInfo>
                                        <h3>{item.songTitle}</h3>
                                        <p>{item.artistName}</p>
                                    </StSongListInfo>
                                </StSongListLeft>
                                {!chooseSongList.some((addedItem) => addedItem.songNum === item.songNum) ? <NonCheckBox /> : <CheckBox />}
                            </StSongList>
                        ))}
                    </StSongListContainer>
                </StPopularContainer>
            ) : (
                <StContainer ref={scrollRef}>
                    {songList.map((item) => (
                        <StSongList
                            key={item.songNum}
                            onClick={() => {
                                addToChooseSongList(item);
                            }}
                        >
                            <StSongListLeft>
                                <Spotify style={{ width: "21px" }} />
                                <img
                                    src={item.thumbnail}
                                    alt={`Thumbnail for ${item.songTitle}`}
                                />
                                <StSongListInfo>
                                    <h3>{item.songTitle}</h3>
                                    <p>{item.artistName}</p>
                                </StSongListInfo>
                            </StSongListLeft>
                            {!chooseSongList.some((addedItem) => addedItem.songNum === item.songNum) ? <NonCheckBox /> : <CheckBox />}
                        </StSongList>
                    ))}
                </StContainer>
            )}
            {chooseSongList.length !== 0 && (
                <StChooseSongListContainer>
                    {chooseSongList.map((song) => (
                        <StChooseSongLists key={song.songNum}>
                            <ChooseH3>{song.songTitle}</ChooseH3>
                            <ChooseP>{song.artistName}</ChooseP>
                            <button onClick={() => removeFromChooseSongList(song)}>삭제</button>
                        </StChooseSongLists>
                    ))}
                </StChooseSongListContainer>
            )}
        </Container>
    );
};

export default SearchSong;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    gap: 20px;
    padding: 10px;
`;

const StSearchForm = styled.form`
    width: 100%;
    height: 40px;
    color: #fafafa;
    background-color: #434047;
    border-radius: 999px;

    display: flex;
    flex-direction: row;
    align-items: center;

    input {
        width: 350px;
        height: 20px;
        color: #fafafa;
        border: 1px solid #434047;
        background-color: #434047;
    }
    input:focus {
        outline: none;
    }
`;

const StPopularContainer = styled.div`
    color: #fafafa;
    h2 {
        font-size: 18px;
    }
    h3 {
        width: 130px;
        font-size: 16px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }
    p {
        color: #a6a3af;
        font-size: 14px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }
`;

const StContainer = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 274px;
    border-radius: 6px;
    border: 1px solid #524d58;
    background: #434047;

    box-sizing: border-box;
    gap: 10px;
    padding: 10px 16px;
    &::-webkit-scrollbar {
        width: 4px;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #dddddd;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: #3a3a3a;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-button:vertical:start:decrement,
    &::-webkit-scrollbar-button:vertical:end:decrement {
        height: 10px;
    }
    textarea:focus {
        outline: none;
    }
`;

const StSongListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;
    padding-top: 20px;
`;

const StSongList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: #fafafa;

    div {
    }

    h3 {
        width: 130px;
        font-size: 16px;
        color: #fafafa;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }
    p {
        font-size: 14px;
        color: #fafafa;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }

    img {
        width: 56px;
        height: 56px;
        background: var(--iu-1, url(<path-to-image>), lightgray 50% / cover no-repeat);
    }
`;

const StSongListLeft = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 18px;
`;

const StSongListInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 156px;
`;

const StChooseSongListContainer = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 102px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid #524d58;
    background: #434047;

    display: flex;
    flex-direction: column;
    padding: 8px 0;

    &::-webkit-scrollbar {
        width: 4px;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #dddddd;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        height: 10px;
        background-color: #3a3a3a;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-button:vertical:start:decrement,
    &::-webkit-scrollbar-button:vertical:end:decrement {
        height: 7px;
    }
    textarea:focus {
        outline: none;
    }
`;

const StChooseSongLists = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 3px 16px;

    button {
        border: none;
        color: #a6a3af;
        background-color: #434047;
        cursor: pointer;
    }
`;

const ChooseH3 = styled.h3`
    flex: 0.6 0 0;
    color: #fafafa;
    font-size: 14px;
    line-height: calc(100% + 6px);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
`;

const ChooseP = styled.p`
    flex: 0.4 0 0;
    /* color: #a6a3af; */
    color: #fafafa;

    font-size: 14px;
    line-height: calc(100% + 6px);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
`;
