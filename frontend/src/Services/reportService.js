const ReportService = {

    getWorstUsers : (setWorstUsers) => {
        fetch('http://localhost:8081/api/reports/worstUsers')
        .then((response) => response.json())
        .then((responseJson) => {
            setWorstUsers(responseJson)
        })
    },

    getMostSubscribed : (setMostSubscribed) => {
        fetch('http://localhost:8081/api/reports/mostSubscribed')
        .then((response) => response.json())
        .then((responseJson) => {
            setMostSubscribed(responseJson)
        })
    },

    getPopularManufacturers : (setManufacturers) => {
        fetch('http://localhost:8081/api/reports/popularManufacturers')
        .then((response) => response.json())
        .then((responseJson) => {
            setManufacturers(responseJson)
        })
    },

    getMostVisited : (setVisits) => {
        fetch('http://localhost:8081/api/reports/visits')
        .then((response) => response.json())
        .then((responseJson) => {
            setVisits(responseJson)
        })
    },

    addVisit : (requestOptions) => {
        fetch('http://localhost:8081/api/reports/newVisit', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            
        })
    },
}

export default ReportService