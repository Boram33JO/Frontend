import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { ReactComponent as Map } from '../../assets/images/main_map.svg'
import { RootState } from '../../redux/config/configStore';
import { useSelector } from 'react-redux';

const LookAround = () => {
    const userInfo = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    return (
        <Container>
            <InnerContainer onClick={() => navigate(`/map`)}>
                <Wrapper>
                    <LeftSection>
                        {(userInfo.userId) ? (
                            <>
                                <H3>
                                    {userInfo.nickname}님,
                                    <br />
                                    오늘은 어디서 피플할까요?
                                </H3>
                                <P>
                                    나만의 장소에서 음악을 탐색해 보세요!
                                </P>
                            </>
                        ) : (
                            <>
                                <H3>
                                    오늘 피플러들은
                                    <br />
                                    어디서 피플하고 있을까요?
                                </H3>
                                <P>
                                    다양한 장소에서 음악을 탐색해 보세요!
                                </P>
                            </>
                        )
                        }
                    </LeftSection>
                    <RightSection>
                        <MapButton>
                            <StMap />
                        </MapButton>
                    </RightSection>
                </Wrapper>
            </InnerContainer>
        </Container>
    )
}

export default LookAround

const Container = styled.div`
    display: flex;    
    width: 100%;
    box-sizing: border-box;
    padding: 20px 20px 0px;
`

const InnerContainer = styled.div`
    display: flex;
    width: 100%;
    background-color: #373737;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 25px 15px;        

    cursor: pointer;
`

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const RightSection = styled.div`
    display: block;
`

const H3 = styled.h3`
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
`

const P = styled.p`
    font-size: 14px;
    line-height: calc(100% + 2px);
    font-weight: 500;
`

const MapButton = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 66px;
    height: 66px;
    border-radius: 6px;
`

const StMap = styled(Map)`
    width: 66px;
    height: 66px;
    border-radius: 6px;
`