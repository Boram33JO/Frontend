import React from "react";
import styled from "styled-components";
import { ReactComponent as DownIcon } from "../../assets/images/down.svg";

const PopularSearchWord = () => {
    return (
        <StSearchWordContainer>
            <div>
                <StNumber>1</StNumber>
                <StPopularSearchWord>dkdkdk</StPopularSearchWord>
            </div>
            <DownIcon />
        </StSearchWordContainer>
    );
};

export default PopularSearchWord;

const StSearchWordContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    padding: 20px 14px;
    border: 1px solid #7462e2;
    color: #fafafa;
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
    div {
        display: flex;
        flex-direction: row;
    }
`;

const StNumber = styled.div`
    margin-right: 14px;
`;
const StPopularSearchWord = styled.div``;
