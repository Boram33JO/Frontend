import { styled } from "styled-components"
import { ReactComponent as Menu } from '../../assets/images/menu.svg'
import { ReactComponent as Search } from '../../assets/images/search.svg'
import { ReactComponent as Login } from '../../assets/images/login.svg'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { getProfileImage } from '../../utils/common'
import { useEffect } from "react";

interface Props {
    setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setSideOpen }: Props) => {
    const navigate = useNavigate();
    const userInfo = useSelector((state: RootState) => state.user);
    const persist = localStorage.getItem("persist:root");
    
    useEffect(() => {

    }, [persist])

    return (
        <HeaderContainer>
            <HeaderLeft onClick={() => setSideOpen(true)}>
                <Menu />
            </HeaderLeft>
            <HeaderCenter onClick={() => navigate('/')}>
                P.Ple
            </HeaderCenter>
            <HeaderRight>
                <StSearch />
                {
                    (userInfo.isLogin) ? (
                        <ProfileImage
                            onClick={() => navigate(`/profile/${userInfo.userId}`)}
                            src={getProfileImage(userInfo.userImage)}
                            alt="userImage"
                        />
                    ) : (
                        <StLogin onClick={() => navigate('/login')} />
                    )
                }
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: sticky;
    top: 0;
    z-index: 2;
    
    width: inherit;
    height: 60px;
    background-color: #141414;
    
    box-sizing: border-box;
    padding-right: 20px;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;

    cursor: pointer;
    &:hover path{
        fill: #8084F4;
        stroke: #8084F4;
    }
`

const HeaderCenter = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    
    color: #FAFAFA;
    font-size: 28px;
    font-weight: 600;

    cursor: pointer;
`

const HeaderRight = styled.div`
    display: flex;
    gap: 22px;
`

const ProfileImage = styled.img`
    width: 28px;
    height: 28px;
    /* background-color: #ECECEC; */
    border-radius: 50%;
    cursor: pointer;
`

const StSearch = styled(Search)`
    cursor: pointer;
`

const StLogin = styled(Login)`
    cursor: pointer;
`