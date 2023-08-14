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
}

const FormArea: React.FC<FormProps> = ({ inputForm, setInputForm, chooseSongList, setChooseSongList }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setInputForm((prevInputForm) => {
            const updatedInputForm: InputForm = { ...prevInputForm, [name]: value };
            localStorage.setItem("postTitle", updatedInputForm.postTitle);
            localStorage.setItem("content", updatedInputForm.content);
            return updatedInputForm;
        });
    };

    useEffect(() => {
        const postTitle = localStorage.getItem("postTitle") || "";
        const content = localStorage.getItem("content") || "";
        setInputForm({ postTitle, content });
    }, []);

    const removeFromChooseSongList = (song: ChooseSongListType) => {
        const updatedList = chooseSongList.filter((item) => item.songNum !== song.songNum);
        setChooseSongList(updatedList);
    };

    console.log("sss", chooseSongList);

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

            <StLocation>placeName</StLocation>
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
`;

const StChooseSongListContainer = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 104px;
    width: 348px;
    border-radius: 6px;
    border: 1px solid #524d58;
    background: #434047;
    margin-top: 12px;
`;

const StChooseSongLists = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
