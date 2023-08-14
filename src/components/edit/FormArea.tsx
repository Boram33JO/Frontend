import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import ButtonComponent from "./ButtonComponent";

interface InputForm {
    postTitle: string;
    content: string;
}

interface FormProps {
    inputForm: InputForm;
    setInputForm: React.Dispatch<React.SetStateAction<InputForm>>;
}

// slideIndex: number;
// onClickNextButtonHandler: any;
// onClickBeforeButtonHandler: any;

const FormArea: React.FC<FormProps> = ({ inputForm, setInputForm }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setInputForm((prevInputForm) => {
            const updatedInputForm: InputForm = { ...prevInputForm, [name]: value };
            localStorage.setItem("postTitle", updatedInputForm.postTitle);
            localStorage.setItem("content", updatedInputForm.content);
            return updatedInputForm;
        });
    };
    // console.log("sssddd", inputForm);

    useEffect(() => {
        const postTitle = localStorage.getItem("postTitle") || "";
        const content = localStorage.getItem("content") || "";
        setInputForm({ postTitle, content });
    }, []);

    return (
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
            </div>
            {/* <StButtons>
                <ButtonComponent onClick={onClickBeforeButtonHandler}>이전</ButtonComponent>
                <ButtonComponent onClick={onClickNextButtonHandler}>다음</ButtonComponent>
            </StButtons> */}
        </StFormArea>
    );
};

export default FormArea;

const StFormArea = styled.div`
    width: 350px;
    height: 222px;
    border: 1px solid #434047;
    background-color: #434047;
    border-radius: 6px;
    /* div{
        display: flex;
    } */

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

const StButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
