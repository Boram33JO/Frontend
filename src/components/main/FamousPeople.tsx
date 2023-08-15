import { useQuery } from 'react-query';
import { styled } from 'styled-components'
import { getPopularPeople } from '../../api/post';
import { User2 } from '../../models/user';
import { getProfileImage } from '../../utils/common';
import { useNavigate } from 'react-router-dom';

const FamousPeople = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useQuery(["famous"],
        async () => {
            const response = await getPopularPeople();
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
            <H3>
                지금 인기있는 피플러
            </H3>
            <FamousList>
                {
                    data.map((item: User2) => {
                        return (
                            <FamousListItem key={item.id} onClick={() => navigate(`/profile/${item.id}`)}>
                                <FamousListItemThumb src={getProfileImage(item.userImage)} />
                                <FamousListItemNickname>{item.nickname}</FamousListItemNickname>
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
    gap: 20px;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
`

const FamousList = styled.div`
    display: flex;
    justify-content: space-between;
`

const FamousListItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 75px;

    box-sizing: border-box;
    gap: 10px;
    cursor: pointer;
    
    &:hover {
        opacity: 0.7;
    }
`

const FamousListItemThumb = styled.img`
    width: 75px;
    height: 75px;
    background-color: #ECECEC;
    border-radius: 50%;
`

const FamousListItemNickname = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
    
    text-align: center;
    width: inherit;

    font-size: 14px;
    line-height: calc(100% + 2px);
`