/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState }  from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams} from 'react-router-dom';
import dataApi from './dataApi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import EmployeeInfo from './EmployeeInfo';




interface Employee {
    id: string;
    employee_number: string;
    name: string;
    department: string;
    email: string;
    gender: string;
    telephone_number: string;
  }
  
  interface Control {
    id: string;
    control_description: string;
  }
  
  interface HazardControl {
    id: string;
    control: Control[];
    hazard_description: string;
  }
  
  interface TaskDetail {
    id: string;
    task_name: string;
    location: string;
    created_by: Employee;
    other_workers: Employee[];
    supervisor: Employee;
    hazard_control_list: HazardControl[];
    question_employee: boolean;
    question_competency: boolean;
    question_tools_and_equip: boolean;
    question_5A: boolean;
    question_5B: boolean;
    question_5C: boolean;
    question_5D: boolean;
    question_5E: boolean;
  }



const TaskDetail: React.FC = () => {
  const [taskDetail, setTaskDetail] = useState<TaskDetail | null>(null);
  // const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  // const [employeInfo, setEmployeInfo] = useState<Employee>();

    const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }


    const downloadPdfDocument = (rootElementId:string) => {
      const input = document.getElementById(rootElementId);
      if (!input) {
        console.error(`Element with ID ${rootElementId} not found.`);
        return;
    }

    
    html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('/image/png');
      const pdf = new jsPDF();
      
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        pdf.save('download.pdf')
      })
    }


    const getEmployeeDetail = (id:string) =>{
      // setEmployeInfo(member)
      // setIsEmployeeModalOpen(true)
      navigate(`/dashboard/employee/${id}`);
    } 

    useEffect(() => {
        // console.log(params);

        let isMounted = true;

        const fetchData = async () => {


          const token = localStorage.getItem("accessToken");

          if (!token) {
              navigate("/login");
              return;
          }

            const id = params.id ?? "";
            console.log("okojo",id);

            try {
              const isValid = await dataApi.verifyToken(token);
            // setIslogged(isValid);
              if (!isValid) {
                  navigate("/login");
                  return;
              }
              const TakeFiveData = await dataApi.getTaskDetail(id, token);
            if (isMounted) setTaskDetail(TakeFiveData);
            } catch (error) {
              console.error('Failed to fetch task details:' , error)
            }
            
          
          return () => {
            isMounted = false;
          }
        console.log(taskDetail);
        };

        fetchData();
        
    }, [params.id]);

  return (
    <div>
      { taskDetail ? 
      
      <>
      <button onClick={() => downloadPdfDocument('divToDownload')}>Download Pdf</button>
   
    <div className='bg-gray-100 p-2' id='divToDownload'>
        <div className="bg-white my-5 flerounded-lg shadow-lg px-10 py-10  mx-32 h-screen">
        <header className="flex mb-3 gap-5 text-center justify-start items-center">
            <FaArrowLeft color="gray" className="text-center text-2xl hover:cursor-pointer hover:bg-orange-100 p-1 hover:rounded-full transform hover:scale-105" onClick={goBack}/>
            <span className="font-mono text-orange-400 text-2xl">Task Detail</span>
            <div className="p-3 flex">
            Date: <span>31-01-24</span>
            </div>
        </header>

        <section className="p-1">
            <div className="flex">
            <div className="p-3 flex-initial w-auto">
                <span className='font-semibold italic '>Task Description: </span><p className="border-b-2 border-r-2 bg-slate-50 font-mono py-2 px-1">{taskDetail?.task_name}</p>
            </div>
            <div className="p-3 basis-[30%] flex-initial">
                <span className='font-semibold italic '> Location:</span> <p className="border-b-2  border-r-2 bg-gray-50 font-mono py-2 px-1">{taskDetail?.location}</p>
            </div>
            <div className="p-3 basis-[30%] flex-initial">
                <span className='font-semibold italic '> Supervisor:</span> <p className="border-b-2  border-r-2 bg-gray-50 font-mono py-2 px-1">{taskDetail?.supervisor.name}</p>
            </div>
            </div>
            <div className="flex">
            <div className="p-3 basis-auto flex-initial">
                <span className='font-semibold italic '>Name of Employee:</span> <p className="border-b-2 border-r-2 bg-gray-50 font-mono py-2 px-1">{taskDetail?.created_by.name}</p>
            </div>
            <div className="p-3 basis-auto flex-initial">
               <span className='font-semibold italic '>Employee ID:</span> <p className="border-b-2 border-r-2 bg-gray-50 font-mono py-2 px-1">{taskDetail?.created_by.employee_number}</p>
            </div>
            <div className="p-3 basis-auto flex-initial">
                <span className='font-semibold italic '>Department:</span> <p className="border-b-2 border-r-2 bg-gray-50 font-mono py-2 px-1">{taskDetail?.created_by.department}</p>
            </div>
            </div>

            <hr className="mt-5 h-px border-0 bg-orange-200 rounded " />
        </section>

        <section className="p-1">
            <div>
                <div className="p-3 basis-[30%] flex-initial">
                    <span className='text-green-600'>1. Employee</span>
                    <p className="">Am I fit for the task today? - <span>{taskDetail?.question_employee ? "YES" : "NO"}</span></p> -
                </div>

                <div className="p-3 basis-[30%] flex-initial">
                    <span className='text-green-600'>2. Competency</span>
                    <p className="">Am I trained, compentent and authorized to do this task? - <span>{taskDetail?.question_competency ? "YES" : "NO"}</span></p>
                </div>

                <div className="p-3 basis-[30%] flex-initial">
                    <span className='text-green-600'>3. Tools and Equpment</span>
                    
                    <div>
                        <p className="">Do I have the right tools for the task? - <span>{taskDetail?.question_tools_and_equip ? "YES" : "NO"}</span> </p>
                    </div>
                    <div>
                        <p className="">Are my tools in good conditiion? - <span>{taskDetail?.question_tools_and_equip ? "YES" : "NO"}</span></p>
                    </div>
                </div>
            </div>
            <hr className="mt-5 h-px bg-orange-200 border-0 rounded shadow-lg shadow-orange-600" />
        </section>

        <section className='mt-5'>
            <table className="table-auto min-w-full border border-neutral-200border border-neutral-200 text-sm font-light text-surface">
                <thead className='border-2 border-neutral-200 bg-[#4eaa29] font-medium text-white'>
                    <tr>
                    <th>Hazards</th>
                    <th>Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {taskDetail?.hazard_control_list.map((hazard)=>(
                      <tr key={hazard.id} className='border-b border-neutral-200'>
                      <td scope="col"  className='px-6 py-4 border-e'>{hazard.hazard_description
                        }</td>
                      <td scope="col"  className='px-6 py-4 border-e'>
                              <ul>
                                  {hazard.control.map((cntrl)=>(
                                    <li key={cntrl.id}> - {cntrl.control_description}</li>
                                  ))}
                              </ul>
                          </td>
                      </tr>
                    ))}
                    <tr className='border-b border-neutral-200'>
                    <td scope="col"  className='px-6 py-4 border-e'>The Sliding Mr. Bones </td>
                    <td scope="col"  className='px-6 py-4 border-e'>
                            <ul>
                                <li>Wear Glooves</li>
                                <li>Wear Glooves</li>
                            </ul>
                        </td>
                    </tr>
                    <tr className='border-b border-neutral-200'>
                    <td scope="col"  className='px-6 py-4 border-e'>Witchy Woman</td>
                    <td scope="col"  className='px-6 py-4 border-e'>
                            <ul>
                                <li>Wear Glooves</li>
                                <li>Wear Glooves</li>
                            </ul>
                        </td>
                    </tr>
                    <tr className='border-b border-neutral-200'>
                        <td scope="col"  className='px-6 py-4 border-e'>Shining Star</td>
                        <td scope="col"  className='px-6 py-4 border-e'>
                            <ul>
                                <li>Wear Glooves</li>
                                <li>Wear Glooves</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section className='m-5'>

        <table className=" table-auto w-[50%] mx-auto text-sm text-center ">
          <thead className="text-xs uppercase bg-[#4eaa29] text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                TAKe 5  Members
              </th>
              {/* <th scope="col" className="px-6 py-3 text-center">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
              {taskDetail?.other_workers.map((member)=>(
                <tr 
                key={member.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                onClick={() => getEmployeeDetail(member.id)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {member.name}
                </th>
                  
              </tr>

              ))}         
          </tbody>
        </table>
        </section>
        {/* { isEmployeeModalOpen && employeInfo && (
          <EmployeeInfo
          isOpen={isEmployeeModalOpen}
          employeeInfo={employeInfo}
          onRequestClose={() => setIsEmployeeModalOpen(false)}/> )} */}
        </div>
        </div>

        </>: <h1>Loading ....</h1>}
    </div>
  );
};

export default TaskDetail;
