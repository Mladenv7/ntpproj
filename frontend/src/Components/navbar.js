import { useEffect, useState } from 'react';
import { Button, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/userService';


const AppNavbar = () => {

    const [user, setUser] = useState({})

    const logout = () => {
      UserService.logout()
      setUser({})
      navigate("/ads")
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
            {user?.Role === "Standard" ? <Nav.Link href="/newAd">Create an ad</Nav.Link> : ""}
            {user?.Role === "Standard" ? <Nav.Link href="/myAds">My ads</Nav.Link> : ""}
            {user?.Role === "Administrator" ? <Nav.Link href="/newAds">New ads</Nav.Link> : ""}
            {user?.Role === "Administrator" ? <Nav.Link href="/reportedAds">Reported ads</Nav.Link> : ""}
            {user?.Role === "Administrator" ? <Nav.Link href="/reportedComments">Reported comments</Nav.Link> : ""}
            {user?.Role === "Administrator" ? <Nav.Link href="/allRequests">Boost requests</Nav.Link> : ""}
            {/* {user?.Role === "Administrator" ? <Nav.Link href="/reports">Reports</Nav.Link> : ""} */}
            {user?.Role === "Administrator" ? <Nav.Link href="/allUsers">Users</Nav.Link> : ""}
            {user?.Role === "Administrator" ? <NavDropdown title="Reports" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Worst users</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Most subscribed ads</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Most visisted ads</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Popular manufacturers</NavDropdown.Item>
            </NavDropdown> : ""}
          </Nav>
          <div className='d-flex'>
          <Nav.Link disabled style={{color : "white"}}>{user?.Username}</Nav.Link>
         
          {user ? <Button variant='outline-primary' onClick={() => {logout()}}>
            Log out
          </Button>: <Button variant='primary' onClick={() => {navigate('/login')}}>
            Login
          </Button>}
          </div>
        </Container>
        </Navbar>
    );
}
 
export default AppNavbar;