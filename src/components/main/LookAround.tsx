import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

const LookAround = () => {
    const [nickname, setNickname] = useState<string>("관리자");
    const navigate = useNavigate();
    return (
        <Container>
            <InnerContainer>
                <Wrapper>
                    <SectionLeft>
                        <H3>
                            {nickname}님, 오늘은
                            <br />
                            어디서 음악을 탐색할까요?
                        </H3>
                        <P>
                            나만의 장소에서 음악을 탐색해 보세요!
                        </P>
                    </SectionLeft>
                    <SectionRight>
                        <MapImage onClick={() => navigate(`/map`)}>

                        </MapImage>
                    </SectionRight>
                </Wrapper>
            </InnerContainer>
        </Container>
    )
}

export default LookAround

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    background-image: url("https://i.namu.wiki/i/VdxdfJ7KGdvadOFs-E2oy6y9Liql296v-uARq8O-Lwr-p8Y2Ic9v6MT-ktUR_CPcCciD8Y7unjAUrT2X87v3kgC27IONUmVvu2Rnw90nMbcyvcVmaYLfbrx45vn3laTOLKPU9HrNHDt5MUx5vuIDrQ.webp");
    
    width: 100%;
    height: 345px;
    box-sizing: border-box;
    margin-top: 20px;
`

const InnerContainer = styled.div`
    display: flex;
    align-items: flex-end;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, #151515 95%);
    
    width: 100%;
    height: 345px;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 20px;
`

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: space-between;
`

const SectionLeft = styled.div`
    display: block;
`

const SectionRight = styled.div`
    display: block;
`

const H3 = styled.h3`
    font-size: 22px;
    line-height: 28px;
    font-weight: 600;
`

const P = styled.p`
    font-size: 14px;
    font-weight: 500;
    margin-top: 14px;
`

const MapImage = styled.div`
    width: 65px;
    height: 65px;
    border-radius: 6px;
    background-color: gray;

    cursor: pointer;
`