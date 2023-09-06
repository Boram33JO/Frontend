import React from "react";
import styled from "styled-components";

interface NavigationProps {
    list: number;
    setList: (newValue: number) => void;
}

const Navigation = ({ list, setList }: NavigationProps) => {
    const categories = ["전체", "포스팅", "장소", "곡", "피플러"];
    const categoryClickHandler = (index: number) => {
        setList(index);
    };

    return (
        <StNavigationContainer>
            {categories.map((category, index) => {
                return (
                    <StNavigation
                        key={index}
                        $active={list === index}
                        onClick={() => categoryClickHandler(index)}
                    >
                        {category}
                    </StNavigation>
                );
            })}
        </StNavigationContainer>
    );
};

export default Navigation;

const StNavigationContainer = styled.div`
    display: flex;
    flex-direction: row;
    /* justify-content: flex-start; */
`;

const StNavigation = styled.div<{ $active: boolean }>`
    color: ${(props) => (props.$active ? "#FAFAFA" : "#7D7B85")};
    padding: 14px 16px 14px 0;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
    box-sizing: border-box;
    cursor: pointer;
`;
