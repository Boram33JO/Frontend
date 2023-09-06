import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Search } from "../../assets/images/search.svg";
import { ReactComponent as PrevButton } from "../../assets/images/page_prev.svg";

interface SearchProps {
    searchKeyword: string;
    setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
    getSearch: () => void;
}

const SearchInput: React.FC<SearchProps> = ({ searchKeyword, setSearchKeyword, getSearch }) => {
    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getSearch();
    };

    return (
        <StSearchInputContainer>
            <StPrevButton>
                <PrevButton />
            </StPrevButton>
            <StSearchForm onSubmit={onSubmitHandler}>
                <div>
                    <Search style={{ width: "16px", height: "16px", marginLeft: "16px", marginRight: "12px" }} />
                </div>
                <input
                    placeholder="장소, 음악, 피플러를 검색해 보세요."
                    onChange={changeInputHandler}
                    value={searchKeyword}
                />
            </StSearchForm>
        </StSearchInputContainer>
    );
};

export default SearchInput;

const StSearchInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`;

const StSearchForm = styled.form`
    width: 100%;
    height: 40px;
    color: #fafafa;
    background-color: #434047;
    border-radius: 999px;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    align-items: center;

    input {
        width: 270px;
        height: 16px;
        color: #fafafa;
        border: 1px solid #434047;
        background-color: #434047;
    }
    input:focus {
        outline: none;
    }
`;

const StPrevButton = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
`;
