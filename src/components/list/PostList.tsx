import { styled } from "styled-components";
import SortButton from "./SortButton";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ListItem from "../common/ListItem";
import { Post } from "../../models/post";
import { useQuery } from "react-query";
import { getPostLists } from "../../api/post";

const PostList: React.FC = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState<Post[]>([]);
    const [sortBy, setSortBy] = useState<"Oldest" | "Newest" | "LikeCount">("Newest");
    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];

    const handleSortByOldest = () => {
        const sortedPosts = [...posts].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        setPosts(sortedPosts);
        setSortBy("Oldest");
    }

    const handleSortByNewest = () => {
        const sortedPosts = [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setPosts(sortedPosts);
        setSortBy("Newest");
    }

    const handleSortByLikeCount = () => {
        const sortedPosts = [...posts].sort((a, b) => b.wishlistCount - a.wishlistCount);
        setPosts(sortedPosts);
        setSortBy("LikeCount");
    }

    const { data, isLoading, isError } = useQuery(["lists", id],
        async () => {
            const response = await getPostLists(id);
            // console.log(response);
            setPosts(response.data.content);
            return response.data.content;
        }
    )

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error...</div>
    }

    return (
        <InnerContainer>
            <H3>
                {categories[Number(id) - 1]} 포스팅
            </H3>
            <SortButton
                handleSortByOldest={handleSortByOldest}
                handleSortByNewest={handleSortByNewest}
                handleSortByLikeCount={handleSortByLikeCount}
                activeSort={sortBy}
            />
            {posts.map((post: Post) => {
                return (
                    <ListItem key={post.postId} post={post} />
                )
            })}
        </InnerContainer>
    )
}

export default PostList

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;

    background-color: black;
    color: white;
    gap: 20px;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
`