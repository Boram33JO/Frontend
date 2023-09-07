import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Search } from "../../assets/images/search.svg";
import { ReactComponent as PrevButton } from "../../assets/images/page_prev.svg";
import { useNavigate } from "react-router-dom";

interface SearchProps {
    searchKeyword: string;
    setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
    getSearch: () => void;
}

const SearchInput: React.FC<SearchProps> = ({ searchKeyword, setSearchKeyword, getSearch }) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState<string>("");

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchKeyword(inputValue); // 검색어를 설정
        getSearch();
        navigate(`/search/${inputValue}`);
    };

    const onclickPrev = () => {
        navigate(`/search`);
    };

    return (
        <StSearchInputContainer>
            <StPrevButton>
                <PrevButton onClick={onclickPrev} />
            </StPrevButton>
            <StSearchForm onSubmit={onSubmitHandler}>
                <div>
                    <Search style={{ width: "16px", height: "16px", marginLeft: "16px", marginRight: "12px" }} />
                </div>
                <input
                    placeholder="장소, 음악, 피플러를 검색해 보세요."
                    onChange={changeInputHandler}
                    value={inputValue} // inputValue 값을 표시
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
    cursor: pointer;
`;
