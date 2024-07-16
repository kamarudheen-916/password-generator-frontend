import Footer from "./Components/Footer"
import NavBar from "./Components/NavBar"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Saved from "./Pages/Saved"
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Signup from "./Pages/Signup"
import { useContext } from "react"
import { MyContext } from "./MyProvider"


const App = () => {
  const {token} = useContext(MyContext) || localStorage.getItem('token')
  return (
      <BrowserRouter>
      <NavBar/> 
        <Routes>
            <Route path="/login" element={!token ? <Login /> : <Navigate to={'/'} />}/>
            <Route path="/signup" element={!token ?<Signup /> : <Navigate to={'/'} />}/>
            <Route path="/" element={ <Home />}/>
            <Route path="/saved" element={token? <Saved /> : <Navigate to={'/login'}/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
  )
}

export default App
