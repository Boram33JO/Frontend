import { styled } from "styled-components"
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as UnSelected } from '../../assets/images/category/category_no.svg'
import { ReactComponent as Selected } from '../../assets/images/category/category_select.svg'
import { ReactComponent as Popular } from '../../assets/images/category/category_01_popular.svg'
import { ReactComponent as Near } from '../../assets/images/category/category_02_near.svg'
import { ReactComponent as Cafe } from '../../assets/images/category/category_03_cafe.svg'
import { ReactComponent as Restaurant } from '../../assets/images/category/category_04_restaurant.svg'
import { ReactComponent as Transport } from '../../assets/images/category/category_05_transport.svg'
import { ReactComponent as School } from '../../assets/images/category/category_06_school.svg'
import { ReactComponent as Exercise } from '../../assets/images/category/category_07_exercise.svg'
import { ReactComponent as Park } from '../../assets/images/category/category_08_park.svg'
import { ReactComponent as Liver } from '../../assets/images/category/category_01_popular.svg'
import { ReactComponent as Sea } from '../../assets/images/category/category_10_sea.svg'
import { ReactComponent as Library } from '../../assets/images/category/category_11_library.svg'
import { ReactComponent as Culture } from '../../assets/images/category/category_01_popular.svg'
import { ReactComponent as Leisure } from '../../assets/images/category/category_13_leisure.svg'
import { ReactComponent as Etc } from '../../assets/images/category/category_01_popular.svg'

const Category = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const categories = [
        { id: "1", imageKey: Popular, name: "인기" },
        { id: "2", imageKey: Near, name: "내 주변" },
        { id: "3", imageKey: Cafe, name: "카페" },
        { id: "4", imageKey: Restaurant, name: "식당" },
        { id: "5", imageKey: Transport, name: "대중교통" },
        { id: "6", imageKey: School, name: "학교" },
        { id: "7", imageKey: Exercise, name: "운동" },
        { id: "8", imageKey: Park, name: "공원" },
        { id: "9", imageKey: Liver, name: "물가" },
        { id: "10", imageKey: Sea, name: "바다" },
        { id: "11", imageKey: Library, name: "도서관" },
        { id: "12", imageKey: Culture, name: "문화공간" },
        { id: "13", imageKey: Leisure, name: "레저" },
        { id: "14", imageKey: Etc, name: "기타" }
    ];
    return (
        <>
            <StContainer>
                {
                    categories.map((item) => {
                        return (
                            <CategoryItem key={item.id} onClick={() => { navigate(`/list/${item.id}`) }}>
                                <CategoryItemTop>
                                    {id === item.id ? <Selected /> : <UnSelected />}
                                    <CategoryItemImage>
                                        <item.imageKey />
                                    </CategoryItemImage>
                                </CategoryItemTop>
                                <CategoryItemBottom $selected={id === item.id}>
                                    {item.name}
                                </CategoryItemBottom>
                            </CategoryItem>
                        )
                    })
                }
            </StContainer>
            <StyledHr />
        </>
    )
}

export default Category

const StContainer = styled.div`
    display: flex;
    overflow-x: scroll;
    padding: 20px;
    gap: 10px;

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

const CategoryItem = styled.div`
    box-sizing: border-box;
    cursor: pointer;
`

const CategoryItemTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
`

const CategoryItemImage = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
`

const CategoryItemBottom = styled.div<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${(props) => props.$selected ? "#FAFAFA" : "#A6A3AF"};
    font-size: 16px;
    line-height: 24px;
`

const StyledHr = styled.hr`
    background-color: #242325;
    height: 8px;
    margin: 0;
    border: none;
`