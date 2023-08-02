import { styled } from "styled-components"
import { PostType } from "../../pages/DetailPage"

type PostProps = {
    post: PostType
}

const Playlist: React.FC<PostProps> = ({ post }) => {
    return (
        <PlaylistContainer>
            {
                post.tracks.map(item => {
                    return (
                        <PlaylistItem>
                            <ItemThumbnail src={item.thumbnail} />
                            <ItemInfo>
                                <MusicInfo>
                                    <ItemP $color="#222222">
                                        {item.title}
                                    </ItemP>
                                    <ItemP $color="#888888">
                                        {item.artist}
                                    </ItemP>
                                </MusicInfo>
                                <ItemP $color="#626262">
                                    50명이 들었던 음악
                                </ItemP>
                            </ItemInfo>
                        </PlaylistItem>
                    )
                })
            }
        </PlaylistContainer>
    )
}

export default Playlist

const PlaylistContainer = styled.div`
    display: flex;
    background-color: #F5F5F5;
    justify-content: center;
    margin-top: 20px;
    padding: 20px;
`

const PlaylistItem = styled.div`
    display: flex;
    width: 300px;
    height: 80px;
    gap: 10px;
`

const ItemThumbnail = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 6px;
`

const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
`

const MusicInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const ItemP = styled.p< { $color: string } >`
    font-size: 16px;
    color: ${props => props.$color};
`