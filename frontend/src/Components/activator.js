import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import jwt from 'jwt-decode'
import UserService from "../Services/userService";

const Activator = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate();

    

    useEffect(() => {
        UserService.activateUser({
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jwt(searchParams.get("token")).email),
        })

        setTimeout(() => {
            navigate("/login")
        }, 3000);
    }, [])
    

    return ( 
        <>
        </>
    );
}
 
export default Activator;