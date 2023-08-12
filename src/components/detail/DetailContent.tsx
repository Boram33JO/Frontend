import { styled } from "styled-components"
import { Post } from "../../pages/DetailPage"
import { ReactComponent as Like } from '../../assets/images/like.svg'
import { ReactComponent as Place } from '../../assets/images/place.svg'
import { useMutation, useQueryClient } from "react-query"
import { followUser, likePost } from "../../api/post"
import { useParams } from "react-router-dom"
import { displayedAt } from "../../utils/common"

type PostProps = {
    post: Post
}

const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];

const DetailContent: React.FC<PostProps> = ({ post }) => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const LikeMutation = useMutation(likePost, {
        onSuccess: (response) => {
            queryClient.invalidateQueries(["posts"]);
            console.log(response);
        }
    })

    const likeButtonHandler = () => {
        LikeMutation.mutate(id);
    }

    const FollowMutation = useMutation(followUser, {
        onSuccess: (response) => {
            queryClient.invalidateQueries(["posts"]);
            console.log(response);
        }
    })

    const followButtonHandler = (userId: number) => {
        FollowMutation.mutate(userId);
    }

    return (
        <DetailContainer>
            <ProfileSection>
                <ProfileArea>
                    <ProfileImage src={post.userImage === null ? "https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?gif=1&w=640&h=640&c=c&webp=1" : post.userImage} />
                    <ProfileInfo>
                        <StP $size={"16px"} $color={"#FAFAFA"}>{post.nickname}</StP>
                    </ProfileInfo>
                </ProfileArea>
                <FollowBtn $yours={post.follow} onClick={() => followButtonHandler(post.userId)}>
                    {(post.follow) ? "언팔로우" : "팔로우"}
                </FollowBtn>
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
                {post.content}
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
                <LocationCategory>
                    {categories[Number(post.category) - 1]}
                </LocationCategory>
            </LocationSection>
        </DetailContainer>
    )
}

export default DetailContent

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: inherit;
    margin-top: 48px;
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
    margin-bottom: 10px;
`

const ProfileArea = styled.div`
    display: flex;
    align-items: center;
    height: inherit;
    gap: 10px;
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
    margin-bottom: 10px;
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
    min-height: 200px;
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
    padding: 10px;
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