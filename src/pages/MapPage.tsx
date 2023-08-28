import React, { useState } from "react";
import styled from "styled-components";

import KakaoMap from "../components/map/KakaoMap";
import { Post } from "../models/post";
import ListItem from "../components/common/ListItem";

const MapPage = () => {
    const [updatedPosition, setUpdatedPosition] = useState<any>([]);
    console.log("up", updatedPosition);
    console.log("11", updatedPosition.length);

    return (
        <InnerContainer>
            <StMapContainer>
                <h1>지금 피플러는 뭘 듣고 있을까요?</h1>
                <KakaoMap
                    updatedPosition={updatedPosition}
                    setUpdatedPosition={setUpdatedPosition}
                />
            </StMapContainer>
            <StLine />
            <StListContainer>
                <h1>{updatedPosition.length}의 포스팅 결과</h1>
                {updatedPosition.length === 0 ? (
                    <div>해당 위치에 포스팅이 없습니다. 다른 지역을 검색해보세요.</div>
                ) : (
                    updatedPosition.map((post: Post, index: number) => (
                        <StMyListItem key={index}>
                            <ListItem post={post} />
                        </StMyListItem>
                    ))
                )}
            </StListContainer>
        </InnerContainer>
    );
};

export default MapPage;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const StMapContainer = styled.div`
    padding: 20px;
    margin-top: 20px;
    background-color: #141414;

    h1 {
        font-size: 20px;
        color: #fafafa;
        margin-bottom: 16px;
    }
`;

const StLine = styled.div`
    /* width: 390px; */
    height: 8px;
    background: #242325;
`;

const StListContainer = styled.div`
    /* width: 350px; */
    /* height: 523px; */
    padding: 20px;
    background-color: #141414;
    color: #fafafa;

    h1 {
        font-size: 20px;
        line-height: calc(100% + 6px);
        margin-bottom: 20px;
    }
`;

const StMyListItem = styled.div`
    margin-bottom: 14px;
`;
