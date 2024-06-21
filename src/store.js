import { configureStore} from "@reduxjs/toolkit";
import  {thunk}  from "redux-thunk";
import UserSlice from "./slice/UserSlice";
import NewFeedSlice from "./slice/NewFeedSlice";
import AuthSlice from "./slice/AuthSlice";
import ProfileSlice from "./slice/ProfileSlice";
import SocketSlice from "./slice/SocketSlice";
import SearchSlice from "./slice/SearchSlice";
export const store =configureStore({
    reducer:{
        user:UserSlice,
        auth:AuthSlice,
        newFeed:NewFeedSlice,
        search:SearchSlice,
        profile:ProfileSlice,
        socket:SocketSlice
    },
    middleware:()=>[thunk]
})