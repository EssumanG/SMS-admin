import React from 'react'
import { FaRegBell, /*FaSearch*/ FaEnvelope } from 'react-icons/fa';

const Dashboardview:React.FC = () => {
  return (
    <div className='flex items-center justify-between h-[70px] shadow-lg px-[25px]'>
        <div className='flex items-center rounded-[5px]'>
            {/* <input type="text" className='bg-orange-50 h-9 outline-none pl-[13px] w-[350px] rounded-[50x] placeholder:text-[14px] leading-[20px] font-normal' placeholder='Search for...'/>
                <div className='bg-orange-400 h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]'>
                <FaSearch color='white'/>
             </div> */}
        </div>
        <div className='flex items-center ga[-15px] relative'>
            <div className='flex items-center gap-[25px] border-r-[1px] pr-[25px]'>
                <FaRegBell/>
                <FaEnvelope/>
            </div>
            <div className='flex items-center gap-[15px] relative'>
                <p>Kanye West</p>
                <div className='h-[50px] w-[50px] rounded-full cursor-pointer flex items-center justify-center relative'>
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboardview
