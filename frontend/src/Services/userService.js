import { toast } from "react-toastify";

const UserService = {

    getAllUsers : (setUsers) => {
        fetch('http://localhost:8081/api/users', {method: "GET", headers : {"Authorization": "Bearer "+UserService.getToken()}}).
        then((response) => response.json()).
        then((responseJson) => {
            setUsers(responseJson.map(user => {user.Password = ''; return user}))
        })
    },

    banUser : (requestOptions) => {
        requestOptions.headers.Authorization = "Bearer "+UserService.getToken()
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

    getToken : () => {
        return JSON.parse(localStorage.getItem("token"))
    },

    logout: () => {
        localStorage.removeItem("loggedIn")
        localStorage.removeItem("token")
    },

    registration : (requestOptions) => {
        fetch('http://localhost:8081/api/users/register', requestOptions).
        then((response) => {      
            if(response.status == 400){
                toast.error("This email is already taken!")
            }
            else{
                toast.success("You have successfully registered!")
                toast.info("An email with activation link has been sent to your address.")
            }

            return response.json()}).
        catch((error) => {
            console.log(error);
        })
    },

    getUserById : (id, setUser) => {
        fetch('http://localhost:8081/api/users/'+id, {method: "GET", headers : {"Authorization": "Bearer "+UserService.getToken()}}).
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