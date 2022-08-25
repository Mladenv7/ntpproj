import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../Services/userService";

const UserObserver = () => {

    const [user, setUser] = useState(UserService.getLoggedIn())

    const navigate = useNavigate()

    useEffect(() => {
        setUser(user)

        if(!user) navigate("/login")
    }, [user])
    

    return (  
        <></>
    );
}
 
export default UserObserver;