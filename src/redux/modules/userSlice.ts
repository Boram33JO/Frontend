import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../models/user";

const initialState: UserInfo = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            console.log(action.payload);
            return { ...state, ...action.payload };
        },
        nicknameUpdate: (state, action) => {
            state.nickname = action.payload;
        },
        userImageUpdate: (state, action) => {
            state.userImage = action.payload
        },
        introduceUpdate: (state, action) => {
            state.introduce = action.payload;
        },
    },
});

export const { setUserInfo, nicknameUpdate, userImageUpdate, introduceUpdate } = userSlice.actions;
export default userSlice.reducer;