import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:{},
    friends:[],
    notifications:[]
}
const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        getUserInfo:(state,action)=>{
            state.userInfo=action.payload.user
        },
        getFriendByUserId:(state,action)=>{
            state.friends=action.payload.friends
        },
        updateUserAvatar:(state,action)=>{
            state.userInfo.avatar=action.payload.newUserInfo.avatar
        },
        getAllNotifications:(state,action)=>{
            state.notifications=[...action.payload.notifications]
        },
        getNotification:(state,action)=>{
            const notification=action.payload.notification
            const checker=state.notifications.filter(item=>item.id===action.payload.notification.id)
            if(checker.length===0){
            state.notifications.push(notification)
            }
        }
        
    }
})
export const {getUserInfo,getFriendByUserId,updateUserAvatar,getAllNotifications,getNotification}=UserSlice.actions
export default UserSlice.reducer