import { useQuery } from 'react-query';
import { styled } from 'styled-components'
import { getPopularPeople } from '../../api/post';
import { User2 } from '../../models/user';
import { getProfileImage, showCount } from '../../utils/common';
import { useNavigate } from 'react-router-dom';
import FamousPeopleSkeleton from './FamousPeopleSkeleton';
import { ReactComponent as Followers } from '../../assets/images/followers.svg'

const FamousPeople = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useQuery(["famous"],
        async () => {
            const response = await getPopularPeople();
            // console.log("인기 피플러 요청", response.data);
            return response.data;
        }
    )

    if (isLoading) {
        return <FamousPeopleSkeleton />
    }

    if (isError) {
        return <div>Error...</div>
    }

    return (
        <InnerContainer>
            <TitleSection>
                <H3>지금 인기있는 피플러</H3>
                <StP>팔로워 수 기준</StP>
            </TitleSection>
            <FamousList>
                {
                    data.map((item: User2) => {
                        return (
                            <FamousListItem key={item.id} onClick={() => navigate(`/profile/${item.id}`)}>
                                <FamousListItemThumb $src={getProfileImage(item.userImage)}>
                                    <FamousListFollowCount>
                                        <FollowerCount>
                                            <Followers />
                                            {`${showCount(item.followCount)}`}
                                        </FollowerCount>
                                    </FamousListFollowCount>
                                </FamousListItemThumb>
                                <FamousListItemNickname><P>{item.nickname}</P></FamousListItemNickname>
                            </FamousListItem>
                        )
                    })
                }
            </FamousList>
        </InnerContainer>
    )
}

export default FamousPeople

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

const StP = styled.p`
    color: #A19FAB;
    font-size: 14px;
    line-height: calc(150%);
    font-weight: 500;
`

const FamousList = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    gap: 4%;
`

const FamousListItem = styled.div`
    position: relative;
    width: 22%;
    height: 0;
    padding-bottom: 22%;

    box-sizing: border-box;
    cursor: pointer;
    
    &:hover {
        opacity: 0.7;
    }
`

const FamousListItemThumb = styled.div<{ $src?: string }>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url(${(props) => props.$src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #ECECEC;
    border-radius: 50%;
`

const FamousListFollowCount = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;

    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1.5px solid #A08DEC;
    background: linear-gradient(180deg, rgba(20, 20, 20, 0.00) 39.29%, #141414 100%);
    box-sizing: border-box;
`

const FollowerCount = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
        
    color: #FAFAFA;
    font-size: 14px;
    line-height: calc(150%);
    font-weight: 600;

    box-sizing: border-box;
    padding-bottom: 8px;

    gap: 4px;
`

const FamousListItemNickname = styled.div`
    position: absolute;
    width: 100%;
    height: 40%;
    top: 100%;
    left: 0;
    
    display: flex;
    align-items: flex-end;
    justify-content: center;
`

const P = styled.div`
    flex: 1 1 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    text-align: center;
    cursor: pointer;
       
    font-size: 14px;
    line-height: calc(100% + 6px);
`