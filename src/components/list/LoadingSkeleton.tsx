import { styled } from "styled-components"

const LoadingSkeleton = () => {
    const dummy = Array.from({ length: 10 }, (_, i) => i);
    return (
        <>
            {dummy.map((index) => {
                return (
                    <ListItemContainer key={index}>
                        <ListItemBackground>
                            <ListItemTop>
                                <ProfileArea>
                                    <ProfileThumnail />
                                    <ProfileInfo>
                                        <StP />
                                        <StP />
                                    </ProfileInfo>
                                </ProfileArea>
                                <TitleArea>
                                    <StP />
                                    <StP />
                                </TitleArea>
                            </ListItemTop>
                            <DropdownToggle />
                        </ListItemBackground>
                    </ListItemContainer>
                )
            })}
        </>
    )
}

export default LoadingSkeleton

const ListItemContainer = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: calc(100% * 2 / 3);
`

const ListItemBackground = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 100%;
    
    background-color: #322D2A;

    border-radius: 8px;
    box-sizing: border-box;
    padding: 14px;
`

const ListItemTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    cursor: pointer;
`

const ProfileArea = styled.div`
    display: inline-flex;
    flex: 0.46 0 0;
    align-items: center;
    gap: 10px;
`

const TitleArea = styled.div`
    display: inline-flex;
    flex-direction: column;
    flex: 0.54 0 0;
    justify-content: flex-end;
    gap: 4px;
`

const ProfileThumnail = styled.div`
    width: 30px;
    height: 30px;
    background-color: #414141;
    border-radius: 50%;
`

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 60px;
    gap: 4px;
`

const DropdownToggle = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    width: 100%;
    height: 58px;

    background-color: #414141;
    border-radius: 6px;

    box-sizing: border-box;
    padding: 14px;
    cursor: pointer;
`

const StP = styled.div`
    width: 100%;
    height: 12px;
    background-color: #414141;
`