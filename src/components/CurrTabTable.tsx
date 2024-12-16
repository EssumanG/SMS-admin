import TakeFiveTable from './TakeFiveTable'
import React, { useEffect, useState } from 'react';
import {Task}  from './TakeFive'
import dataApi from './dataApi';
import IncidentReportTable from './IncidentReportTable';
import NearMissTable from './NearMissTable';
import { NearMissType } from './NearMiss';
import { Report } from './IncidentReport'
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

interface currTabTableProps {
  id: string;
  currentTab: number
}

const CurrTabTable: React.FC<currTabTableProps> = ({id, currentTab}) => {

  const [incidentInfo, setIncidentInfo] = useState<Report[]>([]);
  const [nearMissInfo, setNearMissInfo] = useState<NearMissType[]>([]);
  const [taskInfo, setTaskInfo] = useState<Task[] >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [responseExtraInfo, setResponseExtraInfo] = useState({
      count: 0,
      next: false,
      previous: false
    })
    const [requestOption, setRequestOption] = useState({
      page: 1,
      search: '',
    })
  
  const getTaskDetail = (id: string) => {
    if(currentTab ===  1){
      navigate(`/dashboard/task/${id}`);
    }
    else if(currentTab ===  2){
      navigate(`/dashboard/incident_report/${id}`);
    }
    else {
      navigate(`/dashboard/near_miss/${id}`);
    }
    
  };
  
  useEffect(() => {
      const fetchData = async () => {
  
        const token = localStorage.getItem("accessToken");
  
        if (!token) {
            navigate("/login");
            return;
        }
  
      try {
        if (currentTab==1){
          const TakeFiveResponse = await dataApi.getEmployeeTaskById(id, requestOption, token);
          setTaskInfo(TakeFiveResponse.results);
  
          setResponseExtraInfo(() => ({
            next: TakeFiveResponse.next ? true : false,
            previous: TakeFiveResponse.next ? true : false,
            count: TakeFiveResponse.count
          }))
        }
        else if(currentTab==2){
          const IncidentReportResponse = await dataApi.getEmployeeIncidentReportById(id, requestOption, token);
          setIncidentInfo(IncidentReportResponse.results);
  
          setResponseExtraInfo(() => ({
            next: IncidentReportResponse.next ? true : false,
            previous: IncidentReportResponse.next ? true : false,
            count: IncidentReportResponse.count
          }))
        }
        else {
          const NearMissResponse = await dataApi.getEmployeeNearMissById(id, requestOption, token);
          setNearMissInfo(NearMissResponse.results);
  
          setResponseExtraInfo(() => ({
            next: NearMissResponse.next ? true : false,
            previous: NearMissResponse.next ? true : false,
            count: NearMissResponse.count
          }))
        }
        // setTotalTasks(response.data.length); // Set the total tasks based on the data
      } catch (error) {
        console.error('Error fetching task data', error);
        navigate("/login");
      }
  }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestOption, currentTab, currentPage]);
  
    // Handle pagination click
    const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      setRequestOption((prevInfo) => ({
        ...prevInfo,
        page: pageNumber
      }))
    };
  
    if (currentTab === 1){
      return (
        <div>
            <TakeFiveTable tasks={taskInfo} onTaskClick={getTaskDetail} />
            <Pagination onPageChange={paginate} currentPage={currentPage} hasPrevious={responseExtraInfo.previous} hasNext={responseExtraInfo.next} count={responseExtraInfo.count}/>

        </div>

      )
    }
    if (currentTab === 2){
      return (
        <div>
            <IncidentReportTable incidentReports={incidentInfo} onReportClick={getTaskDetail} />
            <Pagination onPageChange={paginate} currentPage={currentPage} hasPrevious={responseExtraInfo.previous} hasNext={responseExtraInfo.next} count={responseExtraInfo.count}/>

        </div>
      ) 
    }
    else{
      return (
        <div>
            <NearMissTable nearMisses={nearMissInfo}  onReportClick={getTaskDetail} />
            <Pagination onPageChange={paginate} currentPage={currentPage} hasPrevious={responseExtraInfo.previous} hasNext={responseExtraInfo.next} count={responseExtraInfo.count}/>
        </div>
      )
    }
    
  
  }

  export default CurrTabTable