import { styled } from "styled-components";
import { ReactComponent as Menu } from "../../assets/images/menu.svg";
import { ReactComponent as Search } from "../../assets/images/search.svg";
import { ReactComponent as Login } from "../../assets/images/login.svg";
import logo_text from "../../assets/images/logo_text.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { getProfileImage } from "../../utils/common";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useQueryClient } from "react-query";

interface Props {
    setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleScrollTop: () => void;
}

const Header = ({ setSideOpen, handleScrollTop }: Props) => {
    const navigate = useNavigate();
    const userInfo = useSelector((state: RootState) => state.user);
    const persist = localStorage.getItem("persist:root");
    const loginUser = useSelector((state: RootState) => state.user);
    const queryClient = useQueryClient();
    useEffect(() => {}, [persist]);

    useEffect(() => {
        if (loginUser.isLogin) {
            const eventSourceInitDict: any = {
                headers: { accessToken: localStorage.getItem("AccessToken") },
            };

            const sseConnect = new EventSourcePolyfill(`${process.env.REACT_APP_SERVER_URL}/notifications/connect`, eventSourceInitDict);

            // console.log(sseConnect);
            // sseConnect.addEventListener("sse", function (event: any) {
            //     const eventData = event.data;
            //     console.log(event);
            //     // console.log(eventData);
            // })

            sseConnect.onopen = (event) => {
                // console.log("sse 연결 완료", event);
            };

            sseConnect.onerror = (err) => {
                // console.log("sse 에러 발생", err);
            };

            sseConnect.addEventListener("comment", (event: any) => {
                queryClient.invalidateQueries("notifications");
                // const eventData = JSON.parse(event.data);
                // setComments((prevData: any) => [...prevData, eventData]);
                toast.success("새로운 댓글이 작성되었어요");
            });

            sseConnect.addEventListener("wishlist", (event: any) => {
                queryClient.invalidateQueries("notifications");
                // const eventData = JSON.parse(event.data);
                // setWishlists((prevData: any) => [...prevData, eventData]);
                toast.success("작성한 게시물에 좋아요를 받았어요.");
            });

            sseConnect.addEventListener("follow", (event: any) => {
                queryClient.invalidateQueries("notifications");
                // const eventData = JSON.parse(event.data);
                // setFollows((prevData: any) => [...prevData, eventData]);
                toast.success("팔로우를 받았어요.");
            });

            return () => {
                if (sseConnect) {
                    sseConnect.close();
                }
            };
        }
    }, []);

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
                {/* <StSearch /> */}
                {userInfo.isLogin ? (
                    <ProfileImage
                        onClick={() => navigate(`/profile/${userInfo.userId}`)}
                        src={getProfileImage(userInfo.userImage)}
                        alt="userImage"
                    />
                ) : (
                    <StLogin onClick={() => navigate("/login")} />
                )}
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
