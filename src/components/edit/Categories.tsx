import React from "react";
import styled from "styled-components";

const Categories = () => {
    const clickCategoryHandler = (categoryId: any) => {
        console.log("categoryId", categoryId);
    };
    
    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];

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
