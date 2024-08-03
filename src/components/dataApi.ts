

const baseUrl = 'http://localhost:8000'
const dataApi= {
  

    async getTasks() {
        return await fetch(`${baseUrl}/take_five/`).then((res) =>{
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
        
    },
    async getTaskDetail(id:string) {
        return await fetch(`${baseUrl}/take_five/${id}`).then((res) =>{
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
        
    },

    // async createTasks(newTask) {
    //     return await fetch(`${baseUrl}/take_five/`,{
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newTask)
    //     }).then((res) =>{
    //         return res.json()
    //         })
    //         .then((data) =>{
    //             console.log(data)
    //             return data
    //         })
        
    // },

    // async getEmployees() {
    //     return await fetch(`${baseUrl}/employee/`).then((res) =>{
    //         return res.json()
    //         })
    //         .then((data) =>{
    //             console.log(data)
    //             return data
    //         })
    // },
    // async createEmployee(employeeInfo) {
    //     return await fetch(`${baseUrl}/employee/`,{
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(employeeInfo)
    //     }).then((res) =>{
    //         return res.json()
    //         })
    //         .then((data) =>{
    //             console.log(data)
    //             return data
    //         })
    // },
    // async getHazards() {
    //     return await fetch(`${baseUrl}/take_five/hazards/`).then((res) =>{
    //         return res.json()
    //         })
    //         .then((data) =>{
    //             console.log(data)
    //             return data
    //         })
    // },
    // async createHazard(hazardInfo) {
    //     return await fetch(`${baseUrl}/take_five/hazards/`,{
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(hazardInfo)
    //     }).then((res) =>{
    //         return res.json()
    //         })
    //         .then((data) =>{
    //             console.log(data)
    //             return data
    //         })
    // },
    // async getControls() {
    //     return await fetch(`${baseUrl}/take_five/controls/`).then((res) =>{
    //         return res.json()
    //         })
    //         .then((data) =>{
    //             console.log(data)
    //             return data
    //         })
    // },
    // async createControl(ControlInfo) {
    //     return await fetch(`${baseUrl}/take_five/controls/`,{
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(ControlInfo)
    //     }).then((res) =>{
    //         return res.json()
    //         })
    //         .then((data) =>{
    //             console.log(data)
    //             return data
    //         })
    // },
    async getIncidentReports() {
        return await fetch(`${baseUrl}/incident_reports/`).then((res) =>{
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
    },
    // async createIncidentReport(reportInfo) {
    //     return await fetch(`${baseUrl}/incident_reports/`,{
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(reportInfo)
    //     }).then((res) =>{
    //         return res.json()
    //         })
    //         .then((data) =>{
    //             console.log(data)
    //             return data
    //         })
    // },
  
}

export default dataApi
