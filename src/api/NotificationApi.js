import axiosClient from "./axiosConfig"

const NotificationApi={
     getNotificationByUserId:async (userId)=>{
        if(!userId)
            return;
        const url=`/notification/${userId}`
        try {
            const response=await axiosClient.get(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data
        }
    },

    updateNotificationStatus:async (userId)=>{
        const url=`/notification/updateStatus/${userId}`
        try {
            const response=await axiosClient.put(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data
        }
    },

    deleteNotificationById:async(notificationId)=>{
        const url=`/notification/${notificationId}`
        try {
            const response=await axiosClient.delete(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data
        }
    }
}
export default NotificationApi