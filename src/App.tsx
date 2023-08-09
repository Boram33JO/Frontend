import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EditPage from './pages/EditPage';
import DetailPage from './pages/DetailPage';
import ProfilePage from './pages/ProfilePage';
import MapPage from './pages/MapPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/common/Layout';
import EditPages from './pages/EditPages';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/edit/:id" element={<EditPages />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
