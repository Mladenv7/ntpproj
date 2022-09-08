import UserService from "./userService"

const ReportService = {

    getWorstUsers : (setWorstUsers) => {
        fetch('http://localhost:8081/api/reports/worstUsers', {method: "GET", headers : {"Authorization": "Bearer "+UserService.getToken()}})
        .then((response) => response.json())
        .then((responseJson) => {
            setWorstUsers(responseJson)
        })
    },

    getMostSubscribed : (setMostSubscribed) => {
        fetch('http://localhost:8081/api/reports/mostSubscribed', {method: "GET", headers : {"Authorization": "Bearer "+UserService.getToken()}})
        .then((response) => response.json())
        .then((responseJson) => {
            setMostSubscribed(responseJson)
        })
    },

    getPopularManufacturers : (setManufacturers) => {
        fetch('http://localhost:8081/api/reports/popularManufacturers', {method: "GET", headers : {"Authorization": "Bearer "+UserService.getToken()}})
        .then((response) => response.json())
        .then((responseJson) => {
            setManufacturers(responseJson)
        })
    },

    getMostVisited : (setVisits) => {
        fetch('http://localhost:8081/api/reports/visits', {method: "GET", headers : {"Authorization": "Bearer "+UserService.getToken()}})
        .then((response) => response.json())
        .then((responseJson) => {
            setVisits(responseJson)
        })
    },

    addVisit : (requestOptions) => {
        requestOptions.headers.Authorization = "Bearer "+UserService.getToken()
        fetch('http://localhost:8081/api/reports/newVisit', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            
        })
    },
}

export default ReportService