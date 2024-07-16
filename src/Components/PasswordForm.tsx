import  { useContext, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Lottie from 'lottie-react';
import Animation from '../animations/Animation-2.json';
import SaveModal from './SaveModal';
import { MyContext } from '../MyProvider';
import { useNavigate } from 'react-router-dom';

const PasswordForm = () => {
  const {token} = useContext(MyContext)
  const navigate = useNavigate()
  const [uppercase,setUppercase] = useState(false)
  const [lowercase,setLowercase] = useState(false)
  const [numbers,setNumbers] = useState(false)
  const [specialCharacters,setSepecial] = useState(false)
  const [password,setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(12); 
  const [isModalOpen,setIsmodal] = useState(false)
  let arr:any = [
    ['upperCase','UPPER CASE ( ABCD.. )',setUppercase],
    ['lowerCase','lower case ( abcd.. )',setLowercase],
    ['number','Number ( 1234... )',setNumbers],
    ['sepcialCaractors','Special Characters ( !@#$%.. )',setSepecial]
  ]
  useEffect(() => {
    gsap.fromTo('.Lottie', { x: '100%' }, { x: '0%', duration: 2, delay: 1 });

    gsap.fromTo('.Form', { x: '-100%',opacity:0 }, { x: '0%',opacity:1, duration: 2, delay: 1 });
  }, []);
  const generatePassword=(e:any)=>{
    e.preventDefault()
    const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerSet = "abcdefghijklmnopqrstuvwxyz";
    const numberSet = "0123456789";
    const specialSet = "!@#$%^&*()_+[]{}|;:,.<>?";

    let characterPool = "";

    if (uppercase) characterPool += upperSet;
    if (lowercase) characterPool += lowerSet;
    if (numbers) characterPool += numberSet;
    if (specialCharacters) characterPool += specialSet;
    if (characterPool.length === 0) {
      alert("Please select at least one character type.");
      return;
    }

    let generatedPassword = "";
    const length = Math.max(6, Math.min(passwordLength, 16)); // Ensure length is between 6 and 16

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    setPassword(generatedPassword);
  }

  const copyToClipboard = (e:any) => {
    e.preventDefault()
   if(password !== ''){
    
    navigator.clipboard.writeText(password)
    .then(() => {
      alert('Password copied to clipboard!');
    })
    .catch(err => {
      alert('Failed to copy password to clipboard.');
      console.log(err);
      
    });
    
   }else{
    alert('Please generate a password')
   }
  };

  const saveToDB=(e:any)=>{
    e.preventDefault()
    if(password){
      if(!token){
        navigate('/login')
      }else{
      setIsmodal(true)
      }
    }else{
      alert('Please generate a password') 
      
    }
  }
  return (
    <div className='flex h-full justify-evenly items-center'>
      <SaveModal  isOpen={isModalOpen} onClose={()=>setIsmodal(false)} password={password} />
      <div className='Lottie z-10'>
        <Lottie animationData={Animation} />
      </div>

  
      <div className='Form shadow-lg shadow-purple-950 text-white border rounded-md flex px-5 border-purple-800'>
        <form action='' className='m-auto py-10'>
          <div className='text-center text-2xl font-bold py-5 text-purple-500'>
            <h1>Generate Your Password</h1>
          </div>
          <div className='flex gap-3 py-3'>
            <input disabled value={password} className='rounded bg-slate-700 focus:outline-none px-2 py-1 text-purple-300' type='text' />
            <button onClick={(e)=>generatePassword(e)} className='bg-purple-900 hover:bg-purple-700 rounded py-1 px-2'>
              Generate
            </button>
            <button onClick={(e)=>copyToClipboard(e)} className='bg-purple-900 hover:bg-purple-700 rounded py-1 px-2'>
              Copy
            </button>
          </div>
          <div>
          <div className='py-3'>
            <label className='text-sm text-purple-400' htmlFor='passwordLength'>
              Password Length (6-16):
            </label>
            <input
              id='passwordLength'
              type='number'
              value={passwordLength}
              onChange={(e) => setPasswordLength(Math.max(6, Math.min(16, parseInt(e.target.value))))}
              className='rounded bg-slate-700 focus:outline-none px-2 py-1 text-purple-300 ml-2'
              min="6"
              max="16"
            />
          </div>
            {arr.map((item:any,index:any)=>(
                <div key={index} className='flex gap-5 py-2'>
                <input onChange={(e)=>item[2](e.target.checked)} className='accent-purple-700 size-4' type='checkbox' name={item[0]} id={item[0]} />
                <label className='text-sm text-purple-400' htmlFor={item[0]}>
                  {item[1]}
                </label>
              </div>
            ))}
          </div>
          <div>
          <button onClick={(e)=>saveToDB(e)} className='bg-purple-900 w-full mt-5 hover:bg-purple-700 rounded py-1 px-2'>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForm;
