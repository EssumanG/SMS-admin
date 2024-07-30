import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import Main from '../components/Main'
import IncidentReport from '../components/IncidentReport'
import NearMiss from '../components/NearMiss'
import TakeFive from '../components/TakeFive'
const Router:React.FC = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/dashboard' element={<App/>}>
                    <Route index element={<Main/>} />
                    <Route path='/dashboard/incident_reports' element={<IncidentReport/>}/>
                    <Route path='/dashboard/near_miss' element={<NearMiss/>}/>
                    <Route path='/dashboard/take_fives' element={<TakeFive/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router
