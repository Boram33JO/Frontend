import { styled } from 'styled-components'

const Recommend = () => {
    const category = [
        {
            id: "1",
            name: "내위치"
        },
        {
            id: "2",
            name: "카페"
        },
        {
            id: "3",
            name: "공원"
        },
        {
            id: "4",
            name: "강"
        },
        {
            id: "5",
            name: "도서관"
        }
    ]
    return (
        <InnerContainer>
            <H3>
                OO가 추천드려요
            </H3>
            <CategoryList>
                {
                    category.map(item => {
                        return (
                            <CategoryListItem>
                                <CategoryListItemName>
                                    {item.name}
                                </CategoryListItemName>
                            </CategoryListItem>
                        )
                    })
                }
            </CategoryList>
            <MusicList>
                <MusicListItem>
                    테스트
                </MusicListItem>
                <MusicListItem>
                    테스트
                </MusicListItem>
            </MusicList>
        </InnerContainer>
    )
}

export default Recommend

const InnerContainer = styled.div`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 48px;

    background-color: #EEEEEE;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    margin-bottom: 10px;
`

const CategoryList = styled.div`
    display: flex;
    gap: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
`

const CategoryListItem = styled.div`
    width: 70px;

    background-color: #D2D2D2;
    
    border-radius: 30px;

    padding: 10px;
    text-align: center;

    box-sizing: border-box;
    cursor: pointer;

    &:hover{
        opacity: 0.7;
    }
`

const CategoryListItemName = styled.span`
    font-size: 14px;
    line-height: 14px;
`

const MusicList = styled.ol`
    display: block;
`

const MusicListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
`