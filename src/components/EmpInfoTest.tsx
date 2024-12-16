import React, { useEffect, useState } from 'react';
import dataApi from './dataApi';
import { useNavigate, useParams} from 'react-router-dom';
import { Employee } from './EmployeeList';
import { FaSearch } from 'react-icons/fa';
import CurrTabTable from './CurrTabTable';

const EmpInfoTest: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [employeeInfo, setEmployeeInfo] = useState<Employee>()
  const [currentTab, setCurrentTab] = useState<number>(1)
  const navigate = useNavigate();

  const SwitchTab = (tabNumber: number) => {
    setCurrentTab(tabNumber)
  }
  useEffect(() => {
    const id = params.id ?? "";
      console.log("okojo",id);

      const fetchData = async () => {

        const token = localStorage.getItem("accessToken");

        if (!token) {
            navigate("/login");
            return;
        }

      try {

        const isValid = await dataApi.verifyToken(token);
        // setIslogged(isValid);

        if (!isValid) {
            navigate("/login");
            return;
        }
      } catch (error) {
        console.error('Error fetching task data', error);
        navigate("/login");
      }
    


    (async () => {
      

      try {

        const isValid = await dataApi.verifyToken(token);
        // setIslogged(isValid);

        if (!isValid) {
            navigate("/login");
            return;
        }
        const empoloyeeDetail = await dataApi.getEmployeeDetail(id, token);
        setEmployeeInfo(empoloyeeDetail);
        // setTotalTasks(response.data.length); // Set the total tasks based on the data
      } catch (error) {
        console.error('Error fetching task data', error);
      }
    })();

  }


  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, navigate, currentTab]);
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
            className={`inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 px-3 py-2 text-lg font-medium text-gray-800 transition hover:border-gray-300 active:bg-white focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300
              ${
                currentTab === 1
            ? "bg-blue-700  focus:ring-blue-300 active:bg-blue-700"
            : "bg-white  focus:ring-gray-300"
        }`}
            onClick={() => SwitchTab(1)}
          >
            View Take Fives
          </button>
          <button
            type="button"
            className={`inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200  px-3 py-2 text-lg font-medium text-gray-800 transition hover:border-gray-300  focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300
              ${
                currentTab === 2
            ? "bg-blue-700  focus:ring-blue-300 active:bg-blue-700"
            : "bg-white  focus:ring-gray-300"
        }`}
        onClick={() => SwitchTab(2)}
          >
            View Incident Reports
          </button>
          <button
            type="button"
            className={`inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200  px-3 py-2 text-lg font-medium text-gray-800 transition hover:border-gray-300  focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300
              ${
                currentTab === 3
            ? "bg-blue-700  focus:ring-blue-300 active:bg-blue-700"
            : "bg-white  focus:ring-gray-300"
        }`}
        onClick={() => SwitchTab(3)}
          >
            View Near Misses
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
          <CurrTabTable id={params.id ? params.id : ""} currentTab={currentTab}/>
    </div>

       
       
      </div>
    </div>
    </div>
  )
}

export default EmpInfoTest
