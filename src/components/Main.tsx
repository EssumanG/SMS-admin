import React from 'react'
import { FaEllipsisV } from 'react-icons/fa';
import { FaRegLifeRing } from 'react-icons/fa6'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Progress } from 'antd';
import PieChartComponent from './PieChartComponent';
import err from '../assets/error.png'


const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
const Main:React.FC = () => {
  return (
    <div className='pt-3 px-3 bg-[#F8F9FC]'>
        <div className='flex items-center justify-between'>
            <h1 className='text-slate-400 text-sm leading-4 font-normal cursor-pointer'>Dashboard</h1>
            <button className='bg-orange-400 h-7 rounded-sm text-white flex items-center justify-center px-4 cursor-pointer'>Generate Report</button>
        </div>
        <div className='grid grid-cols-4 gap-4 mt-3 pb-3'>
            <div className='h-24 rounded-sm bg-white border-l-2 border-orange-500 flex items-center justify-between px-3 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                <div >
                    <h2 className='text-slate-300 text-sm leading-4 font-bold'>INCIDENT REPORT</h2>
                    <h2 className='text-lg leading-4 font-bold text-slate-200 mt-1'>40</h2>
                </div>
                <FaRegLifeRing fontSize={28} color=""/>
            </div>
            <div className='h-24 rounded-sm bg-white border-l-2 border-orange-500 flex items-center justify-between px-3 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                <div >
                    <h2 className='text-slate-300 text-sm leading-4 font-bold'>INCIDENT REPORT</h2>
                    <h2 className='text-lg leading-4 font-bold text-slate-200 mt-1'>40</h2>
                </div>
                <FaRegLifeRing fontSize={28} color=""/>
            </div>
            <div className='h-24 rounded-sm bg-white border-l-2 border-orange-500 flex items-center justify-between px-3 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                <div >
                    <h2 className='text-slate-300 text-sm leading-4 font-bold'>INCIDENT REPORT</h2>
                    <h2 className='text-lg leading-4 font-bold text-slate-200 mt-1'>40</h2>
                </div>
                <FaRegLifeRing fontSize={28} color=""/>
            </div>
            <div className='h-24 rounded-sm bg-white border-l-2 border-orange-500 flex items-center justify-between px-3 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                <div >
                    <h2 className='text-slate-300 text-sm leading-4 font-bold'>INCIDENT REPORT</h2>
                    <h2 className='text-lg leading-4 font-bold text-slate-200 mt-1'>40</h2>
                </div>
                <FaRegLifeRing fontSize={28} color=""/>
            </div>
        </div>

        <div className='flex mt-5 w-full gap-4'>
            <div className='basis-[70%] border bg-white shadow-md cursor-pointer rounded'>
                <div className='bg-[#F8F9FC] flex items-center justify-between py-3 px-2 border-b border-[#EDEDED] mb-3'>
                    <h2>INCIDENT OVERVIEW</h2>
                    <FaEllipsisV color='gray' className='cursor-pointer'/>
                </div>
               <div>
                <ResponsiveContainer width="100%" height={340}>
                        <BarChart
                        width={1150}
                        // height={00}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                        <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                        </BarChart>
                    </ResponsiveContainer>
               </div>
            </div>

            <div className='basis-[30%] border bg-white shadow-md cursor-pointer rounded'>
                <div className='bg-[#F8F9FC] flex items-center justify-between py-3 px-2 border-b border-[#EDEDED] mb-3'>
                    <h2>Revenue</h2>
                    <FaEllipsisV color='gray' className='cursor-pointer'/>
                </div>
                <div>
                    <PieChartComponent/>
                </div>
            </div>

        </div>

        <div className='flex mt-5 w-full gap-5'>
            <div className='basis-[55%] border bg-white shadow-md cursor-pointer rounded'>
                <div className='bg-[#F8F9FC] flex items-center justify-between py-3 px-2 border-b border-[#EDEDED] mb-3'>
                    <h2 className='text-lg text-orange-300 leading-4 font-bold'>Projects Overview</h2>
                    <FaEllipsisV color='gray' className='cursor-pointer'/>
                </div> 
                <div className='px-5 space-y-2 py-2'>
                    <h2>Server Migrations</h2>
                <Progress percent={30} strokeColor='#E74A30'/>
                </div>
                <div className='px-5 space-y-2 py-2'>
                    <h2 className=''>Sale Tracking</h2>
                <Progress percent={50} strokeColor='#F6C23E'/>
                </div>
                <div className='px-5 space-y-2 py-2'>
                    <h2>Customer Database</h2>
                <Progress percent={100} status='active' strokeColor='#4E73DF'/>
                </div>
                <div className='px-5 space-y-2 py-2'>
                    <h2>Payout Details</h2>
                <Progress percent={20} status='active' strokeColor='#36B9CC'/>
                </div>
                <div className='px-5 space-y-2 py-2'>
                    <h2>Account Setup</h2>
                <Progress percent={20} status='exception' strokeColor='#1CC88A'/>
                </div>
            </div>
            <div className='basis-[45%] border bg-white shadow-md cursor-pointer rounded'> 
                <div className='bg-[#F8F9FC] flex items-center justify-between py-3 px-2 border-b border-[#EDEDED] mb-3'>
                    <h2 className='text-lg text-orange-300 leading-4 font-bold'>Resources</h2>
                    <FaEllipsisV color='gray' className='cursor-pointer'/>
                </div>
                <div className='px-5 flex items-center justify-center h-full'>
                    <div >
                        <img src={err} alt="" className='h-40 w-40' />
                        <p className='mt-3 font-semibold text-gray-100'>No data available</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main
