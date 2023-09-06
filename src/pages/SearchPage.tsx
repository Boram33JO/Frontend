import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchInput from "../components/search/SearchInput";
import RecommendedPosting from "../components/search/RecommendedPosting";
import PopularPlace from "../components/search/PopularPlace";
import Category from "../components/common/Category";
import RecommendSong from "../components/search/RecommendSong";
import PopularSearchWord from "../components/search/PopularSearchWord";
import PopularSearchWordList from "../components/search/PopularSearchWordList";

import { getSearchList } from "../api/search";

const SearchPage = () => {
    const [categoryNum, setCategoryNum] = useState<any>(0);
    const [searchData, setSearchData] = useState<any>();
    const [searchPlace, setSearchPlace] = useState<any>();
    const [topPost, setTopPost] = useState<any>([]);
    const [topSongs, setTopSongs] = useState<any>();
    const [isPopularSearchWord, setIsPopularSearchWord] = useState<boolean>(true);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [randomColorChange, setRandomColorChange] = useState(false);
    const [popularList, setPopularList] = useState<any>();

    useEffect(() => {
        getSearch();
    }, []);
    console.log(searchKeyword);
    const popularSearchWordHandler = () => {
        setIsPopularSearchWord(!isPopularSearchWord);
    };

    const getSearch = async () => {
        try {
            const response = await getSearchList();
            setSearchData(response);
            setTopPost(response.topPosts);
            setSearchPlace(response.topLocations);
            setPopularList(response.topSearchKeywords);
            setRandomColorChange(!randomColorChange);
            setTopSongs(response.topSongs);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <StSearchContainer>
            <SearchInput
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                getSearch={getSearch}
            />
            <StSection>
                <StTitle>
                    <h2>추천포스팅</h2>
                    {/* <span>더보기</span> */}
                </StTitle>
                <RecommendedPosting
                    topPost={topPost}
                    setTopPost={setTopPost}
                    randomColorChange={randomColorChange}
                />
            </StSection>
            <StSection>
                <StTitle>
                    <h2>피플러 인기 플레이스</h2>
                    {/* <span>더보기</span> */}
                </StTitle>
                <StPopularPlace>
                    <PopularPlace
                        searchPlace={searchPlace}
                        setSearchPlace={setSearchPlace}
                    />
                </StPopularPlace>
            </StSection>
            <StSection>
                <StTitle>
                    <h2>피플러들이 선택한 곡</h2>
                    {/* <span>더보기</span> */}
                </StTitle>
                <StCategory>
                    <Category
                        categoryNum={categoryNum}
                        setCategoryNum={setCategoryNum}
                    />
                </StCategory>
                <RecommendSong
                    topSongs={topSongs}
                    categoryNum={categoryNum}
                />
            </StSection>
            <StSection>
                <StTitle>
                    <h2>피플 인기 검색어</h2>
                    {/* <span>더보기</span> */}
                </StTitle>
                {isPopularSearchWord === true ? (
                    <PopularSearchWord
                        popularList={popularList}
                        onClick={popularSearchWordHandler}
                    />
                ) : (
                    <PopularSearchWordList
                        popularList={popularList}
                        onClick={popularSearchWordHandler}
                    />
                )}

                <p>실시간 업데이트 기준</p>
            </StSection>
        </StSearchContainer>
    );
};

export default SearchPage;

const StSearchContainer = styled.div`
    padding: 0 20px;
    margin-bottom: 40%;
`;

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
    }
`;

const StCategory = styled.div`
    margin-bottom: 20px;
`;

const StPopularPlace = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    flex-wrap: wrap;
`;

// const StRecommendedPosting = styled.div`
//     width: 100%;

//     display: flex;
//     flex-direction: column;

//     margin: 14px 0;
// `;
