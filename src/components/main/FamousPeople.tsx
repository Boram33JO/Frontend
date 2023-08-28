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
            // console.log("인기 피플러 요청", response.data);
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
                                <FamousListItemThumb $src={getProfileImage(item.userImage)} />
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

const H3 = styled.h3`
    font-size: 20px;
    line-height: calc(100% + 6px);
    font-weight: 600;
`

const FamousList = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
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