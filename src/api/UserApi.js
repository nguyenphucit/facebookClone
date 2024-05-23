import axiosClient from "./axiosConfig"

const UserApi={
    getUserById:async(userId)=>{
        const url=`/user/${userId}`
        try {
            const response=await axiosClient.get(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data.message  
        }
    },
    UpdateAvatar:async(formData,userId)=>{
        const url=`/user/updateAvatar/${userId}`
        try {
            const response=await axiosClient.put(url,formData,{headers:{
                "Content-Type": "multipart/form-data"
            }})
            return response
        } catch (error) {
            if(error.response)
            return error.response.data.message  
        }
    }
}
export default UserApi