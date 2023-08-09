import React from "react";
import { useNavigate } from "react-router-dom";

import EditMap from "../components/edit/EditMap";
import Categories from "../components/edit/Categories";

import styled from "styled-components";

const EditPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <StContainer>
                1page
                <Categories />
                <EditMap />
                <button>이전</button>
                <button onClick={() => navigate(`/edit/2`)}>다음</button>
            </StContainer>
        </>
    );
};

export default EditPage;

const StContainer = styled.div``;
