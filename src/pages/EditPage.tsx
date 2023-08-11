import React from "react";
import { useNavigate } from "react-router-dom";

import EditMap from "../components/edit/EditMap";

import styled from "styled-components";
import ButtonComponent from "../components/edit/ButtonComponent";

const EditPage = () => {
    const navigate = useNavigate();
    
    const handleNextClick = () => {
        navigate(`/edit/2`);
    };

    return (
        <>
            <StContainer>
                <h1>어디로 설정할까요?</h1>
                <EditMap />
                <div>
                    <ButtonComponent>이전</ButtonComponent>
                    <ButtonComponent onClick={handleNextClick}>다음</ButtonComponent>
                </div>
            </StContainer>
        </>
    );
};

export default EditPage;

const StContainer = styled.div`
    padding: 20px;
    h1 {
        font-size: 20px;
    }
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`;
