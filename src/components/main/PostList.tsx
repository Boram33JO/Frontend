import { styled } from "styled-components";
import {    useState } from "react";
import ListItem from "../common/ListItem";
import { Post } from "../../models/post";
import Category from "../common/Category";
import { getNewestPosts } from "../../api/post";
import { useQuery } from "react-query";

const PostList = () => {
    const [categoryNum, setCategoryNum] = useState<number>(0);
    const { data, isLoading, isError } = useQuery(["newest"],
        async () => {
            const response = await getNewestPosts();
            return response.data;
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
                피플러는 여기서 포스팅 중
            </H3>
            <Category categoryNum={categoryNum} setCategoryNum={setCategoryNum} />
            {data[categoryNum].postByCategoryResponseDtoList.map((post: Post) => {
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
    gap: 20px;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
`