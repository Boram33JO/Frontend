import { styled } from "styled-components"
import ScrollableComponent from "./ScrollableComponent"

const Category: React.FC = () => {
    const categories = [
        {
            id: 1,
            category: "인기"
        },
        {
            id: 2,
            category: "내주변"
        },
        {
            id: 3,
            category: "카페"
        },
        {
            id: 4,
            category: "도서관"
        },
        {
            id: 5,
            category: "테스트"
        },
        {
            id: 6,
            category: "테스트"
        },
        {
            id: 7,
            category: "테스트"
        },
        {
            id: 8,
            category: "테스트"
        },
        {
            id: 9,
            category: "테스트"
        },
        {
            id: 10,
            category: "테스트"
        },
    ]
    return (
        <>
            <ScrollableComponent>
                <StContainer>
                    {
                        categories.map(item => {
                            return (
                                <CategoryItem key={item.id}>
                                    <CategoryItemTop></CategoryItemTop>
                                    <CategoryItemBottom>
                                        {item.category}
                                    </CategoryItemBottom>
                                </CategoryItem>
                            )
                        })
                    }
                </StContainer>
            </ScrollableComponent>
            <StyledHr />
        </>
    )
}

export default Category

const StContainer = styled.div`
    display: flex;
    background-color: black;
    padding: 20px;
    gap: 15px;
`

const CategoryItem = styled.div`
    background-color: black;
    box-sizing: border-box;
    cursor: pointer;
`

const CategoryItemTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: pink;
    height: 72px;
    width: 72px;
`

const CategoryItemBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #EEEEEE;

    font-size: 16px;
    line-height: 24px;
`

const StyledHr = styled.hr`
    background-color: #242325;
    height: 8px;
    margin: 0;
    border: none;
`