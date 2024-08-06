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
            return error.response.data
        }
    }
    },

    getLatestMessage:async (userId)=>{
        const url=`/chat/allChat/${userId}`
        try {
            const response=await axiosClient.get(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data
        }
    },

    updateMessageStatus:async (userId)=>{
        const url=`/chat/updateStatus/${userId}`
        try {
            const response=await axiosClient.put(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data
        }
    },

    updateMessagesStatusByRoomId:async (roomId)=>{
        const url=`chat/updateStatusByRoomId/${roomId}`
        try {
            const response=await axiosClient.put(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data
        }
    }
}
export default ChatApi