import { configureStore } from "@reduxjs/toolkit";
import isLoginSlice from "../modules/loginSlice";

const store = configureStore({
    reducer: { 
      isLogin : isLoginSlice,
    
    },
   
  });
  
  export default store;