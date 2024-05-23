import axiosClient from "./axiosConfig"

const NotificationApi={
     getNotificationByUserId:async (userId)=>{
        const url=`/notification/${userId}`
        try {
            const response=await axiosClient.get(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data.message  
        }
    },

    updateNotificationStatus:async (userId)=>{
        const url=`/notification/updateStatus/${userId}`
        try {
            const response=await axiosClient.put(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data.message  
        }
    }
}
export default NotificationApi