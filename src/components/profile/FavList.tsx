import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom';

const FavList = () => {
   
    const navigate = useNavigate();

    const handleViewAllClick = () => {
        // Navigate to the desired page when the button is clicked
        navigate('/profile/{userId}/wishlist');
    };


    return (
        <InnerContainer>
            <Post>
          <H3>ㅇㅇ님이 좋아한 포스팅</H3>
          <Bt onClick={handleViewAllClick}>전체보기</Bt>
        </Post>

            <MusicList>
            <MusicListItem>
                    <Date>23.07.31</Date>
                    <Content>운동할 때 듣습니다.</Content>
                    <Iconbox>
            <Icon1>💜 좋아요수</Icon1>
            <Icon2>✉️ 댓글수</Icon2>
          </Iconbox>
                </MusicListItem>
              
            </MusicList>
        </InnerContainer>
    )
}

export default FavList;

const InnerContainer = styled.div`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 48px;
    background-color: #EEEEEE;
`

const Post = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  align-items: center; // 요소들을 수직 가운데 정렬하기 위해 추가
  /* gap: 20%; // 간격 */
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const Bt = styled.div`
 font-size: 14px;
  font-family: "Pretendard";

  cursor: pointer;
  margin-left: 115px; // 수정 해야함.
`;


const MusicList = styled.ol`
    display: block;
`

const MusicListItem = styled.li`
  display: flex;
  flex-direction: column; /* 요소들을 수직으로 배치 */
  align-items: flex-start; /* 요소들을 수직 축에서 왼쪽으로 정렬 */
  height: 50px;
  border-radius: 6px;
  background-color: #d2d2d2;
  margin-top: 10px;
  padding: 10px 10px;
`;


const Date = styled.div`
font-size: 12px;
`
const Content = styled.div`
font-size: 12px;
margin-top: 5px;
`
const Iconbox = styled.div`
  display: flex; /* 요소들을 수평으로 나란히 배치 */
  align-items: center; /* 요소들을 수평 축에서 가운데로 정렬 */
  gap: 10px;
  margin-top: 10px;
`;

const Icon1 = styled.div`
  font-size: 12px;
`;
const Icon2 = styled.div`
  font-size: 12px;

  
`;
const BT = styled.button`
width: 100%;
  height: 45px;
  padding: 10px;
  background-color: #d9d9d9;
  color: 22222;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
`;