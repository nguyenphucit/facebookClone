import axiosClient from "./axiosConfig"

const FriendApi={
    getFriendById:async (userId)=>{
        const url=`/friend/${userId}`
        if(userId){
        try {
            const response=await axiosClient.get(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data
        }
    }
    },

    AddFriend:async(senderId,receiverId)=>{
        const url=`/friend/add/${senderId}?addId=${receiverId}`
        try {
            const response=await axiosClient.post(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data
        }
    },

    GetMutualFriend:async(userId,friendId)=>{
        const url=`/friend/mutualFriend/${userId}?friendId=${friendId}`
        try {
            const response=await axiosClient.get(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data
        }
    }
}
export default FriendApi