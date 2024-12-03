import Sidebar from "./components/Sidebar"
import Dashboardview from './components/Dashboardview';
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();

  const currentPath = location.pathname;



  


  return (
    <div className="flex">
     <div className="basis-[15%] h-[100vh]">
      <Sidebar/>
     </div>
     <div className="basis-[85%] border  h-[100vh] overflow-scroll">
     <h2>Current Path in Nested Component: {currentPath}</h2>
      <Dashboardview/>
      <div>
        <Outlet>

        </Outlet>
     </div>
     </div>
     

    </div>
  )
}

export default App
