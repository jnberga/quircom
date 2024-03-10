import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import minCD from '../assets/controllerCD.png';
import logoCD from '../assets/clientNav.png';
import logoHead from '../assets/clientHead.png';


const CNav = () => {
  const [controller, setcontroller] = useState(false)
  const Menus = [
    { title:'Profile', src:"user", to:"/client/profile"},
    { title:'Dashbord', src:"dboard", gap: true, to:"/client/dashboard"},
    { title:'Browse Service', src:"service", to:"/client/browse-service"},
    { title:'Tracker', src:"tracker", to:"/client/tracker"},
    { title:'Settings', src:"settings", gap: true, to:"/client/settings"}
  ]

  return (
    <div className='flex flex-col'>
      <div class={`${controller ? 'w-72': 'w-20'} h-screen p-3 pt-5 bg-orange-600 relative`}>
        <img className={`hidden md:flex absolute p-[5px] bg-[#1D5B79] cursor-pointer -right-3 top-10 h-6 w-6 border-2 border-orange-600 rounded-full ${!controller && 'rotate-180'}`} 
        src={minCD}
        onClick={()=> setcontroller(!controller)}
        />
        <div className='flex gap-x-4 p-2 items-center'>
          <img src={logoCD} className={`w-[40px] cursor-pointer duration-500 ${controller && 'rotate-[360deg]'}`}/>
          <img src= {logoHead} className={`${!controller && 'scale-0'} h-[70px] ml-[-15px] duration-300`}/> 
        </div>
        <ul className='my-10 py-2 rounded-xl bg-[#F5F5DC] '>
        <Link to="/client/profile">
            <li className={`text-[#163646] p-4 my-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-100 rounded-md mt-2`}>
              <img src='./src/assets/user.png' className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Profile</span>
            </li>
          </Link>

          <Link to="/client/dashboard">
            <li className={`text-[#163646] p-4 my-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-100 rounded-md mt-12`}>
              <img src='./src/assets/dboard.png' className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Dashboard</span>
            </li>
          </Link>

          <Link to="/client/browse-service">
            <li className={`text-[#163646] p-4 my-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-100 rounded-md mt-2`}>
              <img src='./src/assets/service.png' className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Browse Service</span>
            </li>
          </Link>

          <Link to="/client/tracker">
            <li className={`text-[#163646] p-4 my-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-100 rounded-md mt-2`}>
              <img src='./src/assets/tracker.png' className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Tracker</span>
            </li>
          </Link>

          <Link to="/client/settings">
            <li className={`text-[#163646] p-4 my-4 font-medium flex items-center gap-x-4 cursor-pointer hover:bg-blue-100 rounded-md mt-12`}>
              <img src='./src/assets/settings.png' className='h-6 w-6' />
              <span className={`${!controller && 'hidden'} origin-left duration-200`}>Settings</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default CNav