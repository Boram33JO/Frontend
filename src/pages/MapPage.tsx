import React, { useState } from "react";
import styled from "styled-components";

import KakaoMap from "../components/map/KakaoMap";
import { Post } from "../models/post";
import ListItem from "../components/common/ListItem";

const MapPage = () => {
    const [postList, setPostList] = useState<any>([]);
    const [isData, setIsData] = useState<any>([]);

    return (
        <InnerContainer>
            <StMapContainer>
                <h1>지금 피플러는 뭘 듣고 있을까요?</h1>
                <KakaoMap
                    postList={postList}
                    setPostList={setPostList}
                    isData={isData}
                    setIsData={setIsData}
                />
            </StMapContainer>
            <StLine />
            <StListContainer>
                <h1>{postList.length}개의 포스팅</h1>
                {postList.length === 0 ? (
                    <div>“검색어"에 관련된 포스팅이 없습니다.</div>
                ) : (
                    postList?.map((post: Post) => {
                        return (
                            <StMyListItem key={post.postId}>
                                <ListItem post={post} />
                            </StMyListItem>
                        )
                    })
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
    height: 8px;
    background: #242325;
`;

const StListContainer = styled.div`
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
