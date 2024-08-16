import React, { useEffect, useState } from 'react';
import dataApi from './dataApi';

import { useNavigate } from 'react-router-dom';

interface Report {
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
  const tasksPerPage = 10; // Number of reports per page
  const navigate = useNavigate();

  const getIncidentReportDetail = (id:string) => {
    console.log(id);
    navigate(`/dashboard/incident_report/${id}`);
  }

  useEffect(() => {
    (async () => {
      const IncidentReportData = await dataApi.getIncidentReports();
      setIncidentReports(IncidentReportData.data);
    })();
  }, []);

  // Calculate total pages
  const totalTasks = incidentReports.length;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  // Get current reports
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentReports = incidentReports.slice(indexOfFirstTask, indexOfLastTask);

  // Function to handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
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
                DEPARTMENT
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
            {currentReports.map((report) => (
              <tr
                key={report.id}
                className="bg-white border-b hover:bg-gray-50 hover:cursor-pointer"
                onClick={() => getIncidentReportDetail(report.id)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {report.reported_by_name}
                </th>
                <td className="px-6 py-4">{report.location}</td>
                <td className="px-6 py-4">{report.department || 'N/A'}</td>
                <td className="px-6 py-4 max-w-xs truncate">{report.statement}</td>
                <td className="px-6 py-4">{report.time_of_incident}</td>
                <td className="px-6 py-4">{report.date_of_incident}</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href={`/dashboard/incident_report/${report.id}`}
                    className="font-medium text-green-600 border-2 p-1 border-green-500 rounded-md hover:bg-green-500 hover:text-white"
                  >
                    View
                  </a>
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
          Showing {indexOfFirstTask + 1} -{' '}
          {Math.min(indexOfLastTask, totalTasks)} of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{totalTasks}</span>
        </span>

        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
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
              disabled={currentPage === totalPages}
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
  );
};

export default IncidentReport;
