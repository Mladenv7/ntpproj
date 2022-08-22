import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdItem = ({adData}) => {
    return (  
        <article>
            <Row><Col><h4><Link to={"/ads/"+adData.ID}>{adData.Manufacturer+" "+adData.ModelName}</Link></h4></Col></Row>
            <Row>
            <Col>
                {/* picture goes here */}
            </Col>
            <Col>
            <p><b>Model year</b> {adData.ModelYear}</p>
            <p><b>Engine volume</b> {adData.EngineVolume}cc</p>
            <p><b>Drivetrain</b> {adData.Drivetrain}</p>
            <p><b>Fuel</b> {adData.FuelType}</p>
            <p><b>Body</b> {adData.Body}</p>
              
            </Col>
            <Col>
                <h4>{adData.AskingPrice.toFixed(2)} €</h4>
                <p><b>Mileage</b> {adData.Mileage} km</p>
                <p style={{borderStyle: "solid", borderWidth: "thin", height: "60%"}}>{adData.Description}</p>
            </Col>
            </Row>
        </article>
    );
}
 
export default AdItem;