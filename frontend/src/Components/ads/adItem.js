import { Row, Col } from "react-bootstrap";

const AdItem = ({adData, carData}) => {
    return (  
        <article>
            <Row><Col><h4>{carData.Manufacturer+" "+carData.ModelName}</h4></Col></Row>
            <Row>
            <Col>
                {/* picture goes here */}
            </Col>
            <Col>
            <p>Model year {carData.ModelYear}</p>
            <p>Engine volume {carData.EngineVolume}</p>
            <p>Drivetrain {carData.Drivetrain}</p>
            <p>Fuel {carData.FuelType}</p>
            <p>Body {carData.Body}</p>
              
            </Col>
            <Col>
                <h4>{adData.AskingPrice.toFixed(2)} €</h4>
                <p>Mileage: {adData.Mileage} km</p>
                <p>{adData.Description}</p>
            </Col>
            </Row>
        </article>
    );
}
 
export default AdItem;