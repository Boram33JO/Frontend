// import { styled } from "styled-components";
// import SortButton from "./SortButton";
// import { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ListItem from "../common/ListItem";
// import { Post } from "../../models/post";
// import instance from "../../api/common";
// import LoadingSkeleton from "./LoadingSkeleton";
// import useInfiniteScroll from "../../hooks/useInfiniteScroll";

// export interface PaginationResponse<T> {
//     content: T[];
//     number: number;
//     pageSize: number;
//     totalPages: number;
//     totalCount: number;
//     last: boolean;
//     first: boolean;
// }

// const PostList = () => {
//     const { id } = useParams();
//     const [page, setPage] = useState(0);
//     const [posts, setPosts] = useState<Post[]>([]);
//     const [isFetching, setFetching] = useState(false);
//     const [hasNextPage, setNextPage] = useState(true);
//     const [sortBy, setSortBy] = useState<"Oldest" | "Newest" | "LikeCount">("Newest");
//     const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];

//     const handleSortByOldest = () => {
//         const sortedPosts = [...posts].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
//         setPosts(sortedPosts);
//         setSortBy("Oldest");
//     }

//     const handleSortByNewest = () => {
//         const sortedPosts = [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
//         setPosts(sortedPosts);
//         setSortBy("Newest");
//     }

//     const handleSortByLikeCount = () => {
//         const sortedPosts = [...posts].sort((a, b) => b.wishlistCount - a.wishlistCount);
//         setPosts(sortedPosts);
//         setSortBy("LikeCount");
//     }

//     const fetchPosts = useCallback(async () => {
//         try {
//             const { data } = await instance.get<PaginationResponse<Post>>(`api/posts/category/${id}`, {
//                 params: { page, size: 5 },
//             });
    
//             // 아래 코드를 통해 'content' 속성에 접근하여 데이터를 가져옵니다.
//             const responseData = data.content;
    
//             setPosts(posts.concat(responseData));
//             setPage(data.number + 1);
//             setNextPage(!data.last);
//             setFetching(false);
//         } catch (error) {
//             console.error("게시물을 가져오는 중 오류 발생:", error);
//         }
//     }, [page]);

//     useEffect(() => {
//         const handleScroll = () => {
//             const { scrollTop, offsetHeight } = document.documentElement
//             if (window.innerHeight + scrollTop >= offsetHeight) {
//                 setFetching(true)
//             }
//         }
//         setFetching(true)
//         window.addEventListener('scroll', handleScroll)
//         return () => window.removeEventListener('scroll', handleScroll)
//     }, [])

//     useEffect(() => {
//         if (isFetching && hasNextPage) fetchPosts()
//         else if (!hasNextPage) setFetching(false)
//     }, [isFetching])

//     useEffect(() => {
//         setFetching(true);
//         setNextPage(true);
//         setPosts([]);
//         setPage(0);
//         setSortBy("Newest");
//     }, [id])

//     return (
//         <InnerContainer>
//             <H3>
//                 {categories[Number(id) - 1]} 포스팅
//             </H3>
//             <SortButton
//                 handleSortByOldest={handleSortByOldest}
//                 handleSortByNewest={handleSortByNewest}
//                 handleSortByLikeCount={handleSortByLikeCount}
//                 activeSort={sortBy}
//             />
//             {posts.map((post: Post) => {
//                 return (
//                     <ListItem key={post.postId} post={post} />
//                 )
//             })}
//             {isFetching && <LoadingSkeleton />}
//         </InnerContainer>
//     )
// }

// export default PostList

// const InnerContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     box-sizing: border-box;
//     padding: 20px;

//     color: white;
//     gap: 20px;
// `

// const H3 = styled.h3`
//     font-size: 20px;
//     line-height: 24px;
//     font-weight: 600;
// `
export{}