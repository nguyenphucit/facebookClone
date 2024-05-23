import { createSlice } from "@reduxjs/toolkit";

const initialState={
   posts:[],
   storys:[],

}
const NewFeedSlice=createSlice({
    name:'newfeed',
    initialState,
    reducers:{
        getAllPosts:(state,action)=>{
            state.posts=action.payload.posts
        },
        addPost:(state,action)=>{
            state.posts.unshift(action.payload.post)
        },
        updateCommentToPost:(state,action)=>{
            state.posts.forEach(item=>{if(item.id===action.payload.postId){
                item.comments.push(action.payload.commentInfo)
            }})
        }
    }
})
export const {getAllPosts,addPost,updateCommentToPost} =NewFeedSlice.actions
export default NewFeedSlice.reducer