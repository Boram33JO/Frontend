import { keyframes, styled } from "styled-components";
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

const loadingAnimation = keyframes`
    0% { opacity: 1 }
    50% { opacity: 0.5 }
    100% { opacity: 1 }
`;

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
    width: 60px;
    height: 32px;
    border-radius: 30px;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;        
        background: #3B3A40;
        animation: ${loadingAnimation} 2s infinite ease-in-out;
    }
`

const SkeletonDiv = styled.div<{ $width?: string, $height?: string }>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;        
        background: #3B3A40;
        animation: ${loadingAnimation} 2s infinite ease-in-out;
    }
`