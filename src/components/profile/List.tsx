import { styled } from "styled-components";

const List = () => {

    const category = [
        {
            id: "1",
            name: "최신순"
        },
        {
            id: "2",
            name: "과거순"
        },
        {
            id: "3",
            name: "좋아요순"
        },

       
    ]
  return (
    <InnerContainer>
      <H3>ㅇㅇ님의 포스팅</H3>
      <CategoryList>
        {category.map((item) => {
          return (
            <CategoryListItem>
              <CategoryListItemName>{item.name}</CategoryListItemName>
            </CategoryListItem>
          );
        })}
      </CategoryList>
      <MusicList>
        <MusicListItem>
          <Date>23.07.31</Date>
          <Content>
            운동할 때 항상 이 노래를 들어요. 힘들고 지칠 때 도움이 되거든요!
          </Content>
          <Iconbox>
            <Icon1>💜 좋아요수</Icon1>
            <Icon2>✉️ 댓글수</Icon2>
          </Iconbox>
        </MusicListItem>
        <MusicListItem>
          <Date>23.07.31</Date>
          <Content>
            운동할 때 항상 이 노래를 들어요. 힘들고 지칠 때 도움이 되거든요!
          </Content>
          <Iconbox>
            <Icon1>💜 좋아요수</Icon1>
            <Icon2>✉️ 댓글수</Icon2>
          </Iconbox>
        </MusicListItem> <MusicListItem>
          <Date>23.07.31</Date>
          <Content>
            운동할 때 항상 이 노래를 들어요. 힘들고 지칠 때 도움이 되거든요!
          </Content>
          <Iconbox>
            <Icon1>💜 좋아요수</Icon1>
            <Icon2>✉️ 댓글수</Icon2>
          </Iconbox>
        </MusicListItem>
        <BT>전체보기</BT>
      </MusicList>
    </InnerContainer>
  );
};

export default List;

const InnerContainer = styled.div`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  margin-top: 48px;
  background-color: #eeeeee;
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const CategoryListItem = styled.div`
  width: 70px;

  background-color: #d2d2d2;

  border-radius: 30px;

  padding: 10px;
  text-align: center;

  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const CategoryListItemName = styled.span`
  font-size: 14px;
  line-height: 14px;
`;

const MusicList = styled.ol`
  display: block;
`;

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
`;
const Content = styled.div`
  font-size: 12px;
  margin-top: 5px;
`;

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