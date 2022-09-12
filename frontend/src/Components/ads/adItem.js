import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserService from "../../Services/userService";

const AdItem = ({adData, color}) => {
    return (  
        <article style={{backgroundColor : color}}>
            <Row><Col>
                <h5>
                {UserService.getLoggedIn() ? <Link to={"/ads/"+adData.ID}>{adData.Manufacturer+" "+adData.ModelName}</Link> : adData.Manufacturer+" "+adData.ModelName}
                </h5></Col></Row>
            <Row>
            <Col>
                <img src={require("../../../../images/"+adData?.Image)} style={{width : "100%"}}/>
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