import React from "react";
import styled from "styled-components";

const RecommendedPosting = () => {
    return (
        <StPostingContainers>
            <StPostingContainer>
                <StUserInfo>
                    <img
                        src="https://www.handmk.com/news/photo/202306/16714_40371_5250.jpg"
                        alt="profile imagedd"
                    />
                    <div>
                        <p>userName</p>
                        <span>createdAt</span>
                    </div>
                </StUserInfo>
                <p>category</p>
            </StPostingContainer>
            <StContentContainer>
                <div>sncknvknskvnksk</div>
            </StContentContainer>
        </StPostingContainers>
    );
};

export default RecommendedPosting;

const StPostingContainers = styled.div`
    width: 100%;
    height: 126px;
    border-radius: 6px;
    background: #7178ba;
    padding: 14px;
    box-sizing: border-box;
    margin-bottom: 14px;
`;

const StPostingContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #fafafa;
`;

const StUserInfo = styled.div`
    img {
        width: 32px;
        height: 32px;
        border-radius: 100%;
        margin-right: 8.5px;
    }
    div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    span {
        color: #dadada;
    }
`;

const StContentContainer = styled.div``;
