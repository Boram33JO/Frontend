import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import SearchInput from "../components/search/SearchInput";
import Navigation from "../components/search/Navigation";
import NoResult from "../components/search/NoResult";
import { Post } from "../models/post";
import { getSearchKeyword } from "../api/search";
import ListItem from "../components/common/ListItem";
import SearchSongs from "../components/search/SearchSongs";
import Ppler from "./Ppler";
import RecommendedPosts from "../components/search/RecommendedPosts";
import RecommendedPlaces from "../components/search/RecommendedPlaces";
import RecommendedSongs from "../components/search/RecommendedSongs";
import RecommendedPplers from "../components/search/RecommendedPplers";

const SearchListPage = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [list, setList] = useState<number>(0);
    const [isData, setIsData] = useState<any>({});
    const [popularPosts, setPopularPosts] = useState<any>();
    const [popularSongs, setPopularSongs] = useState<any>();
    const [popularPlace, setPopularPlace] = useState<any>();
    const [popularPpler, setPopularPpler] = useState<any>();
    const { keyword } = useParams<{ keyword: string }>();

    useEffect(() => {
        setSearchKeyword(keyword || "");
        getSearch();
    }, [searchKeyword]);

    const getSearch = async () => {
        const keyword = searchKeyword;
        if (keyword.length !== 0) {
            try {
                const response = await getSearchKeyword(keyword);
                setIsData(response?.data);
                setPopularPosts(response?.data.data.posts);
                setPopularSongs(response?.data.data.songs);
                setPopularPlace(response?.data.data.locations);
                setPopularPpler(response?.data.data.users);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleShowPosts = () => {
        setList(1);
    };

    const handleShowPlaces = () => {
        setList(2);
    };

    const handleShowSongs = () => {
        setList(3);
    };

    const handleShowPplers = () => {
        setList(4);
    };

    return (
        <StSearchListContainer>
            <StSearchInputContainer>
                <SearchInput
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                    getSearch={getSearch}
                />
                <Navigation
                    list={list}
                    setList={setList}
                />
            </StSearchInputContainer>
            <StSearchResultContainer>
                <StSearchResultContainer>
                    {
                        <div>
                            {list === 0 && (
                                <StAllSearchList>
                                    <StSection>
                                        <StTitle>
                                            <h2>
                                                {searchKeyword} 검색결과
                                                <span>{popularPosts?.length === 0 ? 0 : popularPosts?.length}개</span>
                                            </h2>
                                            <span onClick={handleShowPosts}>더보기</span>
                                        </StTitle>
                                        {popularPosts?.length === 0 ? (
                                            <NoResult notice={`${searchKeyword}에 관련된 포스팅이 없습니다.`} />
                                        ) : (
                                            popularPosts?.map((post: Post) => (
                                                <StPopularPosts key={post.postId}>
                                                    <ListItem post={post} />
                                                </StPopularPosts>
                                            ))
                                        )}
                                    </StSection>
                                    <StSection>
                                        <StTitle>
                                            <h2>
                                                장소
                                                <span>{popularPlace?.length === 0 ? 0 : popularPlace?.length}개</span>
                                            </h2>
                                            <span onClick={handleShowPlaces}>더보기</span>
                                        </StTitle>
                                        {popularPlace?.length === 0 ? (
                                            <NoResult notice={`${searchKeyword}에 관련된 장소가 없습니다.`} />
                                        ) : (
                                            popularPlace?.slice(0, 5).map((post: Post) => (
                                                <StPopularPlace key={post.postId}>
                                                    <ListItem post={post} />
                                                </StPopularPlace>
                                            ))
                                        )}
                                    </StSection>
                                    <StSection>
                                        <StTitle>
                                            <h2>
                                                곡<span>{popularSongs?.length === 0 ? 0 : popularSongs?.length}개</span>
                                            </h2>
                                            <span onClick={handleShowSongs}>더보기</span>
                                        </StTitle>
                                        {popularSongs?.length === 0 ? (
                                            <NoResult notice={`${searchKeyword}에 관련된 곡을 찾지 못했습니다.`} />
                                        ) : (
                                            <SearchSongs popularSongs={popularSongs} />
                                        )}
                                    </StSection>
                                    <StSection>
                                        <StTitle>
                                            <h2>
                                                피플러
                                                <span>{popularPpler?.length === 0 ? 0 : popularPpler?.length}개</span>
                                            </h2>
                                            <span onClick={handleShowPplers}>더보기</span>
                                        </StTitle>
                                        {popularPpler?.length === 0 ? (
                                            <NoResult notice={`${searchKeyword}에 피플러가 없습니다`} />
                                        ) : (
                                            <Ppler popularPpler={popularPpler} />
                                        )}
                                    </StSection>
                                </StAllSearchList>
                            )}

                            {list === 1 ? (
                                <StMargin>
                                    <RecommendedPosts
                                        popularPosts={popularPosts}
                                        searchKeyword={searchKeyword}
                                    />
                                </StMargin>
                            ) : null}
                            {list === 2 ? (
                                <StMargin>
                                    <RecommendedPlaces
                                        popularPlace={popularPlace}
                                        searchKeyword={searchKeyword}
                                    />
                                </StMargin>
                            ) : null}
                            {list === 3 ? (
                                <StMargin>
                                    <RecommendedSongs
                                        popularSongs={popularSongs}
                                        searchKeyword={searchKeyword}
                                    />
                                </StMargin>
                            ) : null}
                            {list === 4 ? (
                                <StMargin>
                                    <RecommendedPplers
                                        popularPpler={popularPpler}
                                        searchKeyword={searchKeyword}
                                    />
                                </StMargin>
                            ) : null}
                        </div>
                    }
                </StSearchResultContainer>
            </StSearchResultContainer>
        </StSearchListContainer>
    );
};

export default SearchListPage;

const StSearchListContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
`;

const StSearchInputContainer = styled.div`
    padding: 0 20px;
    border-bottom: 1px solid #2d2d30;
`;

const StSearchResultContainer = styled.div`
    padding: 0 10px;
`;

const StAllSearchList = styled.div``;

const StSection = styled.div`
    padding-bottom: 14px;
    p {
        text-align: end;
        color: #827e86;
        font-size: 14px;
        font-weight: 500;
        line-height: 100%;
        margin-top: 7px;
    }
`;

const StTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 36px 0 16px 0;
    h2 {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        line-height: 100%;
    }
    span {
        color: #ccc;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        cursor: pointer; // 추가: 더보기 버튼에 커서 포인터 스타일 적용
    }
`;

const StCategory = styled.div`
    margin-bottom: 20px;
`;

const StPopularPlace = styled.div`
    margin-bottom: 14px;
`;

const StPopularPosts = styled.div`
    margin-bottom: 14px;
`;

const StRecommendedPosting = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 14px 0;
`;

const StMargin = styled.div`
    margin-top: 32px;
`;
