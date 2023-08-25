import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { Post } from "../../models/post";
import { useQuery } from "react-query";
import { getFavLists } from "../../api/profile";
import ListItem from "../common/ListItem";

const FavListAll = () => {
  const { userId } = useParams();

  const { data, isLoading, isError } = useQuery(["wishList"], async () => {
    const response = await getFavLists(userId);
    // console.log("좋아요함 response:", response); // response를 console에 출력
    // console.log("포스트 response:", response.data.nickname);
    //console.log("좋아요함 data:", response.data); // 확인용 로그
    return response.data.content;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      <InnerContainer>
        <TitleSection>
          <H3>{data.nickname}포스팅</H3>
        </TitleSection>
        {data.map((post: Post) => {
          return <ListItem key={post.postId} post={post}></ListItem>;
        })}
      </InnerContainer>
    </>
  );
};

export default FavListAll;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  padding-top: 40px;
  gap: 20px;
`;

const TitleSection = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  justify-content: space-between;
  align-items: center; // 요소들을 수직 가운데 정렬하기 위해 추가
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: #e7e6f0;
`;
