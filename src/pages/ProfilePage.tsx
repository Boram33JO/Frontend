import Mypicture from "../components/profile/MyPicture";
import FollowersAll from "../components/profile/FollowersAll";
import List from "../components/profile/List";
import FavList from "../components/profile/FavList";
import ListComments from "../components/profile/ListComments";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import { getProfileLists } from "../api/profile";
import { useQuery } from "react-query";
import { useEffect } from "react";
import Loading from "../components/map/Loading";
import NotFoundPage from "./NotFoundPage";

const ProfilePage = () => {
  const { userId } = useParams();
  const LoginUser = useSelector((state: RootState) => state.user);
  const isMyProfile = Number(userId) === LoginUser.userId;
  const pathname = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { data, isLoading, isError } = useQuery(["Profile", userId],
    async () => {
      const response = await getProfileLists(userId);
      // console.log("Profile Page: ", response);
      return response.data;
    }
  )
// 로그인 하지 않으면 삭제되었다고하기.
  if (!LoginUser.userId) {
    return <NotFoundPage />;
  }


  if (isLoading) {
    return <div>< Loading /></div>
  }

  if (isError) {
    return <NotFoundPage/>
  }

  return (
    <>
      <Mypicture userInfo={data.userInfo} follow={data.follow} />
      <List userInfo={data.userInfo} postList={data.postList} />
      <FollowersAll userInfo={data.userInfo} followList={data.followList} />
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
