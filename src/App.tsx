import Sidebar from "./components/Sidebar"
import Dashboardview from './components/Dashboardview';
import { Outlet } from "react-router-dom";


function App() {
  

  return (
    <div className="flex">
     <div className="basis-[15%] h-[100vh]">
      <Sidebar/>
     </div>
     <div className="basis-[85%] border  h-[100vh] overflow-scroll">
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
