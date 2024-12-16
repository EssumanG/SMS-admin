import React, { useEffect, useState } from 'react';
import dataApi from './dataApi';
import { useNavigate } from 'react-router-dom';

export interface Employee {
  id: string;
  employee_number: string;
  name: string;
  department: string;
  email: string;
  gender: string;
  telephone_number: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;
  const [requestOption, setRequestOption] = useState({
    page: 1,
    search: '',
  });
  const [responseExtraInfo, setResponseExtraInfo] = useState({
    count: 0,
    next: false,
    previous: false,
  });

  const navigate = useNavigate();

  const getEmployeeDetail = (id: string) => {
    navigate(`/dashboard/employee/${id}`);
    // navigate('/dashboard/empInfoTeast')
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const listOfEmployees = await dataApi.getEmployees(requestOption);
        setEmployees(listOfEmployees.results);
        setResponseExtraInfo({
          count: listOfEmployees.count,
          next: !!listOfEmployees.next,
          previous: !!listOfEmployees.previous,
        });
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchEmployees();
  }, [requestOption]);

  const totalPages = Math.ceil(responseExtraInfo.count / employeesPerPage);
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    setRequestOption((prevInfo) => ({
      ...prevInfo,
      page: pageNumber,
    }));
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">EMPLOYEE NAME</th>
              <th scope="col" className="px-6 py-3 text-center">DEPARTMENT</th>
              <th scope="col" className="px-6 py-3 text-center">EMPLOYEE NUMBER</th>
              <th scope="col" className="px-6 py-3 text-center">GENDER</th>
              <th scope="col" className="px-6 py-3 text-center">EMAIL</th>
              <th scope="col" className="px-6 py-3 text-center">TELEPHONE NUMBER</th>
              <th scope="col" className="px-6 py-3 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="bg-white border-b hover:bg-gray-50 hover:cursor-pointer"
                onClick={() => getEmployeeDetail(employee.id)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {employee.name}
                </th>
                <td className="px-6 py-4">{employee.department}</td>
                <td className="px-6 py-4">{employee.employee_number || 'N/A'}</td>
                <td className="px-6 py-4">{employee.gender}</td>
                <td className="px-6 py-4">{employee.email}</td>
                <td className="px-6 py-4">{employee.telephone_number}</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href={`/dashboard/employee/${employee.id}`}
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
          Showing {indexOfFirstEmployee + 1} - {Math.min(indexOfLastEmployee, responseExtraInfo.count)} of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{responseExtraInfo.count}</span>
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

export default EmployeeList;
