import React from "react";
import styled from "styled-components";

const Categories = () => {
    const clickCategoryHandler = (categoryId: any) => {
        console.log("categoryId", categoryId);
    };

    const categories = ["공원", "바다", "물가", "레저", "문화공간", "운동", "식당", "학교", "대중교통", "카페", "도서관", "기타"];

    return (
        <>
            <CategoryLists>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        onClick={() => clickCategoryHandler(index + 1)}
                    >
                        {category}
                    </div>
                ))}
            </CategoryLists>
        </>
    );
};

export default Categories;

const CategoryLists = styled.div`
    overflow-y: hidden;
    overflow-x: scroll;
    /* height: 200px; */

    div {
        width: 60px;
        height: 32px;
        border: 1px solid black;
        list-style-type: none;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
`;
