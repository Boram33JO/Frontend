import React, { useState } from "react";
import styled from "styled-components";

import KakaoMap from "../components/map/KakaoMap";
import MyListItem from "../components/common/MyListItem";
import { Post } from "../models/post";

const MapPage = () => {
    const [isData, setIsData] = useState<any>([]);
    // const [latitude, setLatitude] = useState<string>("37.566826");
    // const [longitude, setLongitude] = useState<string>("126.9786567");

    return (
        <>
            <StMapContainer>
                <h1>지금 피플러는 뭘 듣고 있을까요?</h1>
                <KakaoMap
                    isData={isData}
                    setIsData={setIsData}
                    // latitude={latitude}
                    // setLatitude={setLatitude}
                    // longitude={longitude}
                    // setLongitude={setLongitude}
                />
            </StMapContainer>
            <StLine />
            <StListContainer>
                <h1>{isData.length}의 포스팅 결과</h1>
                {isData.length === 0 ? (
                    <div>해당 위치에 포스팅이 없습니다. 다른 지역을 검색해보세요.</div>
                ) : (
                    isData.map((post: Post) => (
                        <StMyListItem>
                            <MyListItem
                                key={post.postId}
                                post={post}
                            />
                        </StMyListItem>
                    ))
                )}
            </StListContainer>
        </>
    );
};

export default MapPage;

export const StMapContainer = styled.div`
    width: 350px;
    /* height: 523px; */
    padding: 0 20px;
    margin-top: 47px;
    background-color: #141414;

    h1 {
        font-size: 20px;
        color: #fafafa;
        margin-bottom: 16px;
    }
`;

const StLine = styled.div`
    width: 390px;
    height: 8px;
    background: #242325;
`;

const StListContainer = styled.div`
    width: 350px;
    /* height: 523px; */
    padding: 0 20px 78px 20px;
    background-color: #141414;
    color: #fafafa;

    h1 {
        font-size: 20px;
        padding: 31px 0 16px 0;
    }
`;

const StMyListItem = styled.div`
    margin-bottom: 14px;
`;
