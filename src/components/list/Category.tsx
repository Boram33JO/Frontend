import { styled } from "styled-components"
import { useNavigate, useParams } from "react-router-dom";
// import popular from '../../assets/images/category/01_popular.svg'
// import near from '../../assets/images/category/02_near.svg'
import cafe from '../../assets/images/category/03_cafe.svg'
import restaurant from '../../assets/images/category/04_restaurant.svg'
import transport from '../../assets/images/category/05_transport.svg'
import school from '../../assets/images/category/06_school.svg'
import exercise from '../../assets/images/category/07_exercise.svg'
import park from '../../assets/images/category/08_park.svg'
import liver from '../../assets/images/category/09_liver.svg'
import sea from '../../assets/images/category/10_sea.svg'
import library from '../../assets/images/category/11_library.svg'
import culture from '../../assets/images/category/12_culture.svg'
import leisure from '../../assets/images/category/13_leisure.svg'
import etc from '../../assets/images/category/14_etc.svg'

const Category = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const categories = [
        // { id: "1", src: popular, name: "인기" },
        // { id: "2", src: near, name: "내 주변" },
        { id: "3", src: cafe, name: "카페" },
        { id: "4", src: restaurant, name: "식당" },
        { id: "5", src: transport, name: "대중교통" },
        { id: "6", src: school, name: "학교" },
        { id: "7", src: exercise, name: "운동" },
        { id: "8", src: park, name: "공원" },
        { id: "9", src: liver, name: "물가" },
        { id: "10", src: sea, name: "바다" },
        { id: "11", src: library, name: "도서관" },
        { id: "12", src: culture, name: "문화공간" },
        { id: "13", src: leisure, name: "레저" },
        { id: "14", src: etc, name: "기타" }
    ];
    return (
        <>
            <StContainer>
                {
                    categories.map((item, index) => {
                        return (
                            <CategoryItem key={item.id} onClick={() => { navigate(`/list/${index + 1}`) }}>
                                <CategoryItemTop $selected={Number(id) === (index + 1)}>
                                    <img src={item.src} alt={item.name} />
                                </CategoryItemTop>
                                <CategoryItemBottom $selected={Number(id) === (index + 1)}>
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

const CategoryItemTop = styled.div<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    border-radius: 26px;
    background-color: ${(props) => props.$selected ? "#C4BEED" : "#434047"};
    box-sizing: border-box;
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