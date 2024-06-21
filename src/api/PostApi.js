import axiosClient from "./axiosConfig"

const PostApi={
    getAllPosts:async ({search,page,items_per_page})=>{
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (page) params.append('page', page);
        if (items_per_page) params.append('items_per_page', items_per_page);

        const url = `/posts?${params.toString()}`;
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