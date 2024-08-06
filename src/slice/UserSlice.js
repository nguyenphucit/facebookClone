import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:{},
    friends:[],
    notifications:[],
    latestChats:[]
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
        },

        getAllLatestChat:(state,action)=>{
            state.latestChats=[...action.payload.latestChats]
        },

        updateLatestChatReceiver:(state,action)=>{
            state.latestChats.map(item=>{
                const [id1,id2] = item.roomId.split('_').map(Number);  
                // Determine the receiverId based on the senderId
                const receiverId = id1 === Number.parseInt(state.userInfo.id) ? id2 : id1;

                return item.receiver=state.friends.find(friend=>friend.id===receiverId)
            })

        }
    }
})
export const {getUserInfo,getFriendByUserId,updateUserAvatar,getAllNotifications,getNotification,getAllLatestChat,updateLatestChatReceiver}=UserSlice.actions
export default UserSlice.reducer