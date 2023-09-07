import { styled } from "styled-components"
import { ReactComponent as Like } from '../../assets/images/like.svg'
import { ReactComponent as Place } from '../../assets/images/place.svg'
import { useMutation, useQueryClient } from "react-query"
import { followUser, likePost } from "../../api/post"
import { useNavigate, useParams } from "react-router-dom"
import { debounce, displayedAt, getProfileImage, showCount } from "../../utils/common"
import { Post } from "../../models/post"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/config/configStore"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import Modal from "../common/Modal"

type PostProps = {
    post: Post
}

const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];

const DetailContent = ({ post }: PostProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const loginUser = useSelector((state: RootState) => state.user);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [fold, setFold] = useState<boolean>(true);
    const [contentHeight, setContentHeight] = useState<number>(0);
    const [target, setTarget] = useState<string>("");
    const [modalToggle, setModalToggle] = useState<boolean>(false);

    const handleContentResizeHeight = () => {
        if (containerRef.current) {
            if (fold) { // 현재 접혀있는 상태(true)면, auto로 높이 늘리기
                containerRef.current.style.height = "auto";
            } else { // 현재 접어둔 상태(false)면, 154px로 높이 줄이기
                containerRef.current.style.height = "154px";
            }
            setFold(!fold); // 높이 조절 후 fold 상태 변경
        }
    }

    const likeMutation = useMutation(likePost, {
        onSuccess: (response) => {
            queryClient.invalidateQueries(["post"]);
            toast.success(response.data.message);
        },
        onError: () => {
            toast.error("좋아요 실패")
        }
    })

    const likeButtonHandler = debounce(() => {
        if (loginUser.isLogin) {
            likeMutation.mutate(id);
        } else {
            setTarget("좋아요");
            setModalToggle(true);
            return
        }
    }, 300);

    const FollowMutation = useMutation(followUser, {
        onSuccess: (response) => {
            queryClient.invalidateQueries(["post"]);
            toast.success(response.data.message);
        },
        onError: () => {
            toast.error("팔로우 실패")
        }
    })

    const followButtonHandler = debounce((userId: number) => {
        if (loginUser.isLogin) {
            FollowMutation.mutate(userId);
        } else {
            setTarget("팔로우");
            setModalToggle(true);
            return
        }
    }, 300);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [contentHeight]);

    return (
        <DetailContainer>
            <ProfileSection>
                <ProfileArea onClick={() => { navigate(`/profile/${post.userId}`) }}>
                    <ProfileImage src={getProfileImage(post.userImage)} />
                    <ProfileInfo>
                        <StP $size={"16px"} $color={"#FAFAFA"}>{post.nickname}</StP>
                    </ProfileInfo>
                </ProfileArea>
                {
                    (loginUser.nickname !== post.nickname) && (
                        <FollowBtn $yours={post.follow} onClick={() => followButtonHandler(post.userId)}>
                            {(post.follow) ? "언팔로우" : "팔로우"}
                        </FollowBtn>
                    )
                }
            </ProfileSection>
            <TitleSection>
                <TitleMain>
                    {post.postTitle}
                </TitleMain>
                <TitleSub>
                    <TitleSubLeft>
                        <StP $size={"14px"} $color={"#A19FAB"}>
                            {displayedAt(post.createdAt)}
                        </StP>
                        <Divider />
                        <StP $size={"14px"} $color={"#A19FAB"}>
                            조회수 {showCount(post.viewCount)}
                        </StP>
                    </TitleSubLeft>
                    <TitleSubRight>
                        <LikeButton onClick={likeButtonHandler}>
                            <SvgIcon>
                                <StLike $yours={post.wishlist} />
                            </SvgIcon>
                        </LikeButton>
                        <LikeCount>
                            <StP $size={"16px"} $color={"#FAFAFA"}>
                                {showCount(post.wishlistCount)}
                            </StP>
                        </LikeCount>
                    </TitleSubRight>
                </TitleSub>
            </TitleSection>
            <ContentSection>
                <ContentContainer ref={containerRef}>
                    <ContainerText ref={contentRef}>{post.content}</ContainerText>
                </ContentContainer>
                {(contentHeight > 154) && <ContentFoldToggle onClick={handleContentResizeHeight}>{fold ? "더보기" : "접기"}</ContentFoldToggle>}
            </ContentSection>
            <LocationSection>
                <LocationInfo>
                    <LocationInfoLeft>
                        <IconContainer>
                            <SvgIcon>
                                <Place />
                            </SvgIcon>
                        </IconContainer>
                        <StP $size={"16px"} $color={"#F1F1F1"}>
                            {post.location?.placeName}
                        </StP>
                    </LocationInfoLeft>
                    <LocationInfoRight>
                        {categories[Number(post.category) - 1]}
                    </LocationInfoRight>
                </LocationInfo>
            </LocationSection>
            {modalToggle &&
                <Modal
                    first={`로그인 후 ${target} 하실 수 있습니다.`}
                    second={`로그인 하시겠습니까?`}
                    buttonName={"확인"}
                    setToggle={setModalToggle}
                    clickButton={() => navigate('/login')}
                />}
        </DetailContainer>
    )
}

export default DetailContent

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: inherit;
    padding: 36px 20px 10px;
    box-sizing: border-box;
    background-color: #141414;
    color: #FAFAFA;
    gap: 10px;
`

const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
    margin-bottom: 24px;
`

const ProfileArea = styled.div`
    display: flex;
    align-items: center;
    height: inherit;
    gap: 10px;
    cursor: pointer;
`

const ProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ECECEC;
    object-fit: cover;
`

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
`

const StP = styled.p< { $size: string, $color: string } >`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: pre-line;
    overflow: hidden;

    color: ${props => props.$color};
    font-size: ${props => props.$size};
    line-height: calc(100% + 6px);
    font-weight: 500;
`

const FollowBtn = styled.button < { $yours: boolean } >`
    width: 74px;
    height: 30px;
    background: ${props => props.$yours ? "#434047" : "linear-gradient(135deg, #8084F4, #C48FED)"};

    color: #F0F0F0;
    font-family: "Pretendard";
    font-size: 14px;
    font-weight: 600;

    box-sizing: border-box;
    border-radius: 30px;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`

const TitleSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    box-sizing: border-box;
    margin-bottom: 12px;
    gap: 7px;
`

const TitleMain = styled.div`
    width: 100%;
    color: #FAFAFA;
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
`

const TitleSub = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 5px;
`

const TitleSubLeft = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const TitleSubRight = styled.div`
    display: flex;
    height: auto;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
`

const LikeButton = styled.div`
    background: none;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    
    cursor: pointer;
`

const LikeCount = styled.div`
    display: flex;
    align-items: center;
`

const StLike = styled(Like) <{ $yours: boolean }>`
    width: 26px;
    height: 26px;
    path{
        fill: ${({ $yours }) => $yours ? "#FAFAFA" : ""};
    }
`

const ContentSection = styled.div`
    display: block;
    height: auto;

    color: #D9D8DF;
    font-family: "Pretendard";
    font-size: 16px;
    line-height: 22px;

    background-color: #434047;
    border-radius: 6px;

    box-sizing: border-box;
    padding: 20px;
`

const ContentContainer = styled.div`
    min-height: 154px; // 최소 높이 설정
    height: 154px; // 접기, 더보기 상태에 따라 변경될 높이
    overflow: hidden; 
`

const ContainerText = styled.div`
    white-space: pre-wrap;
    word-break: break-all;
`

const ContentFoldToggle = styled.p`
    margin-top: 10px;
    color: #7D7B85;
    cursor: pointer;
`

const SvgIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
`

const LocationSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: #434047;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 10px 14px;
    margin: 2px 0px;
`

const LocationInfo = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    
    gap: 10px;
`

const LocationInfoLeft = styled.div`
    display: flex;
    align-items: center;
    
    gap: 10px;
`

const LocationInfoRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 56px;
    white-space: nowrap;
`

const IconContainer = styled.div`
    flex: 0 0 34px;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: #55505B;
`

const Divider = styled.div`
    height: 12px;
    width: 1px;
    background-color: #A6A3AF;
    padding: 0;
`