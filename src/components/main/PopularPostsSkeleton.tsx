import { styled } from 'styled-components'

const PopularPostsSkeleton = () => {
    const dummy = Array.from({ length: 3 }, (_, i) => i);
    return (
        <InnerContainer>
            <TitleSection />
            <CardList>
                {
                    dummy?.map((index) => {
                        return (
                            <CardListItem key={index}>
                                <Card>
                                    <CardBackground />
                                    <ItemCategory />
                                </Card>
                                <PostInfo>
                                    <InfoTop>
                                        <ProfileThumnail />
                                        <ProfileInfo>
                                            <InfoTemp />
                                            <InfoTemp />
                                        </ProfileInfo>
                                    </InfoTop>
                                    <InfoTemp />
                                </PostInfo>
                            </CardListItem>
                        )
                    })
                }
            </CardList>
        </InnerContainer>
    )
}

export default PopularPostsSkeleton


const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    gap: 20px;
`

const TitleSection = styled.div`
    width: 150px;
    height: 26px;
    background-color: #3B3A40;
`

const CardList = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    gap: 15px;
    padding-bottom: 10px;

    &::-webkit-scrollbar {
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

const CardListItem = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    gap: 10px;
    cursor: pointer;
`

const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 258px;
    height: 252px;

    border-radius: 8px;

    box-sizing: border-box;
`

const CardBackground = styled.div`
    width: 100%;
    height: 100%;
    background-color: #373737;

    border-radius: 8px;
    
    box-sizing: border-box;
`

const ItemCategory = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 10px;
    left: 10px;
    height: 30px;
    min-width: 40px;
    background-color: #383549;

    border: 1px solid #70609B;
    border-radius: 30px;
    
    color: #EFEDFF;
    font-size: 14px;
    line-height: 16px;

    box-sizing: border-box;
    padding: 10px;

    pointer-events: none;
`

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    width: 258px;
    height: 90px;
    background-color: #373737;

    border-radius: 8px;
    
    box-sizing: border-box;
    padding: 10px;
    gap: 10px;
`

const InfoTop = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

const ProfileThumnail = styled.div`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #383549;
    border: 1px solid #70609B;
    box-sizing: border-box;
`

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 70%;
`

const InfoTemp = styled.div`
    width: 100%;
    height: 16px;
    background-color: #414141;
`