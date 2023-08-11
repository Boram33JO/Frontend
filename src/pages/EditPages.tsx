import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import SearchSong from "../components/edit/SearchSong";
import ButtonComponent from "../components/edit/ButtonComponent";

interface InputForm {
    title: string;
    content: string;
}

const EditPages = () => {
    const navigate = useNavigate();
    const params = useParams();
    const pageNum = Number(params.id);

    const [inputForm, setInputForm] = useState<InputForm>({ title: "", content: "" });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setInputForm({ ...inputForm, [name]: value });
    };

    console.log("inp", inputForm);

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
                                id="title"
                                name="title"
                                value={inputForm.title}
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
                        <ButtonComponent>업로드</ButtonComponent>
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
