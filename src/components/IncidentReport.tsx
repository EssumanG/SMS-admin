import React, { useEffect, useState } from 'react'
import dataApi from './dataApi';

// import { useNavigate } from 'react-router-dom';
interface Report {
  id:string;
  location:string;
  time_of_incident:string;
  date_of_incident:string;
  statement:string;
  reported_by_name:string;
  department:string;

}

const IncidentReport:React.FC = () => {
  const [incidentReports, setIncidentReports] = useState<Report[]>([]);


  
    // const getTaskDetail = (id:string) => {
    //   console.log(id)
    //   navigate(`/dashboard/task/${id}`)
    // }

  useEffect(() => {
    (async () => {
      const IncidentReportData = await dataApi.getIncidentReports();
      setIncidentReports(IncidentReportData.data);

      console.log("kojo",incidentReports);
      
    })();
  }, []);

  return (

    <div>
      IncidentReport

      <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                REPORTER
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                LOCATION
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                <div className="flex">
                  <span>DEPARTMENT</span>
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                STATEMENT
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                TIME OF INCIDENT
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                DATE OF INCIDENT
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {incidentReports.map((report) => (
              <tr
                key={report.id}
                className="bg-white border-b hover:bg-gray-50  hover:cursor-pointer"
                // onClick={() => getTaskDetail(task.id)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {report.reported_by_name}
                </th>
                <td className="px-6 py-4">{report.location}</td>
                <td className="px-6 py-4">{report.department || 'Laptop'}</td>
                <td className="px-6 py-4">{report.time_of_incident}</td>
                <td className="px-6 py-4">{report.date_of_incident}</td>
                <td className="px-6 py-4">{report.statement}</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href={`/dashboard/incident_report/${report.id}`}
                    className="font-medium text-green-600 border-2 p-1 border-green-500 rounded-md hover:bg-green-500 hover:text-white"
                  >
                    View
                  </a>
                  {/* <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500  ms-3"
                  >
                    Remove
                  </a> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav
        className="flex items-center flex-col flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">1-10</span>{' '}
          of <span className="font-semibold text-gray-900 dark:text-white">1000</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
    

    </div>
  )
}

export default IncidentReport