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
            return error.response.data.message  
        }
    }
    }
}
export default FriendApi