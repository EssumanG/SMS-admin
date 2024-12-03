import React from 'react'
import {Report} from './IncidentReport';

interface IncidentReportProps {
    incidentReports: Report[],
    onReportClick: (id: string) => void;
}

const IncidentReportTable:React.FC<IncidentReportProps> = ({incidentReports, onReportClick}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        { incidentReports.length > 0 ? (
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-orange-400 dark:bg-gray-700 dark:text-gray-400">
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
            {incidentReports.map((report) => (
              <tr
                key={report.id}
                className="bg-white border-b hover:bg-gray-50 hover:cursor-pointer"
                onClick={() => onReportClick(report.id)}
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
         ): <div className='p-5 flex justify-center items-center font-mono'> No Available Task Data Yet</div>}
      </div>
  )
}

export default IncidentReportTable
