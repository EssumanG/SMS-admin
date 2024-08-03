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
  hazard_control_count: number
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
  const navigate = useNavigate()




  const getTaskDetail = (id:string) => {
    console.log(id)
    navigate(`/dashboard/task/${id}`)
  }

  useEffect(() => {
    (async () => {
      const TakeFiveData = await dataApi.getTasks();
      setTaskInfo(TakeFiveData.data);

      console.log("kojo",taskInfo);
      
    })();
  }, []);


  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                TASK NAME
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
                EMPLOYEE NAME
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                SUPERVISOR
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                OTHER WORKERS
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                No. OF HAZARDS
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                FIT FOR TASK
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                COMPETENT
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                USE OF RIGHT TOOLS
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                HAZARD CONTROLLABLE
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                REVIEWED
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                PROCEDURE DISCUSSED
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                PROCEDURE FOLLOWED
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {taskInfo.map((task) => (
              <tr
                key={task.id}
                className="bg-white border-b hover:bg-gray-50  hover:cursor-pointer"
                onClick={() => getTaskDetail(task.id)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {task.task_name}
                </th>
                <td className="px-6 py-4">{task.location}</td>
                <td className="px-6 py-4">{task.department || 'Laptop'}</td>
                <td className="px-6 py-4">{task.created_by_name}</td>
                <td className="px-6 py-4">{task.supervisor_name}</td>
                <td className="px-6 py-4">{task.other_workers_count}</td>
                <td className="px-6 py-4">{task.hazard_control_count}</td>
                <td className="px-6 py-4">{task.question_employee ? "YES" : "NO"}</td>
                <td className="px-6 py-4">{task.question_competency ? "YES" : "NO"}</td>
                <td className="px-6 py-4">{task.question_tools_and_equp ? "YES" : "NO"}</td>
                <td className="px-6 py-4">{task.question_5A ? "YES" : "NO"}</td>
                <td className="px-6 py-4">{task.question_5B ? "YES" : "NO"}</td>
                <td className="px-6 py-4">{task.question_5C ? "YES" : "NO"}</td>
                <td className="px-6 py-4">{task.question_5D ? "YES" : "NO"}</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href={`/dashboard/task/${task.id}`}
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
  );
};

export default TakeFive;
