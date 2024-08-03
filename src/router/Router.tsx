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
const Router:React.FC = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='' element={<HomePage/>}/>
                <Route path='/dashboard' element={<App/>}>
                    <Route index element={<Main/>} />
                    <Route path='/dashboard/incident_reports' element={<IncidentReport/>}/>
                    <Route path='/dashboard/near_miss' element={<NearMiss/>}/>
                    <Route path='/dashboard/take_fives' element={<TakeFive/>}/>
                    <Route path='/dashboard/task/:id' element={<TaskDetail/>}/>
                    <Route path='/dashboard/incident_report/:id' element={<IncidentReportDetail/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router
