const UserService = {

    login : (requestOptions, setToken) => {
        fetch('http://localhost:8081/api/users/login', requestOptions).
        then((response) => response.json()).
        then((responseJson) => {
            setToken(responseJson)
        })
    },

    getUserFromToken : (token) => {
        let requestOptions = {
            method : 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
        }

        fetch('http://localhost:8081/api/users/loggedIn', requestOptions).
        then((response) => response.json()).
        then((responseJson) => {
            localStorage.setItem("loggedIn", JSON.stringify(responseJson))
        })
    },

    getLoggedIn : () => {
        return JSON.parse(localStorage.getItem("loggedIn"))
    },

    logout: () => {
        localStorage.removeItem("loggedIn")
    },
}

export default UserService