import { useEffect, useState } from "react"
import AxiosInstance from "../AxiosInstance"
import EmptyPasswords from '../animations/noSavedPasswords.json'
import Lottie from "lottie-react"


const Saved = () => {
  const [savedPassowrds,setSaved] =useState<[any]>()
  useEffect(()=>{
    async function fetchSaved(){
      try {
        const response = await AxiosInstance.get('/getSavePassword')
      if(response.data.success){ 
        setSaved(response.data.savedData)
        console.log(savedPassowrds);
      }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSaved()
  },[])
  return (
    <div className='h-[98dvh] overflow-auto flex gap-5 flex-wrap justify-center items-center'>
      {savedPassowrds && savedPassowrds?.length > 0 ?savedPassowrds?.map((item,index)=>(
        <div key={index} className="text-white border border-purple-700 px-2 py-3 rounded">
        <h1>Name : {item?.PasswordFor}</h1>
        <h1>Password : {item?.password}</h1>
        <h1>Date created : 12/06/2024</h1>
        <button className='bg-purple-900 w-full hover:bg-purple-700 rounded mt-3 py-1 px-2'>
          Copy
        </button>
    </div>
      )):
     <div className="flex justify-center items-center flex-col">
         <Lottie style={{width:200,height:200}} animationData={EmptyPasswords} />
         <h1 className="text-purple-300 font-semibold">Sorry.. You don't have a saved Passowrd...!</h1>
      </div>} 
    </div>
  )
}

export default Saved
