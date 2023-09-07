import React from "react";
import styled from "styled-components";
import NoResult from "./NoResult";
import ListItem from "../common/ListItem";

import { Post } from "../../models/post";

interface RecommendedProps {
    popularPosts: any;
    searchKeyword: string;
}

const RecommendedPosts: React.FC<RecommendedProps> = ({ popularPosts, searchKeyword }) => {
    return (
        <div>
            {popularPosts?.length === 0 ? (
                <NoResult notice={`${searchKeyword}에 관련된 포스팅이 없습니다.`} />
            ) : (
                popularPosts?.map((post: Post) => (
                    <StPopularPosts key={post.postId}>
                        <ListItem post={post} />
                    </StPopularPosts>
                ))
            )}
        </div>
    );
};

export default RecommendedPosts;

const StPopularPosts = styled.div`
    margin-bottom: 14px;
`;
