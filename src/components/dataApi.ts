

const baseUrl = 'http://localhost:8000'
// const baseUrl = 'http://172.16.8.176:8000'

const dataApi= {
  


    async loginUser(requestionOption: {
        username: string,
        password: string,
    }){
        return await fetch(`${baseUrl}/auth/login/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestionOption)
                }).then((res) =>{
                            return res.json()
                            })
                            .then((data) =>{
                                console.log(data)
                                return data
                            })
    },

    async verifyToken(token: string){
        return await  fetch(`${baseUrl}/api/token/verify/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "token": token
            })
        }).then((res) => {
            if(res.status == 200){
                console.log("trueee")
                return true;
            }
            else{
                console.log("falseeee")
                return false
            }
        })
    },

    async getTasks(requestOption : {
        page: number,
        search: string,
      }, token: string) {
        return await fetch(`${baseUrl}/take_five/task/?page=${requestOption.page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((res) =>{
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
        
    },
    async getTaskDetail(id:string, token: string) {
        return await fetch(`${baseUrl}/take_five/task/${id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((res) =>{
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
        
    },
    async getEmployeeTaskById(id:string, requestOption : {
        page: number,
        search: string,
      }, token: string) {
        return await fetch(`${baseUrl}/take_five/employee/${id}/tasks/?page=${requestOption.page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((res) =>{
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

    async getEmployees(requestOption : {
        page: number,
        search: string,
      }) {
        return await fetch(`${baseUrl}/employee/all/?page=${requestOption.page}`).then((res) =>{
            console.log("ehlo")
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
    },
    async getEmployeeDetail(id: string, token: string) {
        return await fetch(`${baseUrl}/employee/${id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((res) =>{
            console.log("ehlo")
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
    },
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
    async getIncidentReports(requestOption : {
        page: number,
        search: string,
      }, token: string) {
        return await fetch(`${baseUrl}/incident_reports/all/?page=${requestOption.page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((res) =>{
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
    },
    async getIncidentReportDetail(id:string, token: string) {
        return await fetch(`${baseUrl}/incident_reports/detail/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((res) =>{
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
        
    },
    async getEmployeeIncidentReportById(id:string, requestOption : {
        page: number,
        search: string,
      }, token: string) {
        return await fetch(`${baseUrl}/incident_reports/employee/${id}/incident_reports/?page=${requestOption.page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((res) =>{
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
        
    },
    async getNearMissDetail(id:string, token: string) {
        return await fetch(`${baseUrl}/near_miss/detail/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((res) =>{
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
        
    },
    async getEmployeeNearMissById(id:string, requestOption : {
        page: number,
        search: string,
      }, token: string) {
        return await fetch(`${baseUrl}/near_miss/employee/${id}/near_miss/?page=${requestOption.page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((res) =>{
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

    async getNearMiss(requestOption : {
        page: number,
        search: string,
      }, token: string) {
        return await fetch(`${baseUrl}/near_miss/all/?page=${requestOption.page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then((res) =>{
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
    },

    async getDepartmentStats(token: string) {
        return await fetch(`${baseUrl}/analysis/department-stats/`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        ).then((res) =>{
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
    },

    async getReportTrend(token: string) {
        return await fetch(`${baseUrl}/analysis/incident-trend/`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        ).then((res) =>{
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
    },

    async getGeneralInfo(token: string) {
        return await fetch(`${baseUrl}/analysis/dashboard-info/`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        ).then((res) =>{
            return res.json()
            })
            .then((data) =>{
                console.log(data)
                return data
            })
    },


  
}

export default dataApi
