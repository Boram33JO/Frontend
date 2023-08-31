import React, { useEffect } from "react";
import styled from "styled-components";

interface InputForm {
    postTitle: string;
    content: string;
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

interface FormProps {
    inputForm: InputForm;
    setInputForm: React.Dispatch<React.SetStateAction<InputForm>>;
    chooseSongList: ChooseSongListType[]; // Props 타입 수정
    setChooseSongList: React.Dispatch<React.SetStateAction<ChooseSongListType[]>>;
    categoryNum: number;
    placeName: string;
    isData: any;
    setIsData: any;
}

const FormArea: React.FC<FormProps> = ({
    inputForm,
    setInputForm,
    chooseSongList,
    setChooseSongList,
    categoryNum,
    placeName,
    isData,
    setIsData,
}) => {
    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setInputForm((prevInputForm) => {
            const updatedInputForm: InputForm = { ...prevInputForm, [name]: value };
            return updatedInputForm;
        });
    };

    useEffect(() => {
        setInputForm({
            postTitle: inputForm.postTitle || "", // 기존의 값 유지 또는 빈 문자열
            content: inputForm.content || "", // 기존의 값 유지 또는 빈 문자열
        });
    }, []);

    useEffect(() => {
        if (isData) {
            setInputForm({
                postTitle: isData.postTitle,
                content: isData.content,
            });
        }
    }, [isData]);

    const removeFromChooseSongList = (song: ChooseSongListType) => {
        const updatedList = chooseSongList.filter((item) => item.songNum !== song.songNum);
        setChooseSongList(updatedList);
    };

    return (
        <Container>
            <StFormArea>
                <div>
                    <input
                        placeholder="제목"
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        value={inputForm.postTitle}
                        onChange={handleChange}
                    />
                    <textarea
                        placeholder="내용을 입력하세요."
                        id="content"
                        name="content"
                        spellCheck="false"
                        value={inputForm.content}
                        onChange={handleChange}
                    />
                    <p>{inputForm.content.length}/500</p>
                </div>
            </StFormArea>

            <StLocation>
                <div>{placeName}</div>
                <button>{categories[categoryNum]}</button>
            </StLocation>
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

export default FormArea;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    gap: 10px;
    padding: 10px;
`;

const StFormArea = styled.div`
    width: 100%;
    height: auto;
    border: 1px solid #524d58;
    background: #434047;
    border-radius: 6px;
    box-sizing: border-box;

    input {
        width: 90%;
        height: 16px;
        border: none;
        border-radius: 8px;
        background: #434047;
        padding: 16px 13px;
        color: #d9d8df;
    }
    input:focus {
        outline: none;
    }
    textarea {
        width: 100%;
        height: 208px;
        border: none;
        resize: none;
        border-top: 1px solid #524d58;
        background: #434047;

        color: #d9d8df;
        font-size: 16px;
        line-height: calc(100% + 6px);

        box-sizing: border-box;
        padding: 16px 13px;

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
    }
    textarea:focus {
        outline: none;
    }
    p {
        color: #a6a3af;
        text-align: right;
        padding: 0 16px;
        margin-bottom: 9px;
    }
`;

const StLocation = styled.div`
    width: 100%;
    height: auto;
    border-radius: 6px;
    border: 1px solid #524d58;
    background: #434047;
    box-sizing: border-box;
    color: #f1f1f1;
    padding: 10px 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
        height: 26px;
        color: #fafafa;
        display: flex;
        border-radius: 999px;
        padding: 6px 16px;
        justify-content: center;
        align-items: center;
    }
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
    color: #f1f1f1;
    font-size: 14px;
    line-height: calc(100% + 6px);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
`;

const ChooseP = styled.p`
    flex: 0.4 0 0;
    color: #a6a3af;
    font-size: 14px;
    line-height: calc(100% + 6px);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
`;
