import { styled } from 'styled-components'
import { ReactComponent as Empty } from "../../assets/images/login_signup_profile/icon_no_data.svg";

interface Props {
    type: string;
}

const NotifyEmpty = ({ type }: Props) => {
    return (
        <Container>
            <StEmpty />
            {type}에 대한 알림이 없습니다.
        </Container>
    )
}

export default NotifyEmpty

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #252427;

    color: #7D7B85;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 24px;
    gap: 10px;
    user-select: none;
`

const StEmpty = styled(Empty)`
    width: 50px;
    height: 58px;
`