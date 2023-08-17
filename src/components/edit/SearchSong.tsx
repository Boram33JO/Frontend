import React, { useEffect, useState } from "react"; // useEffect는 사용하지 않아서 제거
import { styled } from "styled-components";
import { ReactComponent as CheckBox } from "../../assets/images/check_slc.svg";
import { ReactComponent as NonCheckBox } from "../../assets/images/check_non.svg";
import { ReactComponent as Search } from "../../assets/images/search.svg";
import { getPopularSongsList, getSearchSongs } from "../../api/edit";

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
                    // console.log("검색 결과 없음");
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
            if (response) {
                setSongList(response.data);
            } else {
                // console.log("검색 결과 없음");
            }
        } catch (error) {
            console.log(error);
        }
    };

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
        <>
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
                    {popularSongList.map((item) => (
                        <StSongList
                            key={item.songNum}
                            onClick={() => {
                                addToChooseSongList(item);
                            }}
                        >
                            <img
                                src={item.thumbnail}
                                alt={`Thumbnail for ${item.songTitle}`}
                            />
                            <div>
                                <h3>{item.songTitle}</h3>
                                <p>{item.artistName}</p>
                            </div>
                            {!chooseSongList.some((addedItem) => addedItem.songNum === item.songNum) ? <NonCheckBox /> : <CheckBox />}
                        </StSongList>
                    ))}
                </StPopularContainer>
            ) : (
                <StContainer>
                    {songList.map((item) => (
                        <StSongList
                            key={item.songNum}
                            onClick={() => {
                                addToChooseSongList(item);
                            }}
                        >
                            <img
                                src={item.thumbnail}
                                alt={`Thumbnail for ${item.songTitle}`}
                            />
                            <div>
                                <h3>{item.songTitle}</h3>
                                <p>{item.artistName}</p>
                            </div>
                            {!chooseSongList.some((addedItem) => addedItem.songNum === item.songNum) ? <NonCheckBox /> : <CheckBox />}
                        </StSongList>
                    ))}
                </StContainer>
            )}

            {chooseSongList.length !== 0 && (
                <StChooseSongListContainer>
                    {chooseSongList.map((song) => (
                        <StChooseSongLists key={song.songNum}>
                            <h3>{song.songTitle}</h3>
                            <div>{song.artistName}</div>
                            <button onClick={() => removeFromChooseSongList(song)}>삭제</button>
                        </StChooseSongLists>
                    ))}
                </StChooseSongListContainer>
            )}
        </>
    );
};

export default SearchSong;

const StSearchForm = styled.form`
    width: 348px;
    height: 40px;
    border: 1px solid #434047;
    background-color: #434047;
    border-radius: 999px;

    display: flex;
    flex-direction: row;
    align-items: center;

    input {
        width: 270px;
        height: 16px;
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
        margin: 28px 0 24px 0;
    }
    h3 {
        font-size: 16px;
    }
    p {
        color: #a6a3af;
        font-size: 14px;
    }
`;

const StContainer = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    width: 348px;
    height: 297px;
    border-radius: 6px 6px 0 0;
    border: 1px solid #524d58;
    background: #434047;

    margin-top: 12px;
    padding-top: 19px;
`;

const StSongList = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 18px;
    margin: 7px 16px;
    div {
        display: flex;
        flex-direction: column;
        width: 193px;
    }

    img {
        width: 56px;
        height: 56px;
        background: var(--iu-1, url(<path-to-image>), lightgray 50% / cover no-repeat);
    }
`;

const StChooseSongListContainer = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 104px;
    width: 348px;
    border-radius: 0 0 6px 6px;
    border: 1px solid #524d58;
    background: #434047;

    display: flex;
    flex-direction: column;
`;

const StChooseSongLists = styled.div`
    width: 309px;
    margin: 7px 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h3 {
        width: 113px;
        margin-right: 35px;
        color: #f1f1f1;
        font-size: 14px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }
    div {
        width: 90px;
        color: #a6a3af;
        font-size: 14px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }
    button {
        border: none;
        color: #a6a3af;
        background-color: #434047;
        cursor: pointer;
    }
`;
