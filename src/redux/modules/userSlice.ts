import { createSlice } from "@reduxjs/toolkit";
import { LoginUser } from "../../models/user";

const initialState: LoginUser = {
  isLogin: false,
  userId: null,
  nickname: null,
  userImage: null,
  introduce: null,
  //eamil: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn2: (state) => {
      state.isLogin = true;
    },
    logout: () => {
      localStorage.removeItem("AccessToken"); // 토큰 삭제
      localStorage.removeItem("RefreshToken"); // 토큰 삭제
      return { ...initialState };
    },
    setUserInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    nicknameUpdate: (state, action) => {
      state.nickname = action.payload;
    },
    userImageUpdate: (state, action) => {
      state.userImage = action.payload;
    },
    introduceUpdate: (state, action) => {
      state.introduce = action.payload;
    },
  },
});

export const {
  logIn2,
  logout,
  setUserInfo,
  nicknameUpdate,
  userImageUpdate,
  introduceUpdate,
} = userSlice.actions;
export default userSlice.reducer;
