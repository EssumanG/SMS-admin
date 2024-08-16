import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface Employee {
  id: string;
  employee_number: string;
  name: string;
  department: string;
  email: string;
  gender: string;
  telephone_number: string;
}

interface EmployeeInfoProps {
  isOpen: boolean;
  onRequestClose: () => void;
  employeeInfo?: Employee; // Optional to handle undefined
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ isOpen, onRequestClose, employeeInfo }) => {
  if (!employeeInfo) {
    return null; // Avoid rendering if no employee info is available
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Employee Info"
      className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-out"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="relative bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <button
              className="absolute top-0 right-0 m-2 text-red-500 font-bold bg-gray-500 hover:text-white hover:bg-red-500 rounded px-1"
              onClick={onRequestClose}
            >
              X
            </button>
            <h2 className="text-base font-semibold leading-6 text-gray-900">Employee Information</h2>
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Detailed information about the user.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {employeeInfo.name}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {employeeInfo.email}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {employeeInfo.telephone_number}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Department</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {employeeInfo.department}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EmployeeInfo;
