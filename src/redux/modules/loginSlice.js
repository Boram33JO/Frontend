import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token"); // 토큰 가져오기


const initialState = {
  isLogin: !!storedToken,
};

const isLoginSlice = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
    logIn: (state, action) => {
        state.isLogin = true;
    },
    logOut: (state, action) => {
        state.isLogin = false;
        localStorage.removeItem("token"); // 토큰 삭제
    },
  },
});

export const { logIn, logOut } = isLoginSlice.actions;
export default isLoginSlice.reducer;