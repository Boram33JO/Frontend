import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import SearchSong from "../components/edit/SearchSong";
import ButtonComponent from "../components/edit/ButtonComponent";
import axios from "axios";

interface InputForm {
    postTitle: string;
    content: string;
}

const EditPages = () => {
    const navigate = useNavigate();
    const params = useParams();
    const pageNum = Number(params.id);

    const [inputForm, setInputForm] = useState<InputForm>({ postTitle: "", content: "" });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setInputForm({ ...inputForm, [name]: value });
        localStorage.setItem("postTitle", inputForm.postTitle);
        localStorage.setItem("content", inputForm.content);
    };

    const onClickUpload = async () => {
        try {
            const data = {
                latitude: localStorage.getItem("latitude"),
                longitude: localStorage.getItem("longitude"),
                address: localStorage.getItem("address"),
                songs: localStorage.getItem("songs"),
                category: localStorage.getItem("category"),
                content: localStorage.getItem("content"),
                postTitle: localStorage.getItem("postTitle"),
                placeName: localStorage.getItem("placeName"),
            };
            console.log("data", data);
            const response = await axios.post("http://43.201.22.74/api/posts", data);
            console.log("성공:", response);
            alert("업로드 완료")
        } catch (error) {
            alert("게시물 업로드 중에 오류가 발생했습니다.");
            console.error("에러:", error);
        } finally {
            setInputForm({ postTitle: "", content: "" });
            localStorage.removeItem("latitude");
            localStorage.removeItem("longitude");
            localStorage.removeItem("address");
            localStorage.removeItem("songs");
            localStorage.removeItem("category");
            localStorage.removeItem("content");
            localStorage.removeItem("postTitle");
            localStorage.removeItem("placeName");
        }
    };

    return (
        <>
            {pageNum === 2 && (
                <StContainer>
                    <h1>어떤 음악을 추천할까요?</h1>
                    <SearchSong />
                    <StButtons>
                        <ButtonComponent onClick={() => navigate(`/edit`)}>이전</ButtonComponent>
                        <ButtonComponent onClick={() => navigate(`/edit/3`)}>다음</ButtonComponent>
                    </StButtons>
                </StContainer>
            )}

            {pageNum === 3 && (
                <StContainer>
                    <h1>지금의 감성을 기록하세요.</h1>
                    <StFormArea>
                        <div>
                            <input
                                placeholder="제목"
                                type="text"
                                id="postTitle"
                                name="postTitle"
                                value={inputForm.postTitle}
                                onChange={handleChange}
                            ></input>
                            <textarea
                                placeholder="내용을 입력하세요."
                                id="content"
                                name="content"
                                value={inputForm.content}
                                onChange={handleChange}
                            />
                        </div>
                    </StFormArea>
                    <StButtons>
                        <ButtonComponent onClick={() => navigate(`/edit/2`)}>이전</ButtonComponent>
                        <ButtonComponent onClick={onClickUpload}>업로드</ButtonComponent>
                    </StButtons>
                </StContainer>
            )}
        </>
    );
};

export default EditPages;

const StContainer = styled.div`
    padding: 20px;
    h1 {
        font-size: 20px;
    }
`;

const StButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const StFormArea = styled.div`
    width: 350px;
    height: 222px;
    border: 1px solid #434047;
    background-color: #434047;
    border-radius: 6px;
    input {
        width: 345px;
        height: 26px;
        border: none;
        border: 1px solid #434047;
        background-color: #434047;
        color: #d9d8df;
    }
    input:focus {
        outline: none;
    }
    textarea {
        width: 345px;
        height: 150px;
        border: none;
        resize: none;
        border: 1px solid #434047;
        background-color: #434047;
        color: #d9d8df;
    }
    textarea:focus {
        outline: none;
    }
`;
