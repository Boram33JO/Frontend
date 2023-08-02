import { styled } from "styled-components"
import { PostType } from "../../pages/DetailPage"

type PostProps = {
    post: PostType
}

const DetailContent: React.FC<PostProps> = ({ post }) => {
    return (
        <DetailContainer>
            <ProfileSection>
                <ProfileArea>
                    <ProfileImage src={post.userImage} />
                    <ProfileInfo>
                        <ProfileP $size={"16px"}>{post.nickname}</ProfileP>
                        <ProfileP $size={"14px"}>{post.address}</ProfileP>
                    </ProfileInfo>
                </ProfileArea>
                <FollowBtn>
                    팔로우
                </FollowBtn>
            </ProfileSection>
            <ContentSection>
                {post.content}
            </ContentSection>
        </DetailContainer>
    )
}

export default DetailContent

const DetailContainer = styled.div`
    width: inherit;
    margin-top: 48px;
    padding: 0px 20px;
    box-sizing: border-box;
`

const ProfileSection = styled.div`
    display: flex;
    height: 38px;
    justify-content: space-between;
    box-sizing: border-box;
`

const ProfileArea = styled.div`
    display: flex;
    align-items: center;
    height: inherit;
    gap: 10px;
`

const ProfileImage = styled.img`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #ECECEC;
`

const ProfileInfo = styled.div`
    display: flex;
    height: inherit;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
`

const ProfileP = styled.p< { $size: string } >`
    font-size: ${props => props.$size};
    line-height: ${props => props.$size};
`

const FollowBtn = styled.button`
    width: 65px;

    font-family: "Pretendard";
    font-size: 14px;

    box-sizing: border-box;
    margin: 5px;
    border-radius: 6px;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover {
        background-color: #B2B2B2;
    }
`

const ContentSection = styled.div`
    display: block;
    min-height: 300px;
    height: auto;

    font-family: "Pretendard";
    font-size: 16px;
    line-height: 22px;

    background-color: #ECECEC;
    border-radius: 10px;

    box-sizing: border-box;
    margin-top: 20px;
    padding: 20px;
`