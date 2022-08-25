import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/userService';


const AppNavbar = () => {

    const [user, setUser] = useState({})

    const logout = () => {
      UserService.logout()
      navigate("/login")
    }

    const navigate = useNavigate()

    useEffect(() => {
      setUser(UserService.getLoggedIn())
    }, [])

    return (  
        <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-1">
            <Nav.Link href="/ads">All ads</Nav.Link>
            {user.Role === "Standard" ? <Nav.Link href="/newAd">Create an ad</Nav.Link> : ""}
            {user.Role === "Standard" ? <Nav.Link href="/myAds">My ads</Nav.Link> : ""}
            {user.Role === "Administrator" ? <Nav.Link href="/newAds">New ads</Nav.Link> : ""}
            {user.Role === "Administrator" ? <Nav.Link href="/reportedAds">Reported ads</Nav.Link> : ""}
            {user.Role === "Administrator" ? <Nav.Link href="/reportedComments">Reported comments</Nav.Link> : ""}
            {user.Role === "Administrator" ? <Nav.Link href="/boostRequests">Boost requests</Nav.Link> : ""}
            {user.Role === "Administrator" ? <Nav.Link href="/reports">Reports</Nav.Link> : ""}
          </Nav>
          <div className='d-flex'>
          <Nav.Link disabled style={{color : "white"}}>{user.Username}</Nav.Link>
         
          <Button variant='outline-primary' onClick={() => {logout()}}>
            Log out
          </Button>
          </div>
        </Container>
        </Navbar>
    );
}
 
export default AppNavbar;