import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage  from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EditorPage from "./pages/EditorPage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import MapPage from "./pages/MapPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<MainPage />}
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/signup"
                    element={<SignupPage />}
                />
                <Route
                    path="/editor"
                    element={<EditorPage />}
                />
                <Route
                    path="/detail/:id"
                    element={<DetailPage />}
                />
                <Route
                    path="/profile/:id"
                    element={<ProfilePage />}
                />
                <Route
                    path="/map"
                    element={<MapPage />}
                />
                <Route
                    path="/*"
                    element={<NotFoundPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
