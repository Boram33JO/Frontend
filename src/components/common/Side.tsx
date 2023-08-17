import React from 'react'
import { css, styled } from 'styled-components'
import { ReactComponent as Close } from '../../assets/images/side/01_close.svg'
import { ReactComponent as Arrow } from '../../assets/images/side/02_arrow.svg'
import { ReactComponent as Map } from '../../assets/images/side/03_map.svg'
import { ReactComponent as Post } from '../../assets/images/side/04_post.svg'
import { ReactComponent as PP } from '../../assets/images/side/05_pp.svg'
import { ReactComponent as Login } from '../../assets/images/login.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/config/configStore'
import { getProfileImage } from '../../utils/common'
import { logOut } from '../../redux/modules/loginSlice'
import { logout, setUserInfo } from '../../redux/modules/userSlice'

interface Props {
    sideOpen: boolean;
    setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Side = ({ sideOpen, setSideOpen }: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.user);
    const menuList = [
        { id: 1, name: "피플 맵핑", icon: Map, path: "/map" },
        { id: 2, name: "피플 포스팅", icon: Post, path: "/list/1" },
        { id: 3, name: "피플러", icon: PP, path: "/" },
    ]

    const handleMenuClick = (path: string) => {
        setSideOpen(false);
        navigate(path);
    }

    const handleLogout = () => {
        setSideOpen(false);
        dispatch(logOut(null));
        dispatch(logout());
        // window.location.reload();
    }

    return (
        <SideMenu $open={sideOpen}>
            <SideTop>
                <SideHeader onClick={() => setSideOpen(false)}>
                    <Close />
                </SideHeader>
                <SideMiddle>
                    <LogoSection>
                        <P $size={"48px"} $weight={"700"} onClick={() => handleMenuClick("/")}>P.Ple</P>
                    </LogoSection>
                    {
                        (userInfo.userId) ? (
                            <ProfileSection onClick={() => handleMenuClick(`/profile/${userInfo.userId}`)}>
                                <ProfileImage src={getProfileImage(userInfo.userImage)} alt="userImage" />
                                <P $size={"18px"} $weight={"600"}>{userInfo.nickname}</P>
                            </ProfileSection>
                        ) : (
                            <ProfileSection onClick={() => handleMenuClick("/login")}>
                                <StLogin />
                                <P $size={"18px"} $weight={"600"}>로그인 / 회원가입</P>
                            </ProfileSection>
                        )
                    }
                    <Hr />
                    {
                        menuList.map(menu => {
                            return (
                                <MenuItem key={menu.id} onClick={() => handleMenuClick(menu.path)}>
                                    <MenuItemName>
                                        <menu.icon />
                                        <P $size={"18px"} $weight={"600"}>{menu.name}</P>
                                    </MenuItemName>
                                    <Arrow />
                                </MenuItem>
                            )
                        })
                    }
                </SideMiddle>
            </SideTop>
            <SideBottom>
                {
                    (userInfo.userId !== 0) && <P $color={"#A6A3AF"} $size={"16px"} $weight={"500"} onClick={handleLogout}>로그아웃</P>
                }
            </SideBottom>
            <Label onClick={() => setSideOpen(false)} />
        </SideMenu >
    )
}

export default Side

const SideMenu = styled.div<{ $open: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: calc(100% * 2 / 3);
    height: 100vh;
    background-color: #141414;
    box-shadow: 0 0 20px 20px #141414;
    color: white;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    box-sizing: border-box;
    padding: 0px 20px;

    visibility: hidden;
    opacity: 0;
    transform: translateX(-100%);
    transition: transform .4s linear, opacity .2s linear .2s, visibility 0s linear .4s;
    transition-timing-function: cubic-bezier(.8,0,.6,1), linear, linear;

    ${({ $open }) =>
        $open &&
        css`
            transform: translateX(0%);
            transition-delay: 0s;
            opacity: 1;
            visibility: visible;
            transition-timing-function: cubic-bezier(0,.2,.25,1), linear, linear;
        `}
`

const SideHeader = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    cursor: pointer;

    &:hover path{
        fill: #8084F4;
        stroke: #8084F4;
    }
`

const SideTop = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`

const SideMiddle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const LogoSection = styled.div`
    cursor: pointer;
    
    padding: 10px 0px;
`

const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    
    padding: 10px 0px;
`

const ProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border: none;
    background-color: #ECECEC;
    border-radius: 50%;
`

const StLogin = styled(Login)`
    width: 30px;
    height: 30px;
`

const Hr = styled.hr`
    background-color: #29292C;
    height: 1.5px;
    border: none;
    border-radius: 1.5px;
    padding: 0;
    margin: 0;
`

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    
    padding: 10px 0px;
`

const MenuItemName = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

const SideBottom = styled.div`
    color: #A6A3AF;
    font-size: 16px;
    line-height: calc(100% + 2px);
    cursor: pointer;
    margin-bottom: 40px;
`

const Label = styled.label`
    position: absolute;
    height: 100%;
    width: 100%;
    left: 100%;
    top: 0;
`

const P = styled.p<{ $size: string, $weight: string, $color?: string }>`
    color: ${(props) => props.$color || "#FAFAFA"};
    font-size: ${(props) => props.$size};
    font-weight: ${(props) => props.$weight};
`