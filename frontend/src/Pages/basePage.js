import { ToastContainer } from "react-toastify";
import UserObserver from "../Components/userObserver";
import BaseLayout from "../Layouts/baseLayout";

const BasePage = () => {
    return (
        <>
        <UserObserver/>
        <BaseLayout/>
        <ToastContainer autoClose={1000}/>
        </>  
        
    );
}
 
export default BasePage;