import React from "react";
import styled from "styled-components";

const Categories = () => {
    const clickCategoryHandler = (categoryId: any) => {
        console.log("categoryId", categoryId);
    };

    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];

    return (
        <StScroll>
            {/* <ScrollableComponent> */}
            <StContainer>
                {categories.map((category, index) => (
                    <CategoryItem
                        key={index}
                        onClick={() => clickCategoryHandler(index + 1)}
                    >
                        {category}
                    </CategoryItem>
                ))}
            </StContainer>
            {/* </ScrollableComponent> */}
        </StScroll>
    );
};

export default Categories;

const StScroll = styled.div`
    overflow-x: scroll;
    overflow-y: hidden;
    /* 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox, IE, Edge */
    &::-webkit-scrollbar {
        width: 0 !important;
        display: none;
    }
`;

const StContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const CategoryItem = styled.div`
    color: #fff;
    background-color: #8084f3;
    padding: 3px 10px;
    border-radius: 20px;
    white-space: nowrap; /* 가로로 출력 */

    box-sizing: border-box;
    cursor: pointer;
`;
