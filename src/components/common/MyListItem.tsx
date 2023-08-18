import { useState } from 'react'
import { styled } from "styled-components"
import { ReactComponent as Expand } from '../../assets/images/expand.svg'
import { ReactComponent as Contract } from '../../assets/images/contract.svg'
import { ReactComponent as Headphone } from '../../assets/images/headphone.svg'
import { ReactComponent as Like } from '../../assets/images/like.svg'
import spotify from '../../assets/images/Spotify_Icon_RGB_Black.png'
import { useNavigate } from 'react-router-dom'
import { Post } from '../../models/post'
import { displayedAt, getProfileImage } from '../../utils/common'
import Preview from './Preview'
import { cardBackground } from '../../utils/cardBackground'

interface Props {
    post: Post;
}
// postList: [{postId: 0, }, {postId: 1, }] ;

// post: {postId: 0, postTitle: , userId: }

// const MyListItem:React.FC<Props> = ({ post }) => {
const MyListItem = ({ post }: Props) => {
    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [songIndex, setSongIndex] = useState(0);
    const [preview, setPreview] = useState(false);
    const handleClickListItem = (index: number) => {
        setSongIndex(index);
        setPreview(true);
    }
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <ListItemContainer $src={cardBackground(post.category, post.postId)}>
            <ListItemTop onClick={() => navigate(`/detail/${post.postId}`)}>
                <ProfileArea>
                    {/* <ProfileThumnail src={getProfileImage(post.userImage)} alt="userImage" /> */}
                    <ProfileInfo>
                        <StP $color="#FAFAFA" $size={"14px"}>
                            {post.nickname}
                        </StP>
                        <StP $color="#C7C7C7" $size={"14px"}>
                            {displayedAt(post.createdAt)}
                        </StP>
                    </ProfileInfo>
                </ProfileArea>
                <TitleArea>
                    <StP $color="#FAFAFA" $size={"16px"}>
                        {post.postTitle}
                    </StP>
                    <TitleSubArea>
                        <SvgIcon style={{ marginRight: "4px" }}>
                            <StLike />
                        </SvgIcon>
                        <StP $color="#FAFAFA" $size={"14px"}>
                            {post.wishlistCount}
                        </StP>
                        <Divider />
                        <StP $color="#FAFAFA" $size={"14px"} $weight={"500"}>
                            {categories[Number(post.category) - 1]}
                        </StP>
                    </TitleSubArea>
                </TitleArea>
            </ListItemTop>
            <DropdownToggle onClick={toggleDropdown}>
                <PlaylistLeft>
                    <MusicInfo>
                        <StP $color={"#222222"} $size={"16px"}>
                            {post.songs[0].songTitle}
                        </StP>
                        <StP $color={"#A6A3AF"} $size={"14px"}>
                            {post.songs[0].artistName}
                        </StP>
                    </MusicInfo>
                </PlaylistLeft>
                <PlaylistRight>
                    <SvgIcon>
                        <Headphone />
                        <StP $color={"#414141"} $size={"14px"}>
                            {`+${post.songs.length}`}
                        </StP>
                    </SvgIcon>
                    <SvgIcon>
                        {
                            (!isOpen) ? <Expand /> : <Contract />
                        }
                    </SvgIcon>
                </PlaylistRight>
                {isOpen && (
                    <DropdownList>
                        {post.songs.map((song, index) => {
                            return (
                                <DropdownItem key={song.id} onClick={() => { handleClickListItem(index) }}>
                                    <PlaylistLeft>
                                        <MusicThumbnail src={song.thumbnail} />
                                        <MusicInfo>
                                            <StP $color={"#222222"} $size={"16px"}>
                                                {song.songTitle}
                                            </StP>
                                            <StP $color={"#A6A3AF"} $size={"14px"}>
                                                {song.artistName}
                                            </StP>
                                        </MusicInfo>
                                    </PlaylistLeft>
                                    <SpotifyIcon src={spotify} />
                                </DropdownItem>
                            )
                        })}
                    </DropdownList>
                )}
            </DropdownToggle>
            {preview && <Preview url={post.songs[songIndex].audioUrl} song={post.songs[songIndex]} setPreview={setPreview} />}
        </ListItemContainer >
    )
}

export default MyListItem;

const ListItemContainer = styled.div<{ $src?: string }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 250px;
    
    background: ${(props) => props.$src || "#322D2A"};
    color: white;

    border-radius: 8px;
    box-sizing: border-box;
    padding: 14px;
`

const ListItemTop = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 5px;
    cursor: pointer;
`

const ProfileArea = styled.div`
    display: inline-flex;
    flex: 0.46 0 0;
    align-items: center;
    gap: 10px;
`

const TitleArea = styled.div`
    display: inline-flex;
    flex-direction: column;
    flex: 0.54 0 0;
    align-items: flex-end;
    gap: 4px;
`

const TitleSubArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`

const StLike = styled(Like)`
    width: 14px;
    height: 14px;
    path{
        fill: #FAFAFA;
        stroke: #FAFAFA
    }
`

const ProfileThumnail = styled.img`
    width: 30px;
    height: 30px;
    background-color: #ECECEC;
    border-radius: 50%;
`

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const DropdownToggle = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    width: 100%;
    height: 58px;

    background-color: #FFFFFF;
    color: #414141;
    border-radius: 6px;

    box-sizing: border-box;
    padding: 14px;
    cursor: pointer;
`

const PlaylistLeft = styled.div`
    display: inline-flex;
    gap: 10px;
`

const MusicThumbnail = styled.img`
    width: 42px;
    height: 42px;
`

const MusicInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const StP = styled.p<{ $color: string, $size: string, $weight?: string }>`
    color: ${(props) => props.$color};
    font-size: ${(props) => props.$size};
    font-weight: ${(props) => props.$weight || 600};
    line-height: calc(100% + 2px);

    & {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
`

const PlaylistRight = styled.div`
    display: inline-flex;
    align-items: center;
    
    color: #414141;
    font-size: 14px;
    line-height: 20px;
    
    gap: 20px;
    margin-left: 10px;
`

const SpotifyIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-left: 10px;
`

const SvgIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`

const DropdownList = styled.div`
    position: absolute;
    top: 115%;
    left: 0;
    width: 100%;
    z-index: 2;
    max-height: 182px;

    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    border-radius: 6px;
    overflow-y: scroll;

    box-sizing: border-box;
    padding: 14px 20px;
    gap: 14px;

    &::-webkit-scrollbar {
        width: 6px;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #C6C6C6;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: #75717B;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-button:vertical:start:decrement,
    &::-webkit-scrollbar-button:vertical:end:decrement {
        display:block;
        height: 14px;
    }
`

const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`

const Divider = styled.div`
    height: 10px;
    width: 1.5px;
    border-radius: 1.5px;
    background-color: #FAFAFA;
    padding: 0;
    margin: 0px 8px;
`