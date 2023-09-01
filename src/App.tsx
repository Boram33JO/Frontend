import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import MapPage from "./pages/MapPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/common/Layout";
import RedirectKakao from "./components/login/RedirectKakao";
import FollowPage from "./pages/FollowPage";
import MypostPage from "./pages/MypostPage";
import MycommentsPage from "./pages/MycommentsPage";
import WishlistPage from "./pages/WishlistPage";
import PasswordPage from "./pages/PasswordPage";
import ProfileEditPage from "./pages/ProfileEditPage ";
import IntroPage from "./pages/IntroPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/intro" element={<IntroPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/edit/:postId" element={<EditPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/profile/edit/:userId" element={<ProfileEditPage />} />
        <Route path="search" element={<SearchPage />} />
        {/* 내 정보 수정하기 */}
        <Route path="/profile/:userId" element={<ProfilePage />} />
        {/* 프로필 전체 보기 */}
        <Route path="/profile/:userId/follow" element={<FollowPage />} />
        {/* 팔로워 보기 */}
        <Route path="/profile/:userId/post" element={<MypostPage />} />
        {/* 내가쓴 게시물만 보기 */}
        <Route path="/profile/:userId/comments" element={<MycommentsPage />} />
        {/* 내가 댓글 단 게시물만 보기 */}
        <Route path="/profile/:userId/wishlist" element={<WishlistPage />} />
        {/* 내가 좋아요한 게시물만 보기 */}
        <Route path="/profile/:userId/password" element={<PasswordPage />} />
        {/* 비번찾기 페이지 */}
        <Route path="/map" element={<MapPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
      <Route path="/oauth/token" element={<RedirectKakao />} />
    </Routes>
  );
}

export default App;
