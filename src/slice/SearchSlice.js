import { createSlice } from "@reduxjs/toolkit";

const initialState={
   posts:[],
   users:[]

}
const SearchSlice=createSlice({
    name:'search',
    initialState,
    reducers:{
        getAllPosts:(state,action)=>{
            state.posts=action.payload.posts
        },
        getAllUsers:(state,action)=>{
            state.users=action.payload.users
        }
    }
})
export const {getAllPosts,getAllUsers} =SearchSlice.actions
export default SearchSlice.reducer