
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AxiosInstance from '../AxiosInstance'
import { MyContext } from '../MyProvider'

const Signup = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfPassword]=useState('')
    const navigate = useNavigate()
    const {setToken} = useContext(MyContext) 
    const handleSingup=async(e:any)=>{
        e.preventDefault()
        if(!email && !password && !confirmPassword ) return alert('please fill all filds')
       try {

        if(confirmPassword !== password) return alert('Invalid Password')

        const response:any = await AxiosInstance.post('/signup',{email,password,confirmPassword})
        if(response.data.success){
            localStorage.setItem('token',response.data.token)
            const token:any = response.data.token
            setToken(token)
            navigate('/')
        }
       } catch (error:any) {
        console.log(error);
        if(error.response.status === 403 || 500){
            alert(error.response.data.message)
        }
   }
    }
  return (
    <div className='h-[98dvh] flex justify-center items-center '>
        <div>
            <form className="border rounded-3xl leading-10 shadow-lg shadow-purple-500 border-purple-700 text-white px-8 py-5" action="">
                <h1 className="font-bold text-2xl mb-5">Sing up To Genereate Password</h1>
                <div className="flex flex-col">
                    <label htmlFor="">Email </label>
                    <input onChange={(e)=>setEmail(e.target.value)} className="rounded text-black px-2" type="email" name="emial"  />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} className="rounded text-black px-2" type="password" name="password" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Confirm Password</label>
                    <input onChange={(e)=>setConfPassword(e.target.value)} className="rounded text-black px-2" type="password" name="confirm_password" />
                </div>
                <div>
                     <button onClick={(e)=>handleSingup(e)} className='bg-purple-900 w-full mt-5 font-semibold hover:bg-purple-700 rounded py-1 px-2'>Submit</button>
                </div>
                <div className='text-center text-purple-300 mt-3' >
                     <Link to={'/login'}>Already have an account ?</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup
