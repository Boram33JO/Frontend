import { styled } from "styled-components";
import { debounce } from "../../utils/common";
interface Props {
    categoryNum: number;
    setCategoryNum: React.Dispatch<React.SetStateAction<number>>;
    mappingCategoryHandler: (index: number) => void;
}

const Categories = ({ categoryNum, setCategoryNum, mappingCategoryHandler }: Props) => {
    const categories = ["전체", "카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];
    const categoryClickHandler = debounce((index: number) => {
        setCategoryNum(index);
        mappingCategoryHandler(index);
    }, 300);

    return (
        <CategoryList>
            {categories.map((category, index: number) => {
                return (
                    <CategoryListItem
                        key={index}
                        $active={categoryNum === index}
                        onClick={() => categoryClickHandler(index)}
                    >
                        {category}
                    </CategoryListItem>
                );
            })}
        </CategoryList>
    );
};

export default Categories;

const CategoryList = styled.div`
    display: flex;
    gap: 10px;
    box-sizing: border-box;
    overflow-x: scroll;
    /* padding-bottom: 10px; */

    &::-webkit-scrollbar {
        display: none;
        height: 4px;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #dddddd;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: #3a3a3a;
        border-radius: 10px;
    }
`;

const CategoryListItem = styled.div<{ $active: boolean }>`
    background: ${(props) => (props.$active === true ? "#7462E2" : "#3B3A40")};
    color: ${(props) => (props.$active === true ? "#FAFAFA" : "#63616B")};
    border-radius: 30px;
    white-space: nowrap;
    padding: 4px 16px;
    text-align: center;
    font-weight: 600;

    box-sizing: border-box;
    cursor: pointer;
`;
