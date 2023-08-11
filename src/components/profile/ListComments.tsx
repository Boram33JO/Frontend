import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom';

const ListComments = () => {
   
    const navigate = useNavigate();

    const handleViewAllClick = () => {
        // Navigate to the desired page when the button is clicked
        navigate('/profile/{userId}/comments');
    };


    return (
        <InnerContainer>
            <Post>
          <H3>나의 댓글 모아보기</H3>
          <Bt onClick={handleViewAllClick}>전체보기</Bt>
        </Post>

            <MusicList>
            <MusicListItem>
                    
                    <Content>운동할 때 듣습니다.</Content>
                    <Date>23.07.31</Date>
                </MusicListItem>
            </MusicList>
        </InnerContainer>
    )
}

export default ListComments;

const InnerContainer = styled.div`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    padding-top: 52px;
   
  
`

const Post = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  justify-content: space-between;
  align-items: center; // 요소들을 수직 가운데 정렬하기 위해 추가
 
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  color: #e7e6f0;
  margin-bottom: 10px;
`;
const Bt = styled.div`
 font-size: 14px;
  font-family: "Pretendard";
  color: #e7e6f0;
  cursor: pointer;
 
`;


const MusicList = styled.ol`
    display: block;
`

const MusicListItem = styled.li`
  display: flex;
  flex-direction: column; /* 요소들을 수직으로 배치 */
  align-items: flex-start; /* 요소들을 수직 축에서 왼쪽으로 정렬 */
  height: 76px;
  width: 256px;
  border-radius: 6px;
  border: 1px solid #524d58;
  background-color: #434047;
  margin-top: 16px;
  padding-top: 20px;
  padding-left: 12px;

`;

const Content = styled.div`
font-size: 16px;
font-weight: 600;
color: #d9d8df;
`;


const Date = styled.div`
font-size: 14px;
color: #a6a3af;
font-weight: 500;
padding-top: 10px;;
`;
