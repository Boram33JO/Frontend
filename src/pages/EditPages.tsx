import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import SearchSong from "../components/edit/SearchSong";
import ButtonComponent from "../components/edit/ButtonComponent";

const EditPages = () => {
    const navigate = useNavigate();
    const params = useParams();
    const pageNum = Number(params.id);

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
                        <input placeholder="제목" />
                        <textarea placeholder="내용을 입력하세요." />
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
    display: flex;
    flex-direction: row;
`;
