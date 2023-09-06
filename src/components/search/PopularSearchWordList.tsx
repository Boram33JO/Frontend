import React from "react";
import styled from "styled-components";
import { ReactComponent as UpIcon } from "../../assets/images/up.svg";
interface SearchProps {
    searchKeyword: any;
    onClick: () => void;
}

const PopularSearchWordList: React.FC<SearchProps> = ({ searchKeyword, onClick }) => {
    return (
        <StSearchWordContainer>
            <ListContainer>
                {searchKeyword.map((item: any, index: number) => (
                    <StLanking>
                        <StNumber>{index + 1}</StNumber>
                        <StPopularSearchWord>{item}</StPopularSearchWord>
                    </StLanking>
                ))}
            </ListContainer>
            <UpIcon onClick={onClick} />
        </StSearchWordContainer>
    );
};

export default PopularSearchWordList;

const StSearchWordContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 8px;
    padding: 20px 14px;
    border: 1px solid #7462e2;
    color: #fafafa;
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const StLanking = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 14px;
`;

const StNumber = styled.div`
    margin-right: 14px;
    width: 18px;
`;

const StPopularSearchWord = styled.div``;
