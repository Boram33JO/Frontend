import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import ButtonComponent from "./ButtonComponent";

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

    const removeFromChooseSongList = (song: ChooseSongListType) => {
        const updatedList = chooseSongList.filter((item) => item.songNum !== song.songNum);
        setChooseSongList(updatedList);
    };

    return (
        <>
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
                        value={inputForm.content}
                        onChange={handleChange}
                    />
                    <p>500자 내외</p>
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

export default FormArea;

const StFormArea = styled.div`
    width: 348px;
    height: 222px;
    border: 1px solid #524d58;
    background: #434047;
    border-radius: 6px;

    input {
        width: 235px;
        height: 16px;
        border: none;
        background: #434047;
        padding: 16px 13px;
        color: #d9d8df;
    }
    input:focus {
        outline: none;
    }
    textarea {
        width: 318px;
        height: 120px;
        border: none;
        resize: none;
        border-top: 1px solid #524d58;
        padding: 16px 13px;
        background: #434047;
        color: #d9d8df;
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
    }
`;

const StLocation = styled.div`
    width: 322px;
    height: 16px;
    border-radius: 6px;
    border: 1px solid #524d58;
    background: #434047;
    margin-top: 12px;
    color: #f1f1f1;
    padding: 16px 13px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
        height: 26px;
        background: linear-gradient(135deg, #8084f4, #c48fed);
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
    height: 104px;
    width: 348px;
    border-radius: 0 0 6px 6px;
    border: 1px solid #524d58;
    background: #434047;
    margin-top: 12px;

    display: flex;
    flex-direction: column;
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
    textarea:focus {
        outline: none;
    }
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
