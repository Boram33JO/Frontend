import { styled } from 'styled-components'
import { displayedAt, getProfileImage } from '../../utils/common'
import { useQuery } from 'react-query'
import { getPopularPosts } from '../../api/post'
import { ReactComponent as Like } from '../../assets/images/like.svg'
import { useNavigate } from 'react-router-dom'

type Song = {
    id: string;
    album: string;
    artistName: string;
    songTitle: string;
    thumbnail: string;
    audioUrl: string;
    externalUrl: string;
}

export type Post = {
    postId: number;
    postTitle: string;
    category: string;
    content: string;
    nickname: string;
    userImage: string;
    location?: Location;
    createdAt: string;
    wishlistCount: number;
    songs: Song[];
}

const PopularPosts = () => {
    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery(["popular"],
        async () => {
            const response = await getPopularPosts();
            // console.log(response.data);
            return response.data;
        }
    )

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error...</div>
    }

    return (
        <InnerContainer>
            <TitleSection>
                <H3> 오늘의 인기 포스팅 </H3>
            </TitleSection>
            <CardList>
                {
                    data?.map((post: Post) => {
                        return (
                            <CardListItem key={post.postId} onClick={() => navigate(`/detail/${post.postId}`)}>
                                <Card>
                                    <CardBackground src={post.songs[0].thumbnail} alt="postImage" />
                                    <ItemCategory>{categories[Number(post.category) - 1]}</ItemCategory>
                                </Card>
                                <PostInfo>
                                    <InfoTop>
                                        <InfoLeft>
                                            <ProfileThumnail src={getProfileImage(post.userImage)} alt="userImage" />
                                            <ProfileInfo>
                                                <StP $color={"#FAFAFA"} $size={"14px"}>
                                                    {post.nickname}
                                                </StP>
                                                <StP $color={"#C7C7C7"} $size={"14px"}>
                                                    {displayedAt(post.createdAt)}
                                                </StP>
                                            </ProfileInfo>
                                        </InfoLeft>
                                        <InfoRight>
                                            <SvgIcon>
                                                <StLike />
                                            </SvgIcon>
                                            <StP $color={"#E7E6F0"} $size={"16px"} >
                                                {post.wishlistCount}
                                            </StP>
                                        </InfoRight>
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
    gap: 20px;
`

const TitleSection = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: space-between;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
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

const CardBackground = styled.img`
    width: 100%;
    height: 100%;
    opacity: 0.8;

    border-radius: 8px;
    
    box-sizing: border-box;
`

const ItemCategory = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 20px;
    left: 20px;
    height: 30px;
    background-color: #383549;

    border: 1px solid #70609B;
    border-radius: 30px;
    
    color: #EFEDFF;
    font-size: 14px;
    line-height: 16px;

    box-sizing: border-box;
    padding: 10px;

    pointer-events: none;
`

const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    width: 258px;
    height: 90px;
    background-color: #373737;

    border-radius: 8px;
    
    box-sizing: border-box;
    padding: 10px;
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

const ProfileThumnail = styled.img`
    width: 38px;
    height: 38px;
    border-radius: 50%;
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
    line-height: 20px;
`

const StP = styled.p<{ $color: string, $size: string }>`
    color: ${(props) => props.$color};
    font-size: ${(props) => props.$size};
    line-height: calc(100% + 2px);

    & {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
`