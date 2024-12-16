import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegSun, FaTachometerAlt, FaChevronRight, FaWrench, FaDoorOpen } from 'react-icons/fa'
import { FaNoteSticky } from 'react-icons/fa6'





const Sidebar:React.FC = () => {
    const navigate = useNavigate()
    
    const logOut = () => {
        localStorage.removeItem("accessToken")
        navigate("/login")
    }
  return (
    <div className='bg-orange-400 h-screen px-4'>
        <div className='ps-4 py-5 flex items-center justify-center border-b border-slate-200'>
            <h1 className='text-white text-lg leading-4 font-extrabold cursor-pointer'>Admin Panel</h1>
        </div>
        <Link to={"/dashboard"}>
            <div className='flex items-center gap-2 py-4 border-b border-slate-200'>
                <FaTachometerAlt color='white'/>
                <p className='text-sm leading-3 font-bold text-white'>Dashboard</p>
            </div>
        </Link>

       
        <div className='pt-[15px] border-b-[1px] border-slate-200'>
            <p className='text-sm font-extrabold leading-[-16] text-white/[0.4]'>INTERFACE</p>
            <Link to={"/dashboard/take_fives"}>
                <div className='flex items-center justify-between gap-2 py-4 cursor-pointer'>
                    <div className='flex items-center gap-2'>
                        <FaRegSun color='white'/>
                        <p className='text-sm leading-4 font-normal text-white'>Take Fives</p>
                    </div>
                    <FaChevronRight color='white'/>
                </div>
            </Link>
     

            <Link to={"/dashboard/incident_reports"}>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <FaWrench color='white'/>
                        <p className='text-[14px] leading-[20px] font-normal text-white'>Incidents</p>
                    </div>
                    <FaChevronRight color='white'/>
                </div>
            </Link>

            <Link to={'/dashboard/near_miss'}>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <FaWrench color='white'/>
                        <p className='text-[14px] leading-[20px] font-normal text-white'>Near Misses</p>
                    </div>
                    <FaChevronRight color='white'/>
                </div>
            </Link>

            <Link to={'/dashboard/employees'}>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <FaWrench color='white'/>
                        <p className='text-[14px] leading-[20px] font-normal text-white'>Employees</p>
                    </div>
                    <FaChevronRight color='white'/>
                </div>
            </Link>
        </div>

        <div className='pt-[15px] border-b-[1px] border-slate-200'>
            <p className='text-[10px] font-extrabold leading-[-16] text-white/[0.4]'>ADDONS</p>
            <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                <div className='flex items-center gap-[10px]'>
                    <FaNoteSticky color='white'/>
                    <p className='text-[14px] leading-[20px] font-normal text-white'>Pages</p>
                </div>
                <FaChevronRight color='white'/>
            </div>

            <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer' onClick={logOut}>
                <div className='flex items-center gap-[10px]'>
                <FaDoorOpen color='white'/>
                    <p className='text-[14px] leading-[20px] font-normal text-white'>Log Out</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Sidebar