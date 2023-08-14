import { styled } from "styled-components";
import {    useState } from "react";
import Nav2 from "./Nav2";
import { Post } from "../../models/post";
import Category from "../common/Category";
import { getNewestPosts } from "../../api/post";
import { useQuery } from "react-query";


// 내가 쓴 포스팅 페이지의 게시물 컴포넌트 
const MyPostList = () => {
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
        
            {/* <Category categoryNum={categoryNum} setCategoryNum={setCategoryNum} /> */}
            {data[categoryNum].postByCategoryResponseDtoList.map((post: Post) => {
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
