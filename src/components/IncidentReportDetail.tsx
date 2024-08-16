/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams} from 'react-router-dom';
import dataApi from './dataApi';

interface Employee {
  id: string;
  employee_number: string;
  name: string;
  department: string;
  email: string;
  gender: string;
  telephone_number: string;
}

interface IncidentReportDetailType {
    id: string;
    location: string;
    time_of_incident:string
    date_of_incident: string;
    statement: string;
    reporter: Employee;
    department: string;
}

const IncidentReportDetail:React.FC = () => {


  const [incidentReportDetail, setIncidentReportDetail] = useState<IncidentReportDetailType | null>(null);
  
  const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }

  useEffect(() => {
    // console.log(params);

    let isMounted = true;

    (async () => {
        const id = params.id ?? "";
        console.log("okojo",id);

        try {
          const reportDetailData = await dataApi.getIncidentReportDetail(id);
        if (isMounted) setIncidentReportDetail(reportDetailData);
        } catch (error) {
          console.error('Failed to fetch task details:' , error)
        }
        
      })();
      return () => {
        isMounted = false;
      }
    console.log(incidentReportDetail);
    
}, [params.id]);


  return (
    <div>
      { incidentReportDetail ?
        <section>
        {/* <button onClick={() => downloadPdfDocument('divToDownload')}>Download Pdf</button> */}
   
    <div className='bg-gray-100 p-2 h-screen' id='divToDownload'>
      <div className="bg-white my-5 h-full flerounded-lg shadow-lg px-8 py-10 max-w-2xl mx-auto">
      <header className="flex mb-3 gap-5 text-center justify-start items-center">
          <FaArrowLeft color="gray" className="text-center text-2xl hover:cursor-pointer hover:bg-orange-100 p-1 hover:rounded-full transform hover:scale-105" onClick={goBack}/>
          <span className="font-mono text-orange-400 text-2xl">Incident Report Detail</span>
          <div className="p-3 flex">
          Date: <span>31-01-24</span>
          </div>
      </header>

      <section className="p-1">
          <div className="flex">
          <div className="p-3 flex-initial w-auto">
              <span className='font-semibold italic '>Reporter Name: </span><p className="border-b-2 border-r-2 bg-slate-50 font-mono py-2 px-1">{incidentReportDetail?.reporter.name}</p>
          </div>
          <div className="p-3 basis-auto flex-initial">
              <span className='font-semibold italic '>Employee ID:</span> <p className="border-b-2 border-r-2 bg-gray-50 font-mono py-2 px-1">{incidentReportDetail?.reporter.employee_number}</p>
          </div>
          <div className="p-3 basis-[30%] flex-initial">
              <span className='font-semibold italic '> Location:</span> <p className="border-b-2  border-r-2 bg-gray-50 font-mono py-2 px-1">{incidentReportDetail?.location}</p>
          </div>
          </div>
          <div className="flex">
          <div className="p-3 basis-auto flex-initial">
              <span className='font-semibold italic '>Time of incident:</span> <p className="border-b-2 border-r-2 bg-gray-50 font-mono py-2 px-1">{incidentReportDetail?.time_of_incident}</p>
          </div>
          
          <div className="p-3 basis-auto flex-initial">
              <span className='font-semibold italic '>Date of Incident:</span> <p className="border-b-2 border-r-2 bg-gray-50 font-mono py-2 px-1">{incidentReportDetail?.date_of_incident}</p>
          </div>
          </div>

          <hr className="mt-5 h-px border-0 bg-orange-200 rounded " />
      </section>

      <section className="p-1">
        <h1>Description</h1>
        <p>
          {incidentReportDetail.statement}
        </p>
      </section>

      </div>
      </div>
      

        </section> : <h1>Loading ....</h1>
      }
    </div>
  )
}

export default IncidentReportDetail