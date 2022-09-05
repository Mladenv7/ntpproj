import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";


const AdSubscribeCount = ({adData}) => {

    return (  
    <article>
        <h6><Link to={"/ads/"+adData[0]?.ID}>{adData[0]?.Manufacturer+" "+adData[0]?.ModelName}</Link></h6>
        <Container>
            <Row>
                <Col xs={3}>Mileage</Col>
                <Col>{adData[0]?.Mileage}</Col>
            </Row>
            <Row>
                <Col xs={3}>Asking price</Col>
                <Col>{adData[0]?.AskingPrice} €</Col>
            </Row>
            <Row>
                <Col xs={3}><b>Subscribed to by:</b> {adData[1]} {adData[1] === 1 ? "user" : "users"}</Col>
            </Row>
        </Container>
    </article>
    );
}
 
export default AdSubscribeCount;