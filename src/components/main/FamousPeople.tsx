import { useQuery } from 'react-query';
import { styled } from 'styled-components'
import { getPopularPeople } from '../../api/post';

const FamousPeople = () => {
    const famousPeople = [
        {
            id: "1",
            thumbnail: "https://i.scdn.co/image/ab67616100005174006ff3c0136a71bfb9928d34",
            nickname: "IU"
        },
        {
            id: "2",
            thumbnail: "https://i.scdn.co/image/ab676161000051745da361915b1fa48895d4f23f",
            nickname: "New Jeans"
        },
        {
            id: "3",
            thumbnail: "https://i.scdn.co/image/ab67616100005174d642648235ebf3460d2d1f6a",
            nickname: "BTS"
        },
        {
            id: "4",
            thumbnail: "https://i.scdn.co/image/ab67616100005174c36dd9eb55fb0db4911f25dd",
            nickname: "브루노마스여덟글"
        }
    ]
    const { data, isLoading, isError } = useQuery(["celeb"],
        async () => {
            const response = await getPopularPeople();
            console.log(response.data);
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
                    famousPeople.map(item => {
                        return (
                            <FamousListItem key={item.id}>
                                <FamousListItemThumb src={item.thumbnail} />
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
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    margin-bottom: 20px;
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