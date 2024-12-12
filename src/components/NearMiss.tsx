import React,  { useEffect, useState }from 'react'
import dataApi from './dataApi';

import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import NearMissTable from './NearMissTable';


export interface NearMissType{
  id:string;
  location:string;
  time:string;
  date: string;
  department: string;
  reported_by_name: string;
  unsafe_act: string;
  action_taken: string;
  near_miss_description: string;
  hazard_class: string;
}
const NearMiss:React.FC = () => {

  const [nearMissList, setNearMissList] = useState<NearMissType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalReports, setTotalReport] = useState(0)
  const reportsPerPage = 5; // Number of reports per page
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

  const getNearMissDetail = (id:string) => {
    console.log(id);
    navigate(`/dashboard/near_miss/${id}`);
  }

  useEffect(() => {
    const fetchData = async () => {

      const token = localStorage.getItem("accessToken");

        if (!token) {
            navigate("/login");
            return;
        }
        try { 

          // Verify the token
          const isValid = await dataApi.verifyToken(token);
          // setIslogged(isValid);

          if (!isValid) {
              navigate("/login");
              return;
          }

        const NearMissData = await dataApi.getNearMiss(requestOption, token);
        console.log(NearMiss)
        setNearMissList(NearMissData.results);
        setResponseExtraInfo(() => ({
          next: NearMissData.next ? true : false,
          previous: NearMissData.next ? true : false,
          count: NearMissData.count
    }))

  } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/login");
  }
      // setTotalReport(IncidentReportData.count)
    }

    fetchData();
  }, [requestOption, navigate]);

  // Calculate total pages
  const totalPages = Math.ceil(responseExtraInfo.count / reportsPerPage);

  // Get current reports
  const indexOfLastTask = currentPage * reportsPerPage;
  const indexOfFirstTask = indexOfLastTask - reportsPerPage;
  // const currentReports = incidentReports.slice(indexOfFirstTask, indexOfLastTask);

  // Function to handle page change
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
      
      
      <NearMissTable nearMisses={nearMissList} onReportClick={getNearMissDetail} />
      <nav
        className="flex items-center flex-col flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing {indexOfFirstTask + 1} -{' '}
          {Math.min(indexOfLastTask, responseExtraInfo.count)} of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{responseExtraInfo.count}</span>
        </span>

        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1 && responseExtraInfo.previous === false}
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight ${
                currentPage === 1
                  ? 'text-gray-400 bg-gray-200 border border-gray-300'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Previous
            </button>
          </li>

          {/* Pagination buttons */}
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => paginate(index + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === index + 1
                    ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
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
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                currentPage === totalPages
                  ? 'text-gray-400 bg-gray-200 border border-gray-300'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NearMiss