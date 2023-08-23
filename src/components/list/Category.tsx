import { styled } from "styled-components"
import { categoryIcons } from "../../assets/images/category/category";
import React from "react";

interface Props {
    categoryId: number;
    setCategoryId: React.Dispatch<React.SetStateAction<number>>;
}

const Category = ({ categoryId, setCategoryId }: Props) => {
    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];
    return (
        <>
            <StContainer>
                {
                    categories.map((item, index) => {
                        return (
                            <CategoryItem key={index} onClick={() => { setCategoryId(index + 1) }}>
                                <CategoryItemTop $selected={categoryId === (index + 1)}>
                                    <img src={categoryIcons[index]} alt={item} />
                                </CategoryItemTop>
                                <CategoryItemBottom $selected={categoryId === (index + 1)}>
                                    {item}
                                </CategoryItemBottom>
                            </CategoryItem>
                        )
                    })
                }
            </StContainer>
            <StyledHr />
        </>
    )
}

export default Category

const StContainer = styled.div`
    display: flex;
    overflow-x: scroll;
    padding: 20px;
    gap: 10px;

    &::-webkit-scrollbar {
        display: none;
        height: 4px;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #DDDDDD;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: #3A3A3A;
        border-radius: 10px;
    }
`

const CategoryItem = styled.div`
    box-sizing: border-box;
    cursor: pointer;
`

const CategoryItemTop = styled.div<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    border-radius: 26px;
    background-color: ${(props) => props.$selected ? "#C4BEED" : "#434047"};
    box-sizing: border-box;
`

const CategoryItemBottom = styled.div<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${(props) => props.$selected ? "#FAFAFA" : "#A6A3AF"};
    font-size: 16px;
    line-height: 24px;
`

const StyledHr = styled.hr`
    background-color: #242325;
    height: 8px;
    margin: 0;
    border: none;
`