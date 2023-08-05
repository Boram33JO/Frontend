import { styled } from "styled-components";
import SortButton from "./SortButton";
import { useEffect, useState } from "react";

interface Post {
    id: number;
    content: string;
    category: string;
    createdAt: string;
    likeCount: number;
}

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            content: "가나다라마",
            category: "카페",
            createdAt: "20230801",
            likeCount: 10
        },
        {
            id: 2,
            content: "가나다라마",
            category: "카페",
            createdAt: "20230802",
            likeCount: 19
        },
        {
            id: 3,
            content: "가나다라마",
            category: "카페",
            createdAt: "20230803",
            likeCount: 80
        },
        {
            id: 4,
            content: "가나다라마",
            category: "도서관",
            createdAt: "20230804",
            likeCount: 76
        },
        {
            id: 5,
            content: "가나다라마",
            category: "도서관",
            createdAt: "20230805",
            likeCount: 6
        },
    ]);
    const [sortBy, setSortBy] = useState<"Oldest" | "Newest" | "LikeCount">("Newest");

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
        const sortedPosts = [...posts].sort((a, b) => b.likeCount - a.likeCount);
        setPosts(sortedPosts);
        setSortBy("LikeCount");
    }

    useEffect(() => {
        handleSortByNewest();
    }, [])

    return (
        <InnerContainer>
            <SortButton
                handleSortByOldest={handleSortByOldest}
                handleSortByNewest={handleSortByNewest}
                handleSortByLikeCount={handleSortByLikeCount}
                activeSort={sortBy}
            />
            <ul>
                {posts.map((post) => {
                    return (
                        <li key={post.id} style={{ marginBottom: "10px" }}>
                            <span>　내용 : {post.content}</span>
                            <br />
                            <span>작성일 : {post.createdAt}</span>
                            <br />
                            <span>좋아요 : {post.likeCount}</span>
                            <br />
                        </li>
                    )
                })}
            </ul>
        </InnerContainer>
    )
}

export default PostList

const InnerContainer = styled.div`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 0px 20px;
`