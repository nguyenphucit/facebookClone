import { createSlice } from "@reduxjs/toolkit";

const initialState={
   chats:[],
   chatBoxStatus:false,
   currentChat:0
}
const ChatSlice=createSlice({
    name:'chat',
    initialState,
    reducers:{
        getAllChat:(state,action)=>{
            state.chats=action.payload.chats
        },
        ManageChatBox:(state,action)=>{
            state.chatBoxStatus=action.payload.status
            state.currentChat=action.payload.id
        }
    }
})
export const {getAllChat,ManageChatBox} =ChatSlice.actions
export default ChatSlice.reducer