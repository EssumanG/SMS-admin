import React from 'react'
import  { NearMissType } from './NearMiss';

interface NearMissProps {
    nearMisses: NearMissType[],
    onReportClick: (id: string) => void;
}


const NearMissTable:React.FC<NearMissProps> = ({nearMisses, onReportClick}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        { nearMisses.length > 0 ? (
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-orange-400 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                DESCRIPTION
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                LOCATION
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                DEPARTMENT
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                HAZARD CLASS
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                REPORTER
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                UNSAFE ACT
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                TIME
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                DATE
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {nearMisses.map((report) => (
              <tr
                key={report.id}
                className="bg-white border-b hover:bg-gray-50 hover:cursor-pointer"
                onClick={() => onReportClick(report.id)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {report.near_miss_description}
                </th>
                <td className="px-6 py-4">{report.location}</td>
                <td className="px-6 py-4">{report.department || 'N/A'}</td>
                <td className="px-6 py-4 max-w-xs truncate">{report.hazard_class}</td>
                <td className="px-6 py-4">{report.reported_by_name}</td>
                <td className="px-6 py-4">{report.unsafe_act}</td>
                <td className="px-6 py-4">{report.time}</td>
                <td className="px-6 py-4">{report.date}</td>
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
         ): <div className='p-5 flex justify-center items-center font-mono'> No Available Near Miss Data Yet</div>}
      </div>
  )
}

export default NearMissTable