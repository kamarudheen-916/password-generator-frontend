import axios from "axios"
 const AxiosInstance = axios.create({
    // baseURL:import.meta.env.AxiosBaseUrl,
    baseURL:'http://localhost:4000'
,    timeout:10000,
    headers:{
        "Content-Type":'application/json'
    }
})

AxiosInstance.interceptors.request.use((config)=>{
    const AuthToken = localStorage.getItem('token')
    if(AuthToken){
        config.headers.Authorization = `Bearer ${AuthToken}`
    }
    return config
},
(error)=>{
        return Promise.reject(error)
}
)

export default AxiosInstance