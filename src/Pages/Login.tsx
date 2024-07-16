import { Link, useNavigate } from "react-router-dom"
import AxiosInstance from "../AxiosInstance"
import { useContext, useState } from "react"
import { MyContext } from "../MyProvider"


const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {setToken} = useContext(MyContext)
    const navigate = useNavigate()
    const handleLogin=async(e:any)=>{
        e.preventDefault()
       try {
        if(!email && !password ) return alert('Please fill the inputs')
        const response:any = await AxiosInstance.post('http://localhost:4000/login',{email,password})
        if(response.data.success){          
            localStorage.setItem('token',response.data.token)
            const token:any = response.data.token
            setToken(token)
            navigate('/')
        }
       } catch (error:any) {
            console.log(error);
            if(error.response.status === 403 ||500){
                alert(error.response.data.message)
            }
       }
    }
  return (
    <div className='h-[98dvh] flex justify-center items-center '>
        <div>
            <form className="border rounded-3xl leading-10 shadow-lg shadow-purple-500 border-purple-700 text-white px-8 py-5" action="">
                <h1 className="font-bold text-2xl mb-5"> Login To Generate Password</h1>
                <div className="flex flex-col">
                    <label htmlFor="">Email </label>
                    <input  onChange={(e)=>setEmail(e.target.value)} className="rounded text-black" type="email" name="email"  />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Password</label>
                    <input  onChange={(e)=>setPassword(e.target.value)} className="rounded text-black" type="text" name="password" />
                </div>
                <div>
                     <button onClick={(e)=>handleLogin(e)} className='bg-purple-900 font-semibold w-full mt-5 hover:bg-purple-700 rounded py-1 px-2'>Submit</button>
                </div>
                <div  className='text-center text-purple-300 mt-3'>
                    <Link to={'/signup'}>Create New Account</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
