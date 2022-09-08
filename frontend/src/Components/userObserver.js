import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../Services/userService";

const UserObserver = () => {

    const [user, setUser] = useState(UserService.getLoggedIn())

    const navigate = useNavigate()

    useEffect(() => {
        if(user?.Active === false) localStorage.removeItem("loggedIn")
        setUser(user)
        if(!user && window.location.pathname !== '/ads') navigate("/ads")
    }, [user])
    

    return (  
        <></>
    );
}
 
export default UserObserver;