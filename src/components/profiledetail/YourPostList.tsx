import { styled } from "styled-components";
import { useQuery } from "react-query";

interface FavListProps {
    userId?: string;
}

const YourPostList = ({ userId }: FavListProps) => {

    // const { data, isLoading, isError } = useQuery(["favorite"],
    //     async () => {
    //         const response = await getFavLists(userId);
    //         // console.log(response);
    //         return response.data;
    //     }
    // )

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }

    // if (isError) {
    //     return <div>Error...</div>
    // }

    return (
        <InnerContainer>
            {/* {data.map((post: Post) => {
                return (
                    <Nav2 key={post.postId} post={post} />
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
