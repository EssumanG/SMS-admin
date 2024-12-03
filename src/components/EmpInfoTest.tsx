import TakeFiveTable from './TakeFiveTable'
import React, { useEffect, useState } from 'react';
import {Task}  from './TakeFive'
import dataApi from './dataApi';
import { useNavigate, useParams} from 'react-router-dom';
import { Employee } from './EmployeeList';
import { FaSearch } from 'react-icons/fa';


const EmpInfoTest: React.FC = () => {
  const [taskInfo, setTaskInfo] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const params = useParams<{ id: string }>();
  const [employeeInfo, setEmployeeInfo] = useState<Employee>()

  const [responseExtraInfo, setResponseExtraInfo] = useState({
    count: 0,
    next: false,
    previous: false
  })
  const [requestOption, setRequestOption] = useState({
    page: 1,
    search: '',
  })
  const navigate = useNavigate();


  useEffect(() => {
    const id = params.id ?? "";
      console.log("okojo",id);
    (async () => {

      try {
        const TakeFiveResponse = await dataApi.getEmployeeTaskById(id, requestOption);
        setTaskInfo(TakeFiveResponse.results);
        setResponseExtraInfo(() => ({
          next: TakeFiveResponse.next ? true : false,
          previous: TakeFiveResponse.next ? true : false,
          count: TakeFiveResponse.count
      }))
        // setTotalTasks(response.data.length); // Set the total tasks based on the data
      } catch (error) {
        console.error('Error fetching task data', error);
      }
    })();


    (async () => {
      

      try {
        const empoloyeeDetail = await dataApi.getEmployeeDetail(id);
        setEmployeeInfo(empoloyeeDetail);
        // setTotalTasks(response.data.length); // Set the total tasks based on the data
      } catch (error) {
        console.error('Error fetching task data', error);
      }
    })();
  }, [requestOption, params.id]);


  const getTaskDetail = (id: string) => {
    console.log(id);
    navigate(`/dashboard/task/${id}`);
  };

  // Calculate pagination indices

  const totalPages = Math.ceil(responseExtraInfo.count / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  // const currentTasks = taskInfo.slice(indexOfFirstTask, indexOfLastTask);

  // Handle pagination click
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setRequestOption((prevInfo) => ({
      ...prevInfo,
      page: pageNumber
    }))
  };

  return (
    <div>
      <div className="bg-slate-100 md:mx-auto rounded shadow-xl w-full  overflow-hidden p-10 lg:px-32">
      <div className="h-[190px] bg-gradient-to-r rounded-t-xl from-orange-300 to-orange-500"></div>
      <div className="px-5 py-2 flex flex-col gap-3 pb-6 bg-white ">
      <div className='flex gap-2'>
      <div className='basic-[50%] w-full ms-10'>
        <div className="h-[180px] lg:h-[250px] shadow-md w-[150px] lg:w-[220px] rounded-full border-4 overflow-hidden -mt-14 border-white">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            className="w-full h-full rounded-full object-center object-cover"
            alt="Profile"
          />
        </div>
        
          <div >
            <div className='py-2'>
            <h3 className="text-2xl lg:text-4xl text-slate-900 relative font-bold leading-6">
              <span> {employeeInfo?.name} -</span> <span className='text-2xl lg:text-4xl text-slate-400 font-semibold leading-6'>{employeeInfo?.employee_number}</span>
            </h3> 
            </div>
            <p className="text-2xl text-gray-600 font-mono">{employeeInfo?.email}</p>
          </div>
          <div className="flex gap-3 flex-row my-5">
            <span className="rounded-sm bg-yellow-100 px-3 py-1 text-lg font-medium text-yellow-800">
              {employeeInfo?.department}
            </span>
            {/* <span className="rounded-sm bg-green-100 px-3 py-1 text-lg font-medium text-green-800">
              Mine Manager
            </span> */}
            
          </div>
          </div>
          <div className='hidden 2xl:flex text-center  items-center justify-center border w-full'> 
            <h3>
              This should display of employee tasks activities
            </h3>
          </div>
        </div>
        <hr className="mt-5 h-px bg-orange-200 border-0 rounded shadow-lg shadow-orange-600" />
        <div>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-white px-3 py-2 text-lg font-medium text-gray-800 transition hover:border-gray-300 active:bg-white hover:bg-gray-100 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            View Incident Report
          </button>
          <button
            type="button"
            className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-blue-700 px-3 py-2 text-lg font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 active:bg-blue-700 focus:blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            View Take Fives
          </button>
        </div>
        <h4 className="text-md font-medium leading-3">About</h4>
       

        <div className='flex float-right items-center rounded-[5px]'>
         <input type="text" className='bg-orange-50 h-9 outline-none pl-[13px] w-[350px] rounded-[50x] placeholder:text-[14px] leading-[20px] font-normal' placeholder='Search for...'/>
                <div className='bg-orange-400 h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]'>
                <FaSearch color='white'/>
             </div>
          </div>
          </div>
        <div>
        <TakeFiveTable tasks={taskInfo} onTaskClick={getTaskDetail} />

      {/* Pagination Component */}
      <nav className="flex items-center flex-col flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing <span className="font-semibold text-gray-900 dark:text-white">
            {indexOfFirstTask + 1}-{' '}{Math.min(indexOfLastTask,indexOfLastTask)}
          </span> of <span className="font-semibold text-gray-900 dark:text-white">{responseExtraInfo.count}</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1 && responseExtraInfo.previous === false}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          {/* Example: Simple pagination with 5 pages */}
          {[...Array(Math.ceil(totalPages))].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => paginate(index + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === index + 1
                    ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages && responseExtraInfo.next === false}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>

       
       
      </div>
    </div>
    </div>
  )
}

export default EmpInfoTest