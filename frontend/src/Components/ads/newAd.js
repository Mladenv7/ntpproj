import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import AdService from "../../Services/adService";
import UserService from "../../Services/userService";

const NewAd = () => {

    const [manufacturer, setManufacturer] = useState(["", []]) 

    const [modelName, setModelName] = useState("")

    const [trim, setTrim] = useState("")

    const [drivetrain, setDrivetrain] = useState("")

    const [body, setBody] = useState("")

    const [fuel, setFuel] = useState("")

    const [modelYear, setModelYear] = useState(0)

    const [engineVolume, setEngineVolume] = useState(0)

    const [mileage, setMileage] = useState(0)

    const [askingPrice, setAskingPrice] = useState(0)

    const [description, setDescription] = useState("")

    const [user, setUser] = useState(UserService.getLoggedIn())


    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Description : description,
            AskingPrice : Number(askingPrice),
            Mileage     : Number(mileage),
            AuthorId    : user.ID,

            Manufacturer : manufacturer[0],
            ModelName    : modelName+" "+trim,
            ModelYear    : Number(modelYear),
            EngineVolume : Number(engineVolume),
            Drivetrain   : drivetrain,
            FuelType     : fuel,
            Body         : body,

            Active       : false,
        })
    }

    const sendAd = () => {
        AdService.sendAd(requestOptions)
    }

    return (  
        <div name="newAdForm">
            <h3>New ad</h3>

            <Form>
                <Form.Group className="mb-3">
                <Row>
                    <Col>
                    <Form.Label htmlFor="manufacturerSelect">Select manufacturer</Form.Label>
                    <Form.Control as="select" id="manufacturerSelect"  onChange={(event) => {setManufacturer(JSON.parse(event.target.value))}}>
                        <option value={""}></option>
                        {AdService.manufacturers.map(m => {
                            
                            return <option key={m[0]} value={JSON.stringify(m)}>{m[0]}</option>
                        })}
                    </Form.Control>
                    </Col>
                    <Col>
                    <Form.Label htmlFor="manufacturerSelect">Select model</Form.Label>
                    <Form.Control as="select" id="modelSelect" onChange={(event) => {setModelName(event.target.value)}}>
                        <option value={""}></option>
                        {manufacturer[1].map(model => {
                            return <option key={model} value={model}>{model}</option>
                        })}
                    </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label htmlFor="trimInput">Trim</Form.Label>
                        <Form.Control id="trimInput" onChange={(event) => {setTrim(event.target.value)}}/>
                    </Col>
                </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                <Row>
                    <Col>
                    <Form.Label htmlFor="drivetrainSelect">Select drivetrain</Form.Label>
                    <Form.Control as="select" id="drivetrainSelect" onChange={(event) => {setDrivetrain(event.target.value)}}>
                        <option value={""}></option>
                        <option value={"front wheel drive"}>FWD</option>
                        <option value={"rear wheel drive"}>RWD</option>
                        <option value={"all wheel drive"}>AWD</option>
                    </Form.Control>
                    </Col>
                    <Col>
                    <Form.Label htmlFor="bodySelect">Select body</Form.Label>
                    <Form.Control as="select" id="bodySelect" onChange={(event) => {setBody(event.target.value)}}>
                        <option value={""}></option>
                        {AdService.bodyType.map(b => {
                            
                            return <option key={b} value={b}>{b}</option>
                        })}
                    </Form.Control>
                    </Col>
                    <Col>
                    <Form.Label htmlFor="fuelSelect">Select fuel</Form.Label>
                    <Form.Control as="select" id="fuelSelect" onChange={(event) => {setFuel(event.target.value)}}>
                        <option value={""}></option>
                        {AdService.fuelType.map(f => {
                            return <option key={f} value={f}>{f}</option>
                        })}
                    </Form.Control>
                    </Col>
                </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                <Row>
                    <Col>
                        <Form.Label htmlFor="yearInput">Model year</Form.Label>
                        <Form.Control as="input" type="number" min={0} id="yearInput" onChange={(event) => {Number(setModelYear(event.target.value))}}/>
                    </Col>
                    <Col>
                        <Form.Label htmlFor="volumeInput">Engine volume</Form.Label>
                        <Form.Control as="input" type="number" min={0} id="volumeInput" onChange={(event) => {Number(setEngineVolume(event.target.value))}}/>
                    </Col>
                    <Col>
                        <Form.Label htmlFor="mileageInput">Mileage in km</Form.Label>
                        <Form.Control as="input" type="number"    min={0} id="mileageInput" onChange={(event) => {Number(setMileage(event.target.value))}}/>
                    </Col>
                </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                      
                        <Form.Label htmlFor="priceInput">Asking price in euros</Form.Label>
                        <Form.Control as="input" type="number"  step={0.01}  min={0} id="priceInput" onChange={(event) => {Number(setAskingPrice(event.target.value))}}/>
                        </Col>
                        <Col>
                        <Form.Label htmlFor="descriptionInput">Decription</Form.Label>
                        <Form.Control as="textarea" id="descriptionInput" style={{maxHeight : "150px"}} onChange={(event) => {setDescription(event.target.value)}}/>
                        </Col>
                    </Row>
                </Form.Group>
                <Button type="button" onClick={() => {sendAd()}}>Submit</Button>
           
            </Form>
        </div>
    );
}
 
export default NewAd;