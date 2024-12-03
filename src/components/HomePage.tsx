import React from 'react'




const HomePage:React.FC = () => {

    
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='border-2 border-orange-600 p-5'>
            <div className='border-r-2  border-orange-600 p-5'>
                <div className='border-r-2  border-orange-600 p-5'>
                    <a href="/login" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Pink to orange
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage