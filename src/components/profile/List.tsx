import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MyPostList from '../profiledetail/MyPostList';

const List = () => {
    const navigate = useNavigate();
    const { userId } = useParams(); // URL 파라미터로 userId를 받아옵니다.
    const [nickname, setNickname] = useState('');
    const [isCurrentUser, setIsCurrentUser] = useState(false); // 로그인한 사용자 여부

    useEffect(() => {
        // 컴포넌트가 마운트될 때 로컬 스토리지에서 닉네임을 가져옵니다.
        const storedNickname = localStorage.getItem("nickname");
        if (storedNickname) {
            setNickname(storedNickname);
        }
    }, []);

    useEffect(() => {
        // 현재 페이지의 userId가 로그인한 사용자의 ID와 일치하는지 확인합니다.
        const loggedInUserId = localStorage.getItem("userId"); // 로그인한 사용자의 ID
        setIsCurrentUser(userId === loggedInUserId);
    }, [userId]);

    const handleViewAllClick = () => {
        // "전체보기" 버튼을 클릭했을 때 해당 프로필 페이지로 이동합니다.
        if (isCurrentUser) {
            // 로그인한 사용자의 경우 자신의 프로필 페이지로 이동
            navigate(`/profile/${userId}/post`);
        } else {
            // 타인의 프로필 페이지로 이동
            navigate(`/Profile/${userId}/post`);
        }
    };

    return (
        <>
            <InnerContainer>
                <Post>
                    <H3>{isCurrentUser ? `${nickname}님의 포스팅!` : `${nickname}님의 포스팅`}</H3>
                    <Bt onClick={handleViewAllClick}>{isCurrentUser ? '전체보기' : `${nickname}님의 포스팅 전체보기`} </Bt>
                </Post>
            </InnerContainer>
            {/* <MyPostList /> */}
        </>
    );
};

export default List;


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
