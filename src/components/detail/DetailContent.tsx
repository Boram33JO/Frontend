import { styled } from "styled-components"
import { ReactComponent as Like } from '../../assets/images/like.svg'
import { ReactComponent as Place } from '../../assets/images/place.svg'
import { useMutation, useQueryClient } from "react-query"
import { followUser, likePost } from "../../api/post"
import { useNavigate, useParams } from "react-router-dom"
import { debounce, displayedAt } from "../../utils/common"
import { Post } from "../../models/post"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/config/configStore"
import { useEffect, useRef, useState } from "react"

type PostProps = {
    post: Post
}

const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];

const DetailContent = ({ post }: PostProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const LoginUser = useSelector((state: RootState) => state.user);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [fold, setFold] = useState<boolean>(true);
    const [contentHeight, setContentHeight] = useState<number>(0);

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

    const LikeMutation = useMutation(likePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(["post"]);
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const likeButtonHandler = debounce(() => {
        if (LoginUser.isLogin) {
            LikeMutation.mutate(id);
        } else {
            if (window.confirm(`로그인 후 좋아요 하실 수 있습니다.\n로그인 하시겠습니까?`)) {
                navigate(`/login`);
            } else return
        }
    }, 300);

    const FollowMutation = useMutation(followUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(["post"]);
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const followButtonHandler = debounce((userId: number) => {
        if (LoginUser.isLogin) {
            FollowMutation.mutate(userId);
        } else {
            if (window.confirm(`로그인 후 팔로우 하실 수 있습니다.\n로그인 하시겠습니까?`)) {
                navigate(`/login`);
            } else return
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
                    <ProfileImage src={post.userImage === null ? "https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?gif=1&w=640&h=640&c=c&webp=1" : post.userImage} />
                    <ProfileInfo>
                        <StP $size={"16px"} $color={"#FAFAFA"}>{post.nickname}</StP>
                    </ProfileInfo>
                </ProfileArea>
                {
                    (LoginUser.nickname !== post.nickname) && (
                        <FollowBtn $yours={post.follow} onClick={() => followButtonHandler(post.userId)}>
                            {(post.follow) ? "언팔로우" : "팔로우"}
                        </FollowBtn>
                    )
                }
            </ProfileSection>
            <TitleSection>
                <TitleSectionLeft>
                    <StP $size={"18px"} $color={"#FAFAFA"}>
                        {post.postTitle}
                    </StP>
                    <StP $size={"14px"} $color={"#A19FAB"}>
                        {displayedAt(post.createdAt)} 작성
                    </StP>
                </TitleSectionLeft>
                <TitleSectionRight>
                    <LikeButton onClick={likeButtonHandler}>
                        <SvgIcon>
                            <StLike $yours={post.wishlist} />
                        </SvgIcon>
                    </LikeButton>
                    <LikeCount>
                        <StP $size={"16px"} $color={"#FAFAFA"}>
                            {post.wishlistCount}
                        </StP>
                    </LikeCount>
                </TitleSectionRight>
            </TitleSection>
            <ContentSection>
                <ContentContainer ref={containerRef}>
                    <ContainerText ref={contentRef}>{post.content}</ContainerText>
                </ContentContainer>
                {(contentHeight > 154) && <ContentFoldToggle onClick={handleContentResizeHeight}>{fold ? "더보기" : "접기"}</ContentFoldToggle>}
            </ContentSection>
            <LocationSection>
                <LocationInfo>
                    <IconContainer>
                        <SvgIcon>
                            <Place />
                        </SvgIcon>
                    </IconContainer>
                    <StP $size={"16px"} $color={"#F1F1F1"}>
                        {post.location?.placeName}
                    </StP>
                </LocationInfo>
                {/* <LocationCategory> */}
                {categories[Number(post.category) - 1]}
                {/* </LocationCategory> */}
            </LocationSection>
        </DetailContainer>
    )
}

export default DetailContent

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: inherit;
    margin-top: 26px;
    padding: 10px 20px;
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
`

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
`

const StP = styled.p< { $size: string, $color: string } >`
    color: ${props => props.$color};
    font-size: ${props => props.$size};
    line-height: ${props => props.$size};
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
    justify-content: space-between;

    box-sizing: border-box;
    margin-bottom: 12px;
`

const TitleSectionLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const TitleSectionRight = styled.div`
    display: flex;
    align-items: center;
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
    justify-content: center;
    width: 20px;
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
    white-space: pre-wrap;
    overflow: hidden; 
`

const ContainerText = styled.div`    
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
    align-items: center;
    
    gap: 10px;
`

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: #55505B;
`

const LocationCategory = styled.div`
    display: flex;    
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #8084F4, #C48FED);
    
    color: #FAFAFA;
    font-size: 14px;
    line-height: 26px;

    width: 60px;
    height: 26px;
    border-radius: 100px;
`

const EditSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const EditButton = styled.p`
    font-size: 16px;
    line-height: 22px;
    color: #A6A3AF;
    background: none;
    border: none;
    padding: none;
    margin: none;

    cursor: pointer;
`