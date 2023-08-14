import { styled } from "styled-components";
import {    useState } from "react";
import Nav2 from "./Nav2";
import { Post } from "../../models/post";
import Category from "../common/Category";
import { getMyPostLists } from "../../api/profile";
import { useQuery } from "react-query";

interface Props {
    userId?: string;
}

// 내가 쓴 포스팅 페이지의 게시물 컴포넌트 
const MyPostList = ({userId}: Props) => {
    // const [categoryNum, setCategoryNum] = useState<number>(0);
    const { data, isLoading, isError } = useQuery(["myPost"],
        async () => {
            const response = await getMyPostLists(userId);
            console.log("내 게시글", response);
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
            {data.map((post: Post) => {
                return (
                    <Nav2 key={post.postId} post={post} />
                )
            })}
        </InnerContainer>
    )
}

export default MyPostList;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    gap: 20px;
`
