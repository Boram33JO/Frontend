import { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import Category from "../components/list/Category"
import SortButton from "../components/list/SortButton";
import ListItem from "../components/common/ListItem";
import LoadingSkeleton from "../components/list/LoadingSkeleton";
import { Post } from "../models/post";
import instance from "../api/common";
import { useMiddleRef } from "../components/common/Layout";
import { throttle } from "../utils/common";

export interface PaginationResponse<T> {
    content: T[];
    number: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    last: boolean;
    first: boolean;
}

const ListPage = () => {
    const [page, setPage] = useState<number>(0);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isFetching, setFetching] = useState<boolean>(false);
    const [hasNextPage, setNextPage] = useState<boolean>(true);
    const [categoryId, setCategoryId] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>("createdAt");
    const [direction, setDirection] = useState<string>("desc");
    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];
    const middleRef = useMiddleRef();

    const fetchPosts = useCallback(async () => {
        const { data } = await instance.get<PaginationResponse<Post>>(`/posts/category/${categoryId}`, {
            params: { page, size: 10, sortBy, direction },
        })
        // console.log(data);
        setPosts(posts.concat(data.content))
        setPage(data.number + 1)
        setNextPage(!data.last)
        setFetching(false)
    }, [page])

    useEffect(() => {
        const handleScroll = throttle(() => {
            if (middleRef?.current) {
                if (window.innerHeight + middleRef.current.scrollTop + 100 >= middleRef.current.scrollHeight) {
                    setFetching(true)
                }
            }
        });
        setFetching(true)
        if (middleRef?.current) middleRef.current.addEventListener('scroll', handleScroll)
        return () => { if (middleRef?.current) { middleRef.current.removeEventListener('scroll', handleScroll) } }
    }, [middleRef])

    useEffect(() => {
        if (isFetching && hasNextPage) fetchPosts()
        else if (!hasNextPage) setFetching(false)
    }, [isFetching])

    useEffect(() => {
        setFetching(true);
        setNextPage(true);
        setPosts([]);
        setPage(0);
        console.log("정렬 기준", sortBy, direction);
    }, [categoryId, sortBy, direction])

    return (
        <>
            <Category categoryId={categoryId} setCategoryId={setCategoryId} />
            <InnerContainer>
                <H3>
                    {categories[categoryId - 1]} 포스팅
                </H3>
                <SortButton
                    setSortBy={setSortBy}
                    setDirection={setDirection}
                />
                {posts.map((post: Post) => {
                    return (
                        <ListItem key={post.postId} post={post} />
                    )
                })}
                {(isFetching && hasNextPage) && <LoadingSkeleton />}
            </InnerContainer>
        </>
    )
}

export default ListPage


const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;

    color: white;
    gap: 20px;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
`
