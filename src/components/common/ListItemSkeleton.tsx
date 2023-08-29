import { styled } from "styled-components"

const ListItemSkeleton = () => {
    return (
        <ListItemContainer>
            <ListItemBackground>
                <ListItemTop>
                    <ProfileArea>
                        <ProfileThumnail />
                        <ProfileInfo>
                            <SkeletonDiv $width={"45px"} $height={"14px"} />
                            <SkeletonDiv $width={"45px"} $height={"14px"} />
                        </ProfileInfo>
                    </ProfileArea>
                    <TitleArea>
                        <SkeletonDiv $width={"130px"} $height={"18px"} />
                        <SkeletonDiv $width={"70px"} $height={"16px"} />
                    </TitleArea>
                </ListItemTop>
                <DropdownToggle />
            </ListItemBackground>
        </ListItemContainer>
    )
}

export default ListItemSkeleton

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
    align-items: center;
    gap: 10px;
`

const TitleArea = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 7px;
`

const ProfileThumnail = styled.div`
    width: 34px;
    height: 34px;
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

const SkeletonDiv = styled.div<{ $width?: string, $height?: string }>`
    background-color: #414141;
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
`