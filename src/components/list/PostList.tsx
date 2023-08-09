import { styled } from "styled-components";
import SortButton from "./SortButton";
import { useEffect, useState } from "react";
import instance from "../../api/common";
import { useParams } from "react-router-dom";
import ListItem from "./ListItem";
import { Comment } from "../../pages/DetailPage";

type Location = {
    id: string;
    address: string;
    latitude: number;
    longtitude: number;
    placeName: string;
}

type Song = {
    id: string;
    album: string;
    artistName: string;
    songTitle: string;
    thumbnail: string;
    audioUrl: string;
    externalUrl: string;
}

export type Post2 = {
    postId: number;
    postTitle: string;
    category: string;
    content: string;
    nickname: string;
    userImage: string;
    location?: Location;
    createdAt: string;
    wishlistCount: number;
    songs: Song[];
    comments: Comment[];
}

const PostList: React.FC = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState<Post2[]>([]);
    const [sortBy, setSortBy] = useState<"Oldest" | "Newest" | "LikeCount">("Newest");
    const [isLast, setIsLast] = useState("false");
    const [currentPage, setCurrentPage] = useState(0);

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

    useEffect(() => {
        const data = async () => {
            try {
                const response = await instance.get(`api/posts/category/${id}`,
                    {
                        params: {
                            page: 0,
                            size: 3
                        }
                    }
                )
                setPosts(response.data.content);
                setIsLast(response.data.last);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        data();
    }, [id]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
            instance.get(`/api/posts/category/${id}`,
                {
                    params: {
                        page: currentPage + 1,
                        size: 3
                    }
                }).then((response) => {
                    console.log(response);
                    setPosts((prevPosts) => [...prevPosts, ...response.data.content]);

                    setCurrentPage((prevPage) => prevPage + 1);
                }).catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <InnerContainer>
            <H3>
                category 포스팅
            </H3>
            <SortButton
                handleSortByOldest={handleSortByOldest}
                handleSortByNewest={handleSortByNewest}
                handleSortByLikeCount={handleSortByLikeCount}
                activeSort={sortBy}
            />
            {posts.map((post: Post2) => {
                return (
                    <ListItem key={post.postId} post={post} />
                )
            })}
        </InnerContainer>
    )
}

export default PostList

const InnerContainer = styled.div`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;

    background-color: black;
    color: white;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    margin-bottom: 10px;
`