import { toast } from "react-toastify";

const UserService = {

    getAllUsers : (setUsers) => {
        fetch('http://localhost:8081/api/users').
        then((response) => response.json()).
        then((responseJson) => {
            setUsers(responseJson.map(user => {user.Password = ''; return user}))
        })
    },

    banUser : (requestOptions) => {
        fetch('http://localhost:8081/api/users/ban', requestOptions).
        then((response) => response.json()).
        then((responseJson) => {      
        })
    },

    login : (requestOptions, setToken) => {
        fetch('http://localhost:8081/api/users/login', requestOptions).
        then((response) => response.json()).
        then((responseJson) => {
            setToken(responseJson)
            localStorage.setItem("token", JSON.stringify(responseJson))
        }).catch((error) => {
            toast.error("Bad credentials")
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
        localStorage.removeItem("token")
    },

    registration : (requestOptions) => {
        fetch('http://localhost:8081/api/users/register', requestOptions).
        then((response) => response.json()).
        then((responseJson) => {
            
        })
    },

    getUserById : (id, setUser) => {
        fetch('http://localhost:8081/api/users/'+id).
        then((response) => response.json()).
        then((responseJson) => {
            setUser(responseJson)
        })
    },

    activateUser : (requestOptions) => {
        fetch('http://localhost:8081/api/users/activate', requestOptions).
        then((response) => response.json()).
        then((responseJson) => {

        })
    },

    generateActivationToken : (email, setToken) => {
        fetch('http://localhost:8081/api/users/generateActivationToken/'+email).
        then((response) => response.json()).
        then((responseJson) => {
            setToken(responseJson)
        })
    }
}

export default UserService