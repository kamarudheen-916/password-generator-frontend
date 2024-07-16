import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className="border border-purple-500 fixed left-1/2 transform -translate-x-1/2 bottom-5 w-[90%] rounded-md text-center py-2 text-white font-bold">
    {/* <div>
        <h1>Your Password Generator</h1>
    </div> */}
    <div className="flex justify-center gap-5 text-3xl  text-purple-300  w-full">
      <FaFacebookSquare />
      <FaInstagram />
      <FaSquareXTwitter />
    </div>
    </div>
  )
}

export default Footer
