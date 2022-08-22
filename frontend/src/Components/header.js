import AppNavbar from "./navbar";
import logo from "../Assets/logo.png"
import { Container } from "react-bootstrap";

const Header = () => {
    return ( 
        <div style={{backgroundColor : "blanchedalmond"}}>
            <Container>
            <br></br>
            <img src={logo}></img>
            <br></br>
            <br></br>
            </Container>
            <AppNavbar/>
        </div>
    );
}
 
export default Header;