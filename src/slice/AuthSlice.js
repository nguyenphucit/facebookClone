import { createSlice } from "@reduxjs/toolkit";

const initialState={
    access_token:'',
    refresh_token:''
}
const AuthSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        Login:(state,action)=>{
            state.access_token=action.payload.access_token
            state.refresh_token=action.payload.refresh_token
        },
        Logout:(state)=>{
            state.access_token=""
            state.refresh_token=""
        }
    }
})
export const {Login,Logout}=AuthSlice.actions
export default AuthSlice.reducer