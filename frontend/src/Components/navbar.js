import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const AppNavbar = () => {
    return (  
        <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-1">
            <Nav.Link href="/ads">All ads</Nav.Link>
            <Nav.Link href="/newAd">Create an ad</Nav.Link>
          </Nav>
        </Container>
        </Navbar>
    );
}
 
export default AppNavbar;