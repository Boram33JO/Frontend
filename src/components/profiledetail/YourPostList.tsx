import { styled } from "styled-components";
import { useState } from "react";
import { Post } from "../../models/post";
import Category from "../common/Category";
import { getFavLists } from "../../api/profile";
import { useQuery } from "react-query";
import ListItem from "../common/ListItem";
import { useParams } from "react-router-dom";
const YourPostList = () => {
    const { userId } = useParams();
    const [categoryNum, setCategoryNum] = useState<number>(0);
    const { data, isLoading, isError } = useQuery(["favorite"],
        async () => {
            const response = await getFavLists(userId);
            console.log(response);
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
            <Category categoryNum={categoryNum} setCategoryNum={setCategoryNum} />
            {/* {data[categoryNum].postByCategoryResponseDtoList.map((post: Post) => {
                return (
                    <ListItem key={post.postId} post={post} />
                )
            })} */}
        </InnerContainer>
    )
}

export default YourPostList;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    gap: 20px;
`
