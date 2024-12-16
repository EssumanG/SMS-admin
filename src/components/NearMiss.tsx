import React,  { useEffect, useState }from 'react'
import dataApi from './dataApi';

import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import NearMissTable from './NearMissTable';
import Pagination from './Pagination';


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
      <Pagination onPageChange={paginate} currentPage={currentPage} hasPrevious={responseExtraInfo.previous} hasNext={responseExtraInfo.next} count={responseExtraInfo.count}/>
    </div>
  )
}

export default NearMiss