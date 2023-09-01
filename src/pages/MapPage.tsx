import React, { useState, useEffect } from "react";
import styled from "styled-components";

import KakaoMap from "../components/map/KakaoMap";
import { Post } from "../models/post";
import ListItem from "../components/common/ListItem";
import Loading from "../components/map/Loading";

import { ReactComponent as Start } from "../assets/images/page_start.svg";
import { ReactComponent as End } from "../assets/images/page_end.svg";
import { ReactComponent as Prev } from "../assets/images/page_prev.svg";
import { ReactComponent as Next } from "../assets/images/page_next.svg";

const MapPage = () => {
    const [postList, setPostList] = useState<any>([]);
    const [isData, setIsData] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [startPage, setStartPage] = useState(1);
    const pageLimit = 5; // 한 번에 보여줄 페이지 번호 수
    const perPage = 10; // 한 페이지에 보여줄 아이템 수
    const totalPage = Math.ceil(postList.length / perPage);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const FirstClickHandler = () => {
        setCurrentPage(1);
        setStartPage(1);
    };
    const PrevClickHandler = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            if (startPage > 1) {
                setStartPage(startPage - 1);
            }
        }
    };
    const NextClickHandler = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
            if (currentPage % pageLimit === 0) {
                setStartPage(startPage + pageLimit);
            }
        }
    };

    const LastClickHandler = () => {
        const lastPageIndex = Math.ceil(postList.length / perPage);
        setCurrentPage(lastPageIndex);
    };

    const CurrentClickHandler = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const currentPosts = postList.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <InnerContainer>
            {loading && (
                <StLoading>
                    <Loading />
                </StLoading>
            )}
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
                <CommentListPagination>
                    <SvgIcon>
                        <Start onClick={FirstClickHandler} />
                    </SvgIcon>
                    <SvgIcon>
                        <Prev onClick={PrevClickHandler} />
                    </SvgIcon>
                    {[...Array(Math.min(pageLimit, Math.ceil(postList.length / perPage)))].map((_, index) => (
                        <PageButton
                            key={index}
                            $click={currentPage === startPage + index}
                            onClick={() => CurrentClickHandler(startPage + index)}
                        >
                            {startPage + index}
                        </PageButton>
                    ))}
                    <SvgIcon>
                        <Next onClick={NextClickHandler} />
                    </SvgIcon>
                    <SvgIcon>
                        <End onClick={LastClickHandler} />
                    </SvgIcon>
                </CommentListPagination>
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

const StLoading = styled.div`
    background-color: #141414;
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

const CommentListPagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    margin: 40px 0px 10px;
    gap: 10px;
`;

const SvgIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
`;

const Pagination = styled.div`
    display: flex;
`;

const PageButton = styled.div<{ $click: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background-color: ${(props) => (props.$click ? "#7462E2" : "transparent")};
    color: ${(props) => (props.$click ? "#FAFAFA" : "#535258")};
    cursor: pointer;
`;
