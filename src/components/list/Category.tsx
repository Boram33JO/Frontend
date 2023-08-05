import { styled } from "styled-components"
import ScrollableComponent from "./ScrollableComponent"
import { useNavigate } from "react-router-dom"

const Category: React.FC = () => {
    const navigate = useNavigate();
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
        <ScrollableComponent>
            <StContainer>
                {
                    categories.map(item => {
                        return (
                            <CategoryItem key={item.id}>
                                {item.category}
                            </CategoryItem>
                        )
                    })
                }
            </StContainer>
        </ScrollableComponent>
    )
}

export default Category

const StContainer = styled.div`
    display: flex;
    padding: 20px;
    gap: 20px;
`

const CategoryItem = styled.div`
    background-color: #EEEEEE;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
`