import { styled } from "styled-components";
import { ReactComponent as Menu } from "../../assets/images/menu.svg";
import { ReactComponent as Search } from "../../assets/images/search.svg";
import { ReactComponent as Login } from "../../assets/images/login.svg";
import logo_text from "../../assets/images/logo_text.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { getProfileImage } from '../../utils/common'
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useQueryClient } from "react-query";

interface Props {
    setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleScrollTop: () => void;
}

const Header = ({ setSideOpen, handleScrollTop }: Props) => {
    const navigate = useNavigate();
    const persist = localStorage.getItem("persist:root");
    const loginUser = useSelector((state: RootState) => state.user);
    const [connect, setConnect] = useState<boolean>(false);
    const [sse, setSse] = useState<EventSourcePolyfill>();
    const queryClient = useQueryClient();
  
    useEffect(() => {}, [persist]);

    useEffect(() => {
        if (!connect && loginUser.isLogin) {
            // console.log("SSE 연결");
            const eventSourceInitDict: any = {
                headers: { accessToken: localStorage.getItem("AccessToken") },
            };
          
            const connectedSse = new EventSourcePolyfill(
                `${process.env.REACT_APP_SERVER_URL}/notifications/connect`,
                eventSourceInitDict
            );

            const notifyToast = (type: string) => {
                toast(<span style={{ cursor: "pointer" }} onClick={() => navigate('/notify')}>새로운 {type} 알림</span>, { icon: "🔔", position: "top-center" })
            }

            connectedSse.addEventListener("comment", (event: any) => {
                queryClient.invalidateQueries("notify");
                // const eventData = JSON.parse(event.data);
                // setComments((prevData: any) => [...prevData, eventData]);
                // toast(`새로운 댓글 알림`, { icon: "🔔" })
                notifyToast("댓글")
            });

            connectedSse.addEventListener("wishlist", (event: any) => {
                queryClient.invalidateQueries("notify");
                // const eventData = JSON.parse(event.data);
                // setWishlists((prevData: any) => [...prevData, eventData]);
                // toast(<><span>새로운 좋아요 알림</span><span onClick={() => navigate('/notify')}>확인</span></>, { icon: "🔔" })
                notifyToast("좋아요")
            });

            connectedSse.addEventListener("follow", (event: any) => {
                queryClient.invalidateQueries("notify");
                // const eventData = JSON.parse(event.data);
                // setFollows((prevData: any) => [...prevData, eventData]);
                // toast(`새로운 팔로우 알림`, { icon: "🔔" })
                notifyToast("팔로우")
            });

            setConnect(true);
            setSse(connectedSse);
        }

        if (sse && !loginUser.isLogin) {
            // console.log("SSE 종료");
            sse.close();
            setConnect(false);
        }
    }, [loginUser]);

    const handleLogoClick = () => {
        handleScrollTop();
        navigate("/");
    };

    return (
        <HeaderContainer>
            <HeaderLeft onClick={() => setSideOpen(true)}>
                <Menu />
            </HeaderLeft>
            <HeaderCenter onClick={handleLogoClick}>
                <Logo
                    data={logo_text}
                    aria-label="logo"
                />
            </HeaderCenter>
            <HeaderRight>
                <StSearch onClick={() => navigate(`/search`)} />
                {
                    (loginUser.isLogin) ? (
                        <ProfileImage
                            onClick={() => navigate(`/profile/${loginUser.userId}`)}
                            src={getProfileImage(loginUser.userImage)}
                            alt="userImage"
                        />
                    ) : (
                        <StLogin onClick={() => navigate('/login')} />
                    )
                }
            </HeaderRight>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: sticky;
    top: 0;
    z-index: 2;

    min-width: 390px;
    width: 100%;
    height: 60px;
    background-color: #141414;

    box-sizing: border-box;
    padding-right: 20px;

    @media (max-width: 480px) {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
    }
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;

    cursor: pointer;
`;

const HeaderCenter = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    cursor: pointer;
`;

const Logo = styled.object`
    height: 26px;
    object-fit: cover;
    pointer-events: none;
`;

const HeaderRight = styled.div`
    display: flex;
    gap: 22px;
`;

const ProfileImage = styled.img`
    width: 28px;
    height: 28px;
    background-color: #ececec;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
`;

const StSearch = styled(Search)`
    cursor: pointer;
`;

const StLogin = styled(Login)`
    cursor: pointer;
`;
