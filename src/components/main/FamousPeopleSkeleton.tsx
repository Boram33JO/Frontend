import { styled } from 'styled-components'

const FamousPeopleSkeleton = () => {
    const dummy = Array.from({ length: 4 }, (_, i) => i);
    return (
        <InnerContainer>
            <SkeletonDiv $width={"170px"} $height={"26px"}/>
            <FamousList>
                {
                    dummy.map((_, index) => {
                        return (
                            <FamousListItem key={index}>
                                <FamousListItemThumb />
                                <FamousListItemNickname><SkeletonDiv $width={"40px"} $height={"16px"}/></FamousListItemNickname>
                            </FamousListItem>
                        )
                    })
                }
            </FamousList>
        </InnerContainer>
    )
}

export default FamousPeopleSkeleton

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    gap: 16px;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: calc(100% + 6px);
    font-weight: 600;
`

const FamousList = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const FamousListItem = styled.div`
    position: relative;
    width: 22%;
    height: 0;
    padding-bottom: 22%;

    box-sizing: border-box;
    cursor: pointer;
    
    &:hover {
        opacity: 0.7;
    }
`

const FamousListItemThumb = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #3B3A40;
    border-radius: 50%;
`

const FamousListItemNickname = styled.div`
    position: absolute;
    width: 100%;
    height: 40%;
    top: 100%;
    left: 0;
    
    display: flex;
    align-items: flex-end;
    justify-content: center;
`

const P = styled.div`
    flex: 1 1 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    text-align: center;
    cursor: pointer;
    background-color: #3B3A40;
    width: 50px;
       
    font-size: 14px;
    line-height: calc(100% + 6px);
`

const SkeletonDiv = styled.div<{ $width?: string, $height?: string }>`
    background-color: #3B3A40;
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
`