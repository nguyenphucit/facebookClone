import axiosClient from "./axiosConfig"

const AuthApi={
    Login:async (loginInfo)=>{
        console.log(process.env.REACT_APP_WEBSERVER_URL)
        const url='/auth/login'
        try {
            const response=await axiosClient.post(url,loginInfo) 
            return response
        } catch (error) {
            if(error.response)
            return error.response.data.message  
        }
    },

    Register:async(RegisterInfo)=>{
        const url='/auth/register'
        try {
            const response=await axiosClient.post(url,RegisterInfo) 
            return response
        } catch (error) {
            if(error.response)
            return error.response.data.message  
        }
    }
}
export default AuthApi