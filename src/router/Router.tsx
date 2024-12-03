import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import Main from '../components/Main'
import IncidentReport from '../components/IncidentReport';
import NearMiss from '../components/NearMiss'
import TakeFive from '../components/TakeFive'
import HomePage from '../components/HomePage'
import TaskDetail from '../components/TaskDetail'
import IncidentReportDetail from '../components/IncidentReportDetail';
// import EmployeeInfo from '../components/EmployeeInfo';
import EmployeeList from '../components/EmployeeList';
import EmpInfoTest from '../components/EmpInfoTest'
import LoginPage from '../components/LoginPage';

const Router:React.FC = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='' element={<HomePage/>}/>
                <Route path='/dashboard' element={<App/>}>
                    <Route index element={<Main/>} />
                    <Route path='incident_reports' element={<IncidentReport/>}/>
                    <Route path='near_miss' element={<NearMiss/>}/>
                    <Route path='take_fives' element={<TakeFive/>}/>
                    <Route path='task/:id' element={<TaskDetail/>}/>
                    <Route path='incident_report/:id' element={<IncidentReportDetail/>}/>
                    {/* <Route path='/dashboard/employee/:id' element={<EmployeeInfo isOpen={false} onRequestClose={function (): void {
                      throw new Error('Function not implemented.');
            } } />}/> */}
                    <Route path='employees' element={<EmployeeList/>}/>
                    <Route path='employee/:id' element={<EmpInfoTest/>}/>

                </Route>
                <Route path='/login' element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router
