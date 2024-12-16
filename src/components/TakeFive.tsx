import React, { useEffect, useState } from 'react';
import dataApi from './dataApi';
import { useNavigate } from 'react-router-dom';
import TakeFiveTable from './TakeFiveTable';
import { FaSearch } from 'react-icons/fa';
import Pagination from './Pagination';

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
      <Pagination onPageChange={paginate} currentPage={currentPage} hasPrevious={responseExtraInfo.previous} hasNext={responseExtraInfo.next} count={responseExtraInfo.count}/>

    </div>
  );
};

export default TakeFive;
