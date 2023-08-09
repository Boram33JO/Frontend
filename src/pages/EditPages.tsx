import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import SearchSong from "../components/edit/SearchSong";

const EditPages = () => {
    const navigate = useNavigate();
    const params = useParams();
    const pageNum = Number(params.id);
    // console.log(pageNum);

    return (
        <>
            {pageNum === 2 && (
                <div>
                    <StContainer>2page</StContainer>
                    <SearchSong />
                    <button onClick={() => navigate(`/edit`)}>이전</button>
                    <button onClick={() => navigate(`/edit/3`)}>다음</button>
                </div>
            )}
            {pageNum === 3 && (
                <div>
                    <StContainer>3page</StContainer>
                    <button onClick={() => navigate(`/edit/2`)}>이전</button>
                    <button>다음</button>
                </div>
            )}
        </>
    );
};

export default EditPages;

const StContainer = styled.div``;
