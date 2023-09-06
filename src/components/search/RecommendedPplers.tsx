import React from "react";
import NoResult from "./NoResult";

import Ppler from "../../pages/Ppler";

interface RecommendedProps {
    popularPpler: any;
    searchKeyword: string;
}

const RecommendedPplers: React.FC<RecommendedProps> = ({ popularPpler, searchKeyword }) => {
    return (
        <div>
            {popularPpler?.length === 0 ? (
                <NoResult notice={`${searchKeyword}에 피플러가 없습니다`} />
            ) : (
                <Ppler popularPpler={popularPpler} />
            )}
        </div>
    );
};

export default RecommendedPplers;
