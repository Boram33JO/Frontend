import { styled } from 'styled-components'

const LookAround = () => {
    const nickname = "관리자"
    return (
        <InnerContainer>
            <H3>
                안녕하세요. {nickname}님
                <br />
                오늘의 음악을 탐색해볼까요?
            </H3>
            <LookAroundBtn>
                현재 위치 주변에서 탐색하기
            </LookAroundBtn>
        </InnerContainer>
    )
}

export default LookAround

const InnerContainer = styled.div`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 0px 20px;
    margin-top: 48px;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    margin-bottom: 10px;
`

const LookAroundBtn = styled.button`
    width: 100%;
    height: 30px;

    background-color: #D2D2D2;
    border: none;
    border-radius: 5px;

    font-family: "Pretendard";

    cursor: pointer;

    &:hover {
        background-color: #E2E2E2;
    }
`