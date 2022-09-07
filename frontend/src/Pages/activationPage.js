import { Col, Container, Row } from "react-bootstrap";
import Activator from "../Components/activator";

const ActivationPage = () => {
    return (  
        <Container>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Row>
                <Col/>
                <Col>
                    <Activator/>
                    Congratulations, you have successfully activated your account!
                </Col>
                <Col/>
            </Row>
        </Container>
    );
}
 
export default ActivationPage;