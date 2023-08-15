import Mypicture from "../components/profile/MyPicture";
import FollowersAll from "../components/profile/FollowersAll";
import List from "../components/profile/List";
import FavList from "../components/profile/FavList";
import ListComments from "../components/profile/ListComments";
import GlobalStyle from "../components/common/GlobalStyle";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import { getProfileLists } from "../api/profile";
import { useQuery } from "react-query";

const ProfilePage = () => {
  const { userId } = useParams();
  const LoginUser = useSelector((state: RootState) => state.user);
  const isMyProfile = Number(userId) === LoginUser.userId;

  const { data, isLoading, isError } = useQuery(["Profile", userId],
    async () => {
      const response = await getProfileLists(userId);
      console.log("프로필", response);
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
    <>
      {/* <GlobalStyle /> */}
      <Mypicture userInfo={data.userInfo} follow={data.follow}/>
      <List userInfo={data.userInfo} postList={data.postList} />
      <FollowersAll followList={data.followList} />
      {isMyProfile && (
        <>
          <FavList userInfo={data.userInfo} wishList={data.wishList} />
          <ListComments commentList={data.commentList} />
        </>
      )}
    </>
  );
};

export default ProfilePage;
