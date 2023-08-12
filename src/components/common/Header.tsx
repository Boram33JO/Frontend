import { styled } from "styled-components"
import { ReactComponent as Menu } from '../../assets/images/menu.svg'
import { ReactComponent as Search } from '../../assets/images/search.svg'
import { ReactComponent as Login } from '../../assets/images/login.svg'
import { useNavigate } from "react-router-dom";

interface Props {
    setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setSideOpen }: Props) => {
    const navigate = useNavigate();
    const nickname = localStorage.getItem("nickname");
    const userImageString = localStorage.getItem("userImage");
    const userImage = userImageString !== null ? JSON.parse(userImageString) : undefined;
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
                    (nickname) ? (
                        <ProfileImage
                            onClick={() => navigate('/profile/1')}
                            src={userImage === null ? "https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?gif=1&w=640&h=640&c=c&webp=1" : userImage}
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
    height: 50px;
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
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
`

const StSearch = styled(Search)`
    cursor: pointer;
    &:hover path{
        fill: #8084F4;
    }
`

const StLogin = styled(Login)`
    cursor: pointer;
    &:hover path{
        fill: #8084F4;
    }
`