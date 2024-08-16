import React, { useEffect, useState } from 'react';
import dataApi from './dataApi';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  task_name: string;
  location: string;
  department?: string; // Optional property
  supervisor_name:string;
  created_by_name:string;
  hazard_control_count: number;
  other_workers_count: number;
  question_employee: string;
  question_competency: string;
  question_tools_and_equp: string;
  question_5A: string;
  question_5B: string;
  question_5C: string;
  question_5D: string;
  question_5E: string;
}

const TakeFive: React.FC = () => {
  const [taskInfo, setTaskInfo] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10); // You can change the number of tasks per page
  const [totalTasks, setTotalTasks] = useState(0); // Store total number of tasks for pagination
  const navigate = useNavigate();

  // Function to fetch task data with error handling
  useEffect(() => {
    (async () => {
      try {
        const response = await dataApi.getTasks();
        setTaskInfo(response.data);
        setTotalTasks(response.data.length); // Set the total tasks based on the data
      } catch (error) {
        console.error('Error fetching task data', error);
      }
    })();
  }, []);

  const getTaskDetail = (id: string) => {
    console.log(id);
    navigate(`/dashboard/task/${id}`);
  };

  // Calculate pagination indices
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = taskInfo.slice(indexOfFirstTask, indexOfLastTask);

  // Handle pagination click
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">TASK NAME</th>
              <th scope="col" className="px-6 py-3 text-center">LOCATION</th>
              <th scope="col" className="px-6 py-3 text-center">DEPARTMENT</th>
              <th scope="col" className="px-6 py-3 text-center">EMPLOYEE NAME</th>
              <th scope="col" className="px-6 py-3 text-center">SUPERVISOR</th>
              <th scope="col" className="px-6 py-3 text-center">OTHER WORKERS</th>
              <th scope="col" className="px-6 py-3 text-center">No. OF HAZARDS</th>
              <th scope="col" className="px-6 py-3 text-center">FIT FOR TASK</th>
              <th scope="col" className="px-6 py-3 text-center">COMPETENT</th>
              <th scope="col" className="px-6 py-3 text-center">USE OF RIGHT TOOLS</th>
              <th scope="col" className="px-6 py-3 text-center">HAZARD CONTROLLABLE</th>
              <th scope="col" className="px-6 py-3 text-center">REVIEWED</th>
              <th scope="col" className="px-6 py-3 text-center">PROCEDURE DISCUSSED</th>
              <th scope="col" className="px-6 py-3 text-center">PROCEDURE FOLLOWED</th>
              <th scope="col" className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr
                key={task.id}
                className="bg-white border-b hover:bg-gray-50 hover:cursor-pointer"
                onClick={() => getTaskDetail(task.id)}
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
      </div>

      {/* Pagination Component */}
      <nav className="flex items-center flex-col flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing <span className="font-semibold text-gray-900 dark:text-white">
            {indexOfFirstTask + 1}-{indexOfLastTask > totalTasks ? totalTasks : indexOfLastTask}
          </span> of <span className="font-semibold text-gray-900 dark:text-white">{totalTasks}</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          {/* Example: Simple pagination with 5 pages */}
          {[...Array(Math.ceil(totalTasks / tasksPerPage))].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => paginate(index + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === index + 1
                    ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastTask >= totalTasks}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TakeFive;
