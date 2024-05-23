import { createSlice } from "@reduxjs/toolkit";

const initialState={
   posts:[],
   images:[]
}
const ProfileSlice=createSlice({
    name:'profile',
    initialState,
    reducers:{
        getAllPostsByUserId:(state,action)=>{
            state.posts=action.payload.posts
        },
        getAllImagesByUserId:(state,action)=>{
            const postHaveImage=state.posts.filter(item=>(item.file.length!==0))
            state.images=postHaveImage.map(item=>item.file)
            
        }
    }
})
export const {getAllPostsByUserId,getAllImagesByUserId} =ProfileSlice.actions
export default ProfileSlice.reducer