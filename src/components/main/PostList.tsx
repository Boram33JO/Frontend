import { styled } from "styled-components";
import { useState } from "react";
import ListItem from "../common/ListItem";
import { Post } from "../../models/post";
import Category from "../common/Category";
import { getNewestPosts } from "../../api/post";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const PostList = () => {
    const navigate = useNavigate();
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
            <TitleSection>
                <H3>
                    피플러는 여기서 포스팅 중
                </H3>
                <P onClick={() => navigate(`/list`)}>
                    전체 보기
                </P>
            </TitleSection>
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

const TitleSection = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: 26px;
    font-weight: 600;
`

const P = styled.p`
    color: #CCCCCC;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        color: #FAFAFA;
    }
`