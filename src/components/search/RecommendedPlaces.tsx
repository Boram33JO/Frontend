import React from "react";
import styled from "styled-components";
import NoResult from "./NoResult";
import ListItem from "../common/ListItem";

import { Post } from "../../models/post";

interface RecommendedProps {
    popularPlace: any;
    searchKeyword: string;
}

const RecommendedPlaces: React.FC<RecommendedProps> = ({ popularPlace, searchKeyword }) => {
    return (
        <div>
            {popularPlace?.length === 0 ? (
                <NoResult notice={`${searchKeyword}에 관련된 포스팅이 없습니다.`} />
            ) : (
                popularPlace?.map((post: Post) => (
                    <StpopularPlace key={post.postId}>
                        <ListItem post={post} />
                    </StpopularPlace>
                ))
            )}
        </div>
    );
};

export default RecommendedPlaces;

const StpopularPlace = styled.div`
    margin-bottom: 14px;
`;
