import React, { useState, useEffect } from "react";
import styled from "styled-components";

import KakaoMap from "../components/map/KakaoMap";
import { Post } from "../models/post";
import ListItem from "../components/common/ListItem";

const MapPage = () => {
    const [postList, setPostList] = useState<any>([]);
    const [isData, setIsData] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10; // 한 페이지에 보여줄 아이템 수

    // 페이지 버튼 클릭 시 호출될 함수
    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // 현재 페이지에 해당하는 포스트만 필터링
    const currentPosts = postList.slice((currentPage - 1) * perPage, currentPage * perPage);

    useEffect(() => {
        handlePageClick(1);
    }, []);

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
                <h1>{currentPosts.length}개의 포스팅</h1>
                {currentPosts.length === 0 ? (
                    <div>“검색어"에 관련된 포스팅이 없습니다.</div>
                ) : (
                    currentPosts.map((post: Post) => {
                        return (
                            <StMyListItem key={post.postId}>
                                <ListItem post={post} />
                            </StMyListItem>
                        );
                    })
                )}
                {/* Pagination */}
                <StButtonContainer>
                    {[...Array(Math.ceil(postList.length / perPage))].map((_, index) => (
                        <StPagenationButton
                            key={index + 1}
                            onClick={() => handlePageClick(index + 1)}
                        >
                            {index + 1}
                        </StPagenationButton>
                    ))}
                </StButtonContainer>
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

const StButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const StPagenationButton = styled.button`
    color: #fafafa;
    margin: 10px;
    cursor: pointer;
`;
