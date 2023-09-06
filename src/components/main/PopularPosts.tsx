import { styled } from 'styled-components'
import { displayedAt, getProfileImage, showCount } from '../../utils/common'
import { useQuery } from 'react-query'
import { getPopularPosts } from '../../api/post'
import { ReactComponent as Like } from '../../assets/images/like.svg'
import { useNavigate } from 'react-router-dom'
import { Post } from '../../models/post'
import PopularPostsSkeleton from './PopularPostsSkeleton'
import { miniCardBackground } from '../../utils/cardBackground'
import { useState } from 'react'

const PopularPosts = () => {
    const navigate = useNavigate();
    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];
    const [toggle, setToggle] = useState<string>("wishlistTopPosts");

    const { data, isLoading, isError } = useQuery(["popular"],
        async () => {
            const response = await getPopularPosts();
            // console.log("인기 포스트 요청", response.data);
            return response.data;
        }
    )

    if (isLoading) {
        return <PopularPostsSkeleton />
    }

    if (isError) {
        return <div>Error...</div>
    }

    return (
        <InnerContainer>
            <TitleSection>
                <H3>오늘의 인기 포스팅</H3>
                <TitleSectionSub>
                    <SubButton $select={toggle === "wishlistTopPosts"} onClick={() => setToggle("wishlistTopPosts")}>좋아요</SubButton>
                    <Divider $height='12px' $color='#A19FAB' />
                    <SubButton $select={toggle === "viewCountTopPosts"} onClick={() => setToggle("viewCountTopPosts")}>조회수</SubButton>
                </TitleSectionSub>
            </TitleSection>
            <CardList>
                {
                    data[toggle]?.map((post: Post) => {
                        return (
                            <CardListItem key={post.postId} onClick={() => navigate(`/detail/${post.postId}`)}>
                                <Card>
                                    <CardBackground $src={miniCardBackground(post.category, post.postId)} />
                                    <CardTop>
                                        <ItemCategory>{categories[Number(post.category) - 1]}</ItemCategory>
                                        <InfoRight>
                                            <SvgIcon>
                                                <StLike />
                                            </SvgIcon>
                                            <StP $color={"#E7E6F0"} $size={"14px"} $weight={"600"}>
                                                {showCount(post.wishlistCount)}
                                            </StP>
                                            <Divider />
                                            <StP $color={"#E7E6F0"} $size={"14px"} $weight={"600"}>
                                                조회수 {showCount(post.viewCount)}
                                            </StP>
                                        </InfoRight>
                                    </CardTop>
                                </Card>
                                <PostInfo>
                                    <InfoTop>
                                        <InfoLeft>
                                            <ProfileThumnail $src={getProfileImage(post.userImage)} />
                                            <ProfileInfo>
                                                <StP $color={"#FAFAFA"} $size={"14px"}>
                                                    {post.nickname}
                                                </StP>
                                                <StP $color={"#C7C7C7"} $size={"14px"}>
                                                    {displayedAt(post.createdAt)}
                                                </StP>
                                            </ProfileInfo>
                                        </InfoLeft>
                                    </InfoTop>
                                    <InfoBottom>
                                        {post.postTitle}
                                    </InfoBottom>
                                </PostInfo>
                            </CardListItem>
                        )
                    })
                }
            </CardList>
        </InnerContainer>
    )
}

export default PopularPosts

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    gap: 16px;
`

const TitleSection = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: space-between;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: calc(150%);
    font-weight: 600;
`

const TitleSectionSub = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const SubButton = styled.div<{ $select?: boolean }>`
    color: ${({ $select }) => $select ? "#FAFAFA" : "#A19FAB"};
    font-size: 14px;
    line-height: calc(150%);
    font-weight: 600;
    box-sizing: border-box;
    padding: 0px 4px;
    cursor: pointer;
`

const CardList = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    gap: 15px;
    padding-bottom: 10px;

    &::-webkit-scrollbar {
        height: 4px;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #DDDDDD;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: #3A3A3A;
        border-radius: 10px;
    }
`

const CardListItem = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    gap: 10px;
    cursor: pointer;
`

const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 258px;
    height: 252px;

    border-radius: 8px;

    box-sizing: border-box;
`

const CardBackground = styled.div<{ $src?: string }>`
    width: 100%;
    height: 100%;
    background: ${(props) => props.$src || "#322D2A"};
    background-size: cover;
    background-repeat: no-repeat;

    border-radius: 8px;
    
    box-sizing: border-box;
`

const CardTop = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    box-sizing: border-box;
    padding: 10px;
`

const ItemCategory = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 30px;
    background-color: #383549;

    border: 1px solid #70609B;
    border-radius: 30px;
    
    color: #EFEDFF;
    font-size: 14px;
    line-height: calc(150%);
    font-weight: 600;

    box-sizing: border-box;
    padding: 10px;

    pointer-events: none;
`

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    width: 258px;
    background-color: #373737;

    border-radius: 8px;
    
    box-sizing: border-box;
    padding: 10px 14px;
    gap: 10px;
`

const InfoTop = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
`

const InfoLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const ProfileThumnail = styled.div<{ $src?: string }>`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: url(${({ $src }) => $src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #ECECEC;
`

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const InfoRight = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

const SvgIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
`

const StLike = styled(Like)`
    width: 18px;
    height: 18px;
    path{
        fill: #E7E6F0;
    }
`

const InfoBottom = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
    overflow: hidden;
 
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 600;
    line-height: calc(150%);
`

const StP = styled.p<{ $color: string, $size: string, $weight?: string }>`
    color: ${({ $color }) => $color};
    font-size: ${({ $size }) => $size};
    line-height: calc(150%);
    font-weight: ${({ $weight }) => $weight || "500"};

    & {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
`

const Divider = styled.div<{ $height?: string, $color?: string }>`
    height: ${({ $height }) => $height || "10px"};
    width: 1.5px;
    border-radius: 1.5px;
    background-color: ${({ $color }) => $color || "#FFFFFF"};
    padding: 0;
    margin: 0px 4px;
`