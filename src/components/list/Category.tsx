import { styled } from "styled-components"
import ScrollableComponent from "./ScrollableComponent"
import { useNavigate } from "react-router-dom";

const Category: React.FC = () => {
    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];
    const navigate = useNavigate();
    return (
        <>
            <ScrollableComponent>
                <StContainer>
                    {
                        categories.map((item, index: number) => {
                            return (
                                <CategoryItem key={index} onClick={() => {navigate(`/list/${index + 1}`)}}>
                                    <CategoryItemTop></CategoryItemTop>
                                    <CategoryItemBottom>
                                        {item}
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