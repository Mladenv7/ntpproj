import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../Components/login/loginForm";
import UserService from "../Services/userService";

const LoginPage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if(UserService.getLoggedIn()) navigate("/ads")
    }, [])
    

    return (  
        <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <LoginForm />
           
        </>
    );
}
 
export default LoginPage;