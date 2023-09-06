import React from "react";
import NoResult from "./NoResult";
import SearchSongs from "./SearchSongs";

interface RecommendedProps {
    popularSongs: any;
    searchKeyword: string;
}

const RecommendedSongs: React.FC<RecommendedProps> = ({ popularSongs, searchKeyword }) => {
    return (
        <div>
            {popularSongs?.length === 0 ? (
                <NoResult notice={`${searchKeyword}에 관련된 곡을 찾지 못했습니다.`} />
            ) : (
                <SearchSongs popularSongs={popularSongs} />
            )}
        </div>
    );
};

export default RecommendedSongs;
