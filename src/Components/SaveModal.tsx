import {  useState } from "react";
import AxiosInstance from "../AxiosInstance";

const SaveModal = ({ isOpen, onClose, password }:any) => {
    const [PasswordFor,setPasswordFor] = useState('')
  if (!isOpen) return null;
    const HandleSavePassword =async ()=>{
        try {
            if(!PasswordFor ){
                alert('Please Enter The Password For:')
            }else{
                const response:any =await AxiosInstance.post('/savePassword',{PasswordFor,password})
                console.log(response)
                if(response.data.success){
                    alert(response.data.message)
                }
            }
        } catch (error:any) {
            console.log('======>',error)
            if(error.response.status  === 404||401||500||403){
                alert(error.resoponse.data.message)
            }
        }
    }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Save your Password</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="password">Your password</label>
          <input 
            type="password" 
            name="password" 
            value={password} 
            className="w-full px-3 py-2 border rounded" 
            readOnly 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="passwordFor">Password For:</label>
          <input 
            type="text" 
            name="passwordFor" 
            className="w-full px-3 py-2 border rounded" 
            onChange={(e)=>setPasswordFor(e.target.value)}
          />
        </div>
        <div>
          <button onClick={HandleSavePassword} className='bg-purple-900 w-full mt-5 hover:bg-purple-700 rounded py-1 px-2 text-white'>Save</button>
        </div>
      </div>
    </div>
  );
}

export default SaveModal;
