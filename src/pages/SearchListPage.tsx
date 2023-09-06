import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom"; // Import useHistory from react-router-dom
import SearchInput from "../components/search/SearchInput";
import Navigation from "../components/search/Navigation";
import AllSearchResultPage from "./AllSearchResultPage";
import RecommendedPostingPage from "./RecommendedPostingPage";
import RecommendedSongsPage from "./RecommendedSongsPage";
import RecommendedPlacePage from "./RecommendedPlacePage";
import RecommendedPplerPage from "./RecommendedPplerPage";

import { getSearchKeyword } from "../api/search";

const SearchListPage = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [list, setList] = useState<number>(0);
    const [isData, setIsData] = useState<any>({});
    const location = useLocation();

    useEffect(() => {
        getSearch();
    }, []);

    const getSearch = async () => {
        const keyword = searchKeyword;
        if (keyword.length !== 0) {
            try {
                const response = await getSearchKeyword(keyword);
                setIsData(response?.data);
                console.log("@@@@", isData);
            } catch (error) {
                console.log(error);
            }
        }
    };

    console.log("list", isData);

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
                    {isData.posts.map((post: any, index: number) => (
                        <div key={index}>
                            {/* {list === 0 && <AllSearcxxshResultPage allSearchList={post} />} */}
                            {/* {list === 1 && <RecommendedPostingPage recommendPosting={post.posts} />}
                            {list === 2 && <RecommendedPlacePage recommendPlace={post.locations} />}
                            {list === 3 && <RecommendedSongsPage recommendSong={post.songs} />}
                            {list === 4 && <RecommendedPplerPage recommendPple={post.users} />} */}
                        </div>
                    ))}
                </StSearchResultContainer>
            </StSearchResultContainer>
        </StSearchListContainer>
    );
};

export default SearchListPage;

const StSearchListContainer = styled.div``;

const StSearchInputContainer = styled.div`
    padding: 0 20px;
    border-bottom: 1px solid #2d2d30;
`;

const StSearchResultContainer = styled.div`
    padding: 0 20px;
`;
