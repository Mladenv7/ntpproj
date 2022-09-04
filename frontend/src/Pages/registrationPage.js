import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../Components/register/registrationForm";
import UserService from "../Services/userService";

const RegistrationPage = () => {

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
            
            <RegistrationForm/>
        </>
    );
}
 
export default RegistrationPage;