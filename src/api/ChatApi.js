import axiosClient from "./axiosConfig"

const ChatApi={
    getChatByRoomId:async (roomId)=>{
        const url=`/chat?roomId=${roomId}`
        if(roomId){
        try {
            const response=await axiosClient.get(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data.message  
        }
    }
    }
}
export default ChatApi