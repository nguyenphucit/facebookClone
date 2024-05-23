import { createSlice } from "@reduxjs/toolkit";

const initialState={
   socket:null
}
const SocketSlice=createSlice({
    name:'socket',
    initialState,
    reducers:{
        setSocket:(state,action)=>{
            state.socket=action.payload.socket
        }
    }
})
export const {setSocket} =SocketSlice.actions
export default SocketSlice.reducer