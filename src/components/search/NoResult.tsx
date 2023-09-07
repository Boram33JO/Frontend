import React from "react";
import styled from "styled-components";
import { ReactComponent as NoResultIcon } from "../../assets/images/no_preview.svg";

interface NoticeProps {
    notice: string;
}

const NoResult: React.FC<NoticeProps> = ({ notice }) => {
    return (
        <StNoResultContainer>
            <NoResultIcon style={{ width: "50px", height: "58px", opacity: "0.8" }} />
            <div>{notice}</div>
        </StNoResultContainer>
    );
};

export default NoResult;

const StNoResultContainer = styled.div`
    width: 100%;
    height: 132px;
    border-radius: 8px;
    background: #252427;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
        color: #7d7b85;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        margin-top: 10px;
    }
`;
