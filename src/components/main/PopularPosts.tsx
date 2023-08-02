import { styled } from 'styled-components'

const PopularPosts = () => {
    const List = [
        {
            id: 1,
            artist: "아이유",
            title: "가을아침",
            thumbnail: "https://i.namu.wiki/i/kh5QzqhYq_xIM0AVSfaj81jsk6eSJY0DEl6cTHLBuFgZ_bEZacs2zJETuLfWVI7_ipjNQIRmFrgyWmxO7zvueDCaQ60s8UarYEwB9Rg2nw4Kyc1gA-dAfzwAMc0JkbZjNDCIupE4Qtgbl9AbR94C-A.webp",
            nickname: "작성자1",
            content: "제가 정말 좋아하는 노래예요. 이 노래를 아직 안 들어보셨다면 ~~~"
        },
        {
            id: 2,
            artist: "아이유",
            title: "가을아침",
            thumbnail: "https://i.namu.wiki/i/kh5QzqhYq_xIM0AVSfaj81jsk6eSJY0DEl6cTHLBuFgZ_bEZacs2zJETuLfWVI7_ipjNQIRmFrgyWmxO7zvueDCaQ60s8UarYEwB9Rg2nw4Kyc1gA-dAfzwAMc0JkbZjNDCIupE4Qtgbl9AbR94C-A.webp",
            nickname: "작성자2",
            content: "제가 정말 좋아하는 노래예요."
        },
    ]
    return (
        <InnerContainer>
            <H3>
                오늘의 인기 포스팅
            </H3>
            <CardList>
                {
                    List.map((item) => {
                        return (
                            <Card key={item.id}>
                                <CardBackground src={item.thumbnail}/>
                                <MusicArea>
                                    <Artist>
                                        {item.artist}
                                    </Artist>
                                    <Title>
                                        {item.title}
                                    </Title>
                                </MusicArea>
                                <PostArea>
                                    <PostNickname>
                                        {item.nickname}
                                    </PostNickname>
                                    <PostContent>
                                        {item.content}
                                    </PostContent>
                                </PostArea>
                            </Card>
                        )
                    })
                }
            </CardList>
        </InnerContainer>
    )
}

export default PopularPosts

const InnerContainer = styled.div`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 0px 20px;
    margin-top: 48px;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    margin-bottom: 10px;
`

const CardList = styled.div`
    display: flex;
    gap: 10px;
`

const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    
    width: 170px;
    height: 200px;

    border-radius: 10px;

    box-sizing: border-box;
`

const CardBackground = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
    opacity: 0.8;

    border-radius: 10px;
    
    box-sizing: border-box;
`

const MusicArea = styled.div`
    position: absolute; 
    padding: 10px;
`

const Artist = styled.p`
    font-size: 14px;
    font-weight: 500;
`

const Title = styled.p`
    font-size: 14px;
    font-weight: 500;
`

const PostArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    position: absolute;
    bottom: 0px;

    width: 100%;
    height: 90px;
    
    box-sizing: border-box;
    border-radius: inherit;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    padding: 10px;
`

const PostNickname = styled.p`
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 400;
`

const PostContent = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
    overflow: hidden;
 
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-top: 6px;
`