import React, { useEffect, useState } from 'react';
import dataApi from './dataApi';
import { useNavigate } from 'react-router-dom';
import TakeFiveTable from './TakeFiveTable';
import { FaSearch } from 'react-icons/fa';

export interface Task {
  id: string;
  task_name: string;
  location: string;
  department?: string; // Optional property
  supervisor_name:string;
  created_by_name:string;
  hazard_control_count: number;
  other_workers_count: number;
  question_employee: string;
  question_competency: string;
  question_tools_and_equp: string;
  question_5A: string;
  question_5B: string;
  question_5C: string;
  question_5D: string;
  question_5E: string;
}

const TakeFive: React.FC = () => {
  const [taskInfo, setTaskInfo] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // You can change the number of tasks per page
  // const [totalTasks, setTotalTasks] = useState(0); // Store total number of tasks for pagination
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

  // Function to fetch task data with error handling
  useEffect(() => {
    const fetchData = async () => {
    
    const token = localStorage.getItem("accessToken");


    if (!token) {
      navigate("/login");
      return;
  }
    
      try {
        const isValid = await dataApi.verifyToken(token);

        if (!isValid) {
          navigate("/login");
          return;
      }
        const TakeFiveResponse = await dataApi.getTasks(requestOption, token);


        setTaskInfo(TakeFiveResponse.results);
        setResponseExtraInfo(() => ({
          next: TakeFiveResponse.next ? true : false,
          previous: TakeFiveResponse.next ? true : false,
          count: TakeFiveResponse.count
      }))
        // setTotalTasks(response.data.length); // Set the total tasks based on the data
      } catch (error) {
        console.error('Error fetching task data', error);
        navigate("/login");
      }
    
  }
  fetchData();
  }, [navigate, requestOption]);

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
    <div className='p-10'>

      <div className='flex items-center rounded-[5px] my-2'>
            <input type="text" className='bg-orange-50 h-9 outline-none pl-[13px] w-[350px] rounded-[50x] placeholder:text-[14px] leading-[20px] font-normal' placeholder='Search for...'/>
                <div className='bg-orange-400 h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]'>
                <FaSearch color='white'/>
            </div>
      </div>
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
  );
};

export default TakeFive;
