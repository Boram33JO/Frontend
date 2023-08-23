import React, { useState } from "react";
import styled from "styled-components";

import KakaoMap from "../components/map/KakaoMap";
// import MyListItem from "../components/common/MyListItem";
// import { Post } from '../models/post';

const MapPage = () => {
    return (
        <>
            <StMapContainer>
                <h1>지금 피플러는 뭘 듣고 있을까요?</h1>
                <KakaoMap />
            </StMapContainer>
        </>
    );
};

export default MapPage;

export const StMapContainer = styled.div`
    width: 350px;
    /* height: 523px; */
    padding: 0 20px;
    margin-top: 47px;
    background-color: beige;
    /* background-color: #141414; */

    h1 {
        font-size: 20px;
        color: #fafafa;
        margin-bottom: 16px;
    }
`;
