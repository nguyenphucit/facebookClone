import axiosClient from "./axiosConfig"

const PostApi={
    getAllPosts:async ()=>{
        const url='/posts'
        try {
            const response=await axiosClient.get(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data.message  
        }
    },
    getPostByUserId:async(userId)=>{
        const url=`/posts/by-user?userId=${userId}`
        try {
            const response=await axiosClient.get(url)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data.message  
        }
    },
    createPost:async(postData)=>{
        const url='/posts'
        try {
            const response=await axiosClient.post(url,postData,{headers:{
                "Content-Type": "multipart/form-data"
              }});
            return response
        } catch (error) {
            if(error.response)
            return error.response.data.message  
        }
    },

    commentOnPost:async(commentInfo,postId)=>{
        const url=`/comment?postId=${postId}`
        try {
            const response=await axiosClient.post(url,commentInfo)
            return response
        } catch (error) {
            if(error.response)
            return error.response.data.message  
        }
    }
}
export default PostApi