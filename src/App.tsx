import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EditorPage from './pages/EditorPage';
import DetailPage from './pages/DetailPage';
import ProfilePage from './pages/ProfilePage';
import MapPage from './pages/MapPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/common/Layout';
import ProfileDetailPage from './pages/ProfileDetailPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/profile/:userId/id" element={<ProfileDetailPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
