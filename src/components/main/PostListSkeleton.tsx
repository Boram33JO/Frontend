import { styled } from "styled-components";
import ListItemSkeleton from "../common/ListItemSkeleton";

const PostListSkeleton = () => {
    const dummy = Array.from({ length: 3 }, (_, i) => i);

    return (
        <InnerContainer>
            <TitleSection>
                <SkeletonDiv $width={"206px"} $height={"24px"} />
            </TitleSection>
            <ContentSection>
                <CategoryList>
                    {dummy.map((_, index) => { return <CategoryListItem key={index} /> })}
                </CategoryList>
                {dummy.map((_, index) => {
                    return (
                        <ListItemSkeleton key={index} />
                    )
                })}
            </ContentSection>
        </InnerContainer>
    )
}

export default PostListSkeleton

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    gap: 16px;
`

const TitleSection = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`

const ContentSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const CategoryList = styled.div`
    display: flex;
    gap: 10px;
    box-sizing: border-box;
`

const CategoryListItem = styled.div`
    background: #3B3A40;
    width: 60px;
    height: 32px;
    border-radius: 30px;
    
    box-sizing: border-box;

    cursor: pointer;
`

const SkeletonDiv = styled.div<{ $width?: string, $height?: string }>`
    background-color: #3B3A40;
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
`