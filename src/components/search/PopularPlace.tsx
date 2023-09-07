import React from "react";
import styled from "styled-components";

interface SearchProps {
    searchPlace: any;
    setSearchPlace: any;
}

const PopularPlace: React.FC<SearchProps> = ({ searchPlace, setSearchPlace }) => {
    return (
        <>
            {searchPlace &&
                searchPlace.slice(0, 8).map((item: any, index: number) => (
                    <StPlacelogo key={index}>
                        <span>{item}</span>
                    </StPlacelogo>
                ))}
        </>
    );
};

export default PopularPlace;

const StPlacelogo = styled.div`
    box-sizing: border-box;
    padding: 4px 14px;
    text-align: start;

    border-radius: 25px;
    background: #3b3a40;
    span {
        color: #eae9f4;
        font-size: 16px;
        font-weight: 500;
        line-height: 100%;
    }
`;
