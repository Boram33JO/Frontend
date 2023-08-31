import { keyframes, styled } from 'styled-components'

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

const loadingAnimation = keyframes`
    0% { opacity: 1 }
    50% { opacity: 0.5 }
    100% { opacity: 1 }
`;

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
    height: 23px;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;        
        background: #515151;
        animation: ${loadingAnimation} 2s infinite ease-in-out;
    }
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
    width: 50px;

    border: 1px solid transparent;
    border-radius: 30px;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;        
        background: #515151;
        animation: ${loadingAnimation} 2s infinite ease-in-out;
    }

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
    border: 1px solid transparent;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;        
        background: #515151;
        animation: ${loadingAnimation} 2s infinite ease-in-out;
    }
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
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;        
        background: #515151;
        animation: ${loadingAnimation} 2s infinite ease-in-out;
    }
`