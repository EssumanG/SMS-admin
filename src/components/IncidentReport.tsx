import React, { useEffect, useState } from 'react';
import dataApi from './dataApi';

import { useNavigate } from 'react-router-dom';
import IncidentReportTable from './IncidentReportTable';
import { FaSearch } from 'react-icons/fa';
import Pagination from './Pagination';

export interface Report {
  id: string;
  location: string;
  time_of_incident: string;
  date_of_incident: string;
  statement: string;
  reported_by_name: string;
  department: string;
}

const IncidentReport: React.FC = () => {
  const [incidentReports, setIncidentReports] = useState<Report[]>([]);
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

  const getIncidentReportDetail = (id:string) => {
    console.log(id);
    navigate(`/dashboard/incident_report/${id}`);
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

        const IncidentReportData = await dataApi.getIncidentReports(requestOption, token);
        setIncidentReports(IncidentReportData.results);
        setResponseExtraInfo(() => ({
          next: IncidentReportData.next ? true : false,
          previous: IncidentReportData.next ? true : false,
          count: IncidentReportData.count
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
      
      
      <IncidentReportTable incidentReports={incidentReports} onReportClick={getIncidentReportDetail} />
      <Pagination onPageChange={paginate} currentPage={currentPage} hasPrevious={responseExtraInfo.previous} hasNext={responseExtraInfo.next} count={responseExtraInfo.count}/>

    </div>
  );
};

export default IncidentReport;
