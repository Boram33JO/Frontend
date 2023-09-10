import React from 'react'
import { css, styled } from 'styled-components'
import { ReactComponent as Close } from '../../assets/images/side/01_close.svg'
import { ReactComponent as Arrow } from '../../assets/images/side/02_arrow.svg'
import { ReactComponent as Map } from '../../assets/images/side/03_map.svg'
import { ReactComponent as Post } from '../../assets/images/side/04_post.svg'
import { ReactComponent as Notify } from '../../assets/images/side/05_notify.svg'
import { ReactComponent as Edit } from '../../assets/images/floating_post.svg'
import { ReactComponent as Login } from '../../assets/images/login.svg'
import logo_text from '../../assets/images/logo_text.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/config/configStore'
import { getProfileImage } from '../../utils/common'
import { logout } from '../../redux/modules/userSlice'
import { logout2 } from '../../api/user'
import { useMutation } from 'react-query'
import { toast } from 'react-hot-toast'

interface Props {
    sideOpen: boolean;
    setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Side = ({ sideOpen, setSideOpen }: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const LoginUser = useSelector((state: RootState) => state.user);
    const menuList = [
        { id: 1, name: "피플 맵핑", icon: Map, path: "/map" },
        { id: 2, name: "피플 포스팅", icon: Post, path: "/list" },
        // { id: 3, name: "알림", icon: Notify, path: "/notify" },
    ]

    const handleMenuClick = (path: string) => {
        setSideOpen(false);
        navigate(path);
    }

    const LogoutMutation = useMutation(logout2, {
        onSuccess: () => {
            toast.success("로그아웃 완료")
            dispatch(logout());
            navigate('/');
        },
        onError: () => {
            toast.error("로그아웃 실패")
        }
    })

    const handleLogoutButton = () => {
        setSideOpen(false);
        LogoutMutation.mutate();
    }

    return (
        <SideMenu $open={sideOpen}>
            <SideTop>
                <SideHeader>
                    <StClose onClick={() => setSideOpen(false)} />
                </SideHeader>
                <SideMiddle>
                    <SideMiddleTop>
                        <LogoSection>
                            <LogoContainer onClick={() => handleMenuClick("/")}>
                                <Logo data={logo_text} aria-label="logo" />
                            </LogoContainer>
                        </LogoSection>
                        {
                            (LoginUser.isLogin) ? (
                                <ProfileSection onClick={() => handleMenuClick(`/profile/${LoginUser.userId}`)}>
                                    <ProfileImage src={getProfileImage(LoginUser.userImage)} alt="userImage" />
                                    <P $size={"18px"} $weight={"600"}>{LoginUser.nickname}</P>
                                </ProfileSection>
                            ) : (
                                <ProfileSection onClick={() => handleMenuClick("/login")}>
                                    <StLogin />
                                    <P $size={"18px"} $weight={"600"}>로그인 / 회원가입</P>
                                </ProfileSection>
                            )
                        }
                    </SideMiddleTop>
                    <Hr />
                    <SideMiddleSection>
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
                    </SideMiddleSection>
                    {(LoginUser.isLogin) && (
                        <>
                            <Hr />
                            <SideMiddleSection>
                                <MenuItem onClick={() => handleMenuClick("/notify")}>
                                    <MenuItemName>
                                        <Notify />
                                        <P $size={"18px"} $weight={"600"}>알림</P>
                                    </MenuItemName>
                                    <Arrow />
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClick("/edit")}>
                                    <MenuItemName>
                                        <StEdit />
                                        <P $size={"18px"} $weight={"600"}>작성하기</P>
                                    </MenuItemName>
                                    <Arrow />
                                </MenuItem>
                            </SideMiddleSection>
                        </>
                    )}
                </SideMiddle>
            </SideTop>
            <SideBottom>
                {
                    (LoginUser.isLogin) && <P $color={"#A6A3AF"} $size={"16px"} $weight={"500"} onClick={handleLogoutButton}>로그아웃</P>
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
    height: inherit;
    background-color: #141414;
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
    height: 60px;
`

const StClose = styled(Close)`
    width: 28px;
    height: 28px;    
    cursor: pointer;
`

const SideTop = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`

const SideMiddle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`

const SideMiddleTop = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;   
`

const SideMiddleSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;   
`

const LogoSection = styled.div`
    display: flex;
    align-items: center;
`

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`

const Logo = styled.object` 
    height: 32px;
    object-fit: cover;
    pointer-events: none;
`

const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
`

const ProfileImage = styled.img`
    width: 28px;
    height: 28px;
    border: none;
    background-color: #ECECEC;
    border-radius: 50%;
    object-fit: cover;
`

const StLogin = styled(Login)`
    width: 28px;
    height: 28px;
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
    gap: 10px;
`

const SideBottom = styled.div`
    width: auto;
    cursor: pointer;
    margin-bottom: 40px;
`

const Label = styled.label`
    position: absolute;
    height: 100%;
    width: 200%;
    left: 100%;
    top: 0;
    background-color: black;
    opacity: 0.7;
`

const P = styled.p<{ $size: string, $weight: string, $color?: string }>`
    color: ${(props) => props.$color || "#FAFAFA"};
    font-size: ${(props) => props.$size};
    font-weight: ${(props) => props.$weight};
`

const StEdit = styled(Edit)`
    width: 20px;
    height: 20px;
`