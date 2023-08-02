import DetailContent from '../components/detail/DetailContent'
import Playlist from '../components/detail/Playlist'
import CommentList from '../components/detail/CommentList'
import CommentForm from '../components/detail/CommentForm'

type Comment = {
  id: string,
  nickname: string,
  userImage: string,
  content: string,
  createdAt: string
}

type Track = {
  id: string,
  artist: string,
  title: string,
  thumbnail: string
}

export type PostType = {
  id: string,
  nickname: string,
  userImage: string,
  address: string,
  content: string,
  tracks: Track[],
  comments: Comment[]
}

const DetailPage = () => {
  const post: PostType =
  {
    id: "1",
    nickname: "hyesung_oo",
    userImage: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fmnfhq%2FbtqS1UUSGIu%2FpgoALMUTOH2CvSN8pkDNYk%2Fimg.jpg",
    address: "서울시 강남구 도산대로",
    content: "운동할 때 항상 이 노래를 들어요!! 힘들고 지쳐도 아무튼 힘내자 그래도 너무 힘들다 흑흑",
    tracks: [
      {
        id: "1",
        artist: "Taylor Swift",
        title: "Red",
        thumbnail: "https://i.scdn.co/image/ab67616d00001e02254c8a09649551438b20f4c0"
      }
    ],
    comments: [
      {
        id: "1",
        nickname: "JISSU_98",
        userImage: "https://i.namu.wiki/i/odAQgVpvjzw04OSo2iYYVO5YRte7-x60G6Kah_qEetFzOkYskvmwpL3LpQVI5sP9I68jSzvVwud58EJ_6SD3nV039muukmmegat6T7GFYvHt5EQUO8V4IvnE5mYA8zqTW91rGbHFaaQhT_LfOqUr1w.webp",
        content: "퇴근 후에는 음악 들으며 휴식하는게 최고에요!",
        createdAt: "1시간 전"
      },
      {
        id: "2",
        nickname: "JISSU_98",
        userImage: "https://i.namu.wiki/i/odAQgVpvjzw04OSo2iYYVO5YRte7-x60G6Kah_qEetFzOkYskvmwpL3LpQVI5sP9I68jSzvVwud58EJ_6SD3nV039muukmmegat6T7GFYvHt5EQUO8V4IvnE5mYA8zqTW91rGbHFaaQhT_LfOqUr1w.webp",
        content: "퇴근 후에는 음악 들으며 휴식하는게 최고에요!",
        createdAt: "1시간 전"
      }
    ]
  }
  return (
    <>
      <DetailContent post={post} />
      <Playlist post={post} />
      <CommentList post={post} />
      <CommentForm />
    </>
  )
}

export default DetailPage