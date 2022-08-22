import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import AdService from "../../Services/adService";
import CommentsOfAd from "../comments/commentsOfAd";

const SingleAd = () => {

    const [adData, setAdData] = useState({})

    const [drivetrain, setDrivetrain] = useState("")

    const [body, setBody] = useState("")

    const [fuel, setFuel] = useState("")
    
    const [askingPrice, setAskingPrice] = useState(0)

    const [description, setDescription] = useState("")

    const [engineVolume, setEngineVolume] = useState(0)

    const [modelYear, setModelYear] = useState(0)
    
    const navigate = useNavigate()

    let pathTokens = window.location.pathname.split("/")

    const sendUpdate = () => {

        adData.Drivetrain = drivetrain ? drivetrain : adData.Drivetrain
        adData.Body = body ? body : adData.Body 
        adData.FuelType = fuel ? fuel : adData.FuelType
        adData.AskingPrice = askingPrice ? askingPrice : adData.AskingPrice
        adData.Description = description ? description : adData.Description
        adData.ModelYear = modelYear ? Number(modelYear) : adData.ModelYear
        adData.EngineVolume = engineVolume ? Number(engineVolume) : adData.EngineVolume
        

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adData)
        }

        AdService.updateAd(requestOptions)
    }

    const deleteAd = () => {
        let requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        }

        AdService.deleteAd(adData.ID, requestOptions)
        setTimeout(() => {
            navigate('/ads')
        }, 1000);
    }

    useEffect(() => {
        AdService.getSingleAd(pathTokens[2], setAdData)
    }, [])
    
    
    return (  
        <div name="adData" style={{height: "60vh", overflowY : "scroll", overflowX: "hidden"}}>
            <h2>{adData.Manufacturer+" "+adData.ModelName}</h2>
            <Container>
                <Row>

                </Row>
                <Row>
                    <Col>
                    <p><b>Model year</b> <Form.Control defaultValue={adData.ModelYear} as="input" type="number" min={0} id="yearInput" onChange={(event) => {setModelYear(event.target.value)}}></Form.Control></p>
                    <p><b>Engine volume in cc</b><Form.Control defaultValue={adData.EngineVolume} as="input" type="number" min={0} id="volumeInput" onChange={(event) => {setEngineVolume(event.target.value)}}></Form.Control></p>
                    <p><b>Drivetrain</b>    
                    <Form.Control as="select" id="drivetrainSelect" value={adData?.Drivetrain} onChange={(event) => {setDrivetrain(event.target.value)}}>
                        <option value={"front wheel drive"}>FWD</option>
                        <option value={"rear wheel drive"}>RWD</option>
                        <option value={"all wheel drive"}>AWD</option>
                    </Form.Control>
                    </p>
                    <p><b>Fuel type</b>    
                    <Form.Control as="select" id="fuelSelect" value={adData?.FuelType} onChange={(event) => {setFuel(event.target.value)}}>
                        {AdService.fuelType.map(f => {
                            return <option key={f} value={f}>{f}</option>
                        })}
                    </Form.Control></p>
                    <p><b>Body</b>  
                    <Form.Control as="select" id="bodySelect" value={adData?.Body} onChange={(event) => {setBody(event.target.value)}}>
                        {AdService.bodyType.map(b => {
                            return <option key={b} value={b}>{b}</option>
                        })}
                    </Form.Control>
                    </p>
                    </Col>
                    <Col><b>Price in €</b>     
                    <Form.Control as="input" type="number" defaultValue={adData.AskingPrice?.toFixed(2)}   required step={0.01}  min={0} id="priceInput" onChange={(event) => {setAskingPrice(event.target.value)}}/>
                        <p><b>Mileage</b> {adData.Mileage} km</p>
                        <Form.Control as="textarea" id="descriptionInput" defaultValue={adData.Description} style={{maxHeight: "30vh"}} onChange={(event) => {setDescription(event.target.value)}}/>
                    </Col>
                </Row><br></br>
                <Row>
                    <Col>
                        <Button variant="danger" onClick={() => {
                            deleteAd()
                        }}>
                            Delete
                        </Button>&nbsp;
                        <Button onClick={() => {
                            sendUpdate()
                        }}>
                            Update
                        </Button>
                    </Col>
                        
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <h3>Comments</h3>
            <CommentsOfAd  adId={pathTokens[2]}/>
        </div>
    );
}
 
export default SingleAd;