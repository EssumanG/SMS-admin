import React from 'react'
import {Task}  from './TakeFive'

interface TaskTableProps {
    tasks: Task[];
    onTaskClick: (id: string) => void;
  }

const TakeFiveTable:React.FC<TaskTableProps> = ({tasks, onTaskClick}) => {

  return (
    <div> 
    <div>
   
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      { tasks.length > 0 ? (
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-100 uppercase bg-orange-400 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">TASK NAME</th>
              <th scope="col" className="px-6 py-3 text-center">LOCATION</th>
              <th scope="col" className="px-6 py-3 text-center">DEPARTMENT</th>
              <th scope="col" className="px-6 py-3 text-center">EMPLOYEE_NAME</th>
              <th scope="col" className="px-6 py-3 text-center">SUPERVISOR</th>
              <th scope="col" className="px-6 py-3 text-center">OTHER_WORKERS</th>
              <th scope="col" className="px-6 py-3 text-center">No. OF HAZARDS</th>
              <th scope="col" className="px-6 py-3 text-center">FIT_FOR_TASK</th>
              <th scope="col" className="px-6 py-3 text-center">COMPETENT</th>
              <th scope="col" className="px-6 py-3 text-center">USE_OF_RIGHT_TOOLS</th>
              <th scope="col" className="px-6 py-3 text-center">HAZARD_CONTROLLABLE</th>
              <th scope="col" className="px-6 py-3 text-center">REVIEWED</th>
              <th scope="col" className="px-6 py-3 text-center">PROCEDURE_DISCUSSED</th>
              <th scope="col" className="px-6 py-3 text-center">PROCEDURE_FOLLOWED</th>
              <th scope="col" className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="bg-white border-b hover:bg-gray-50 hover:cursor-pointer"
                onClick={() => onTaskClick(task.id)}
              >
                <td className="px-6 py-4 max-w-xs truncate font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {task.task_name}
                </td>
                <td className="px-6 py-4">{task.location}</td>
                <td className="px-6 py-4">{task.department || 'N/A'}</td>
                <td className="px-6 py-4">{task.created_by_name}</td>
                <td className="px-6 py-4">{task.supervisor_name}</td>
                <td className="px-6 py-4">{task.other_workers_count}</td>
                <td className="px-6 py-4">{task.hazard_control_count}</td>
                <td className="px-6 py-4">{task.question_employee ? 'YES' : 'NO'}</td>
                <td className="px-6 py-4">{task.question_competency ? 'YES' : 'NO'}</td>
                <td className="px-6 py-4">{task.question_tools_and_equp ? 'YES' : 'NO'}</td>
                <td className="px-6 py-4">{task.question_5A ? 'YES' : 'NO'}</td>
                <td className="px-6 py-4">{task.question_5B ? 'YES' : 'NO'}</td>
                <td className="px-6 py-4">{task.question_5C ? 'YES' : 'NO'}</td>
                <td className="px-6 py-4">{task.question_5D ? 'YES' : 'NO'}</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href={`/dashboard/task/${task.id}`}
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

      
      </div>
    </div>
  )
}

export default TakeFiveTable
