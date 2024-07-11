import axiosClient from "./axiosConfig"

const UserApi={
    getUserById:async(userId)=>{
        const url=`/user/${userId}`
        try {
            const response=await axiosClient.get(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data
        }
    },
    getAllUser:async({search,items_per_page,page})=>{
        const url=`/user?search=${search}&items_per_page=${items_per_page}&page=${page}`
        try {
            const response=await axiosClient.get(url)
            return response
        } catch (error) {
            if(error)
            return error.response.data  
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
            return error.response.data 
        }
    },
}
export default UserApi