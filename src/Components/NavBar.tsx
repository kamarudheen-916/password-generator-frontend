import { useContext, useEffect, useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MyContext } from "../MyProvider";
import * as jwt from 'jwt-decode';

const NavBar = () => {
  interface MyTokenPayload extends jwt.JwtPayload {
    // Add any custom claims you have in your token here
    id: string;
    email: string;
  }

  const { token, setToken } = useContext(MyContext);
  const [email, setEmail] = useState<string | null>(null);

  const handleLogOut = () => {
    setToken('');
    localStorage.setItem('token', '');
    setEmail('')
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwt.jwtDecode<MyTokenPayload>(storedToken);
        setEmail(decoded.email);
      } catch (error) {
        console.error('Invalid token:', error);
        setEmail(null);
      }
    }
  }, [token]);

  return (
    <div>
      <div className="border border-purple-500 text-white flex items-center justify-between px-10 py-3 fixed left-1/2 transform -translate-x-1/2 top-5 rounded-md w-[90%] z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-purple-500"><RiLockPasswordFill size={30} /></h1>
          <h1 className="text-2xl text-purple-300">Your ******** Generator</h1>
        </div>
        <div className="flex gap-10 text-purple-300 font-bold text-lg">
          <Link to={'/'}>Generate</Link>
          <Link to={'/saved'}>Saved</Link>
        </div>
        <div className="flex gap-3 items-center">
          <h1 className="text-purple-300 font-semibold">{email}</h1>
          {token && <Link onClick={handleLogOut} to={'/login'}><h1 className="border text-purple-300 border-purple-500 px-2 hover:bg-purple-900 rounded">Log out</h1></Link>}
          {!token && <Link to={'/login'}><h1 className="border text-purple-300 border-purple-500 px-2 hover:bg-purple-900 rounded">Login</h1></Link>}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
