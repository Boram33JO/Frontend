import { styled } from "styled-components"
import { Post, Song } from "../../pages/DetailPage"

interface Songs {
    songs: Song[]
}

const Playlist: React.FC<Songs> = ({ songs }) => {
    return (
        <PlaylistContainer>
            {
                songs.map(item => {
                    return (
                        <PlaylistItem key={item.id}>
                            <ItemThumbnail src={item.thumbnail} />
                            <ItemInfo>
                                <MusicInfo>
                                    <ItemP $color="#222222">
                                        {item.title}
                                    </ItemP>
                                    <ItemP $color="#222222">
                                        {item.artistName}
                                    </ItemP>
                                </MusicInfo>
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
    flex-direction: column;
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