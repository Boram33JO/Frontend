import { styled } from 'styled-components'

interface Props {
    categoryNum: number;
    setCategoryNum: React.Dispatch<React.SetStateAction<number>>;
}

const Category = ({ categoryNum, setCategoryNum }: Props) => {
    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];
    const categoryClickHandler = (index: number) => {
        setCategoryNum(index);
    }

    return (
        <CategoryList>
            {
                categories.map((category, index: number) => {
                    return (
                        <CategoryListItem key={index} $active={categoryNum === index} onClick={() => categoryClickHandler(index)}>
                            {category}
                        </CategoryListItem>
                    )
                })
            }
        </CategoryList >
    )
}

export default Category

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
        background-color: #DDDDDD;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: #3A3A3A;
        border-radius: 10px;
    }
`

const CategoryListItem = styled.div<{ $active: boolean }>`
    background: ${(props) => (props.$active === true ? "linear-gradient(135deg, #8084F4, #C48FED)" : "#58468B")};
    color: ${(props) => (props.$active === true ? "#FAFAFA" : "#9280BA")};
    border-radius: 30px;

    white-space: nowrap;
    padding: 8px 16px;
    text-align: center;

    box-sizing: border-box;
    cursor: pointer;

    &:hover{
        background: linear-gradient(135deg, #8084F4, #C48FED);
        color: #FAFAFA;
    }
`