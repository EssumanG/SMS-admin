import React from 'react'

interface PaginationProps {
    onPageChange : (currPage: number) => void;
    hasPrevious: boolean;
    hasNext: boolean;
    currentPage: number;
    count: number
}

const Pagination:React.FC<PaginationProps> = ({onPageChange, hasNext, hasPrevious, count, currentPage}) => {


    const tasksPerPage = 5;
    const totalPages = Math.ceil(count / tasksPerPage);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  return (
    <nav className="flex items-center flex-col flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
      Showing <span className="font-semibold text-gray-900 dark:text-white">
        {indexOfFirstTask + 1}-{' '}{Math.min(indexOfLastTask,indexOfLastTask)}
      </span> of <span className="font-semibold text-gray-900 dark:text-white">{count}</span>
    </span>
    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
      <li>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevious}
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </button>
      </li>
      {/* Example: Simple pagination with 5 pages */}
      {[...Array(Math.ceil(totalPages))].map((_, index) => (
        <li key={index}>
          <button
            onClick={() => onPageChange(index + 1)}
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
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
  )
}

export default Pagination