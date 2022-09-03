import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import AdService from "../../Services/adService";
import Userservice from "../../Services/userService";
import CommentsOfAd from "../comments/commentsOfAd";
import Popup from 'reactjs-popup';
import { toast } from "react-toastify";

const SingleAd = () => {

    const [adData, setAdData] = useState({})

    const [drivetrain, setDrivetrain] = useState("")

    const [body, setBody] = useState("")

    const [fuel, setFuel] = useState("")
    
    const [askingPrice, setAskingPrice] = useState(0)

    const [description, setDescription] = useState("")

    const [engineVolume, setEngineVolume] = useState(0)

    const [modelYear, setModelYear] = useState(0)

    const [user, setUser] = useState(Userservice.getLoggedIn())

    const [mailingList, setMailingList] = useState([])

    const [reportReason, setReportReason] = useState("")
    
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

    const isUserSubscribed = () => {
        return Boolean(mailingList?.find(entry => user.Email === entry.Mail))
    }

    const subscribe = () => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                AdId : adData.ID,
                Mail : user.Email,
            })
        }

        AdService.subscribe(requestOptions)
        setMailingList(AdService.getMailingList(pathTokens[2], setMailingList))
    }

    const sendReport = (reportReason) => {
        adData.Reported = reportReason

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adData)
        }

        AdService.updateAd(requestOptions)
        setAdData(adData)
    }

    const sendBoostRequest = (boostReason) => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                AdId     : adData.ID,
                Request  : boostReason,
                Username : user.Username,
                Email    : user.Email,
            })
        }

        AdService.sendBoostRequest(requestOptions)
        toast.info("Your request will be reviewed by admin staff")
    }

    useEffect(() => {
        AdService.getSingleAd(pathTokens[2], setAdData)
        AdService.getMailingList(pathTokens[2], setMailingList)
    }, [])
    
    useEffect(() => {
        setMailingList(mailingList)
    }, [mailingList])
    
    
    return (  
        <div name="adData" style={{height: "60vh", overflowY : "scroll", overflowX: "hidden"}}>
            <h2>{adData.Manufacturer+" "+adData.ModelName}</h2>  
            
            {!adData.Reported && adData.AuthorId !== user.ID && user.Role === "Standard" ? <Popup trigger={<Button variant="outline-warning">Report this ad</Button>}
             modal nested>    
            {close => (
            <div style={{backgroundColor : "white", border: "1px solid gray", padding: "5px"}}>
                <Container style={{width: "30vw", height: "20vh"}}>
                    <Row>
                        <Col>
                        <Form.Label>Why would you like to report this ad?</Form.Label>
                        <Form.Control  as="textarea" id="reportMessage" style={{resize : "none"}} onChange={(event) => {setReportReason(event.target.value)}}></Form.Control>
                        </Col>
                    </Row><br></br>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={() => {sendReport(reportReason);close()}}>Submit</Button>
                        </Col>
                        <Col/>
                        <Col/>
                    </Row>
                </Container>
            </div>
            )}
            </Popup> 
                : ''}
            {!adData.Boosted && adData.AuthorId === user.ID && user.Role === "Standard" ? <Popup trigger={<Button variant="outline-info">Request boost</Button>}
             modal nested>    
            {close => (
            <div style={{backgroundColor : "white", border: "1px solid gray", padding: "5px"}}>
                <Container style={{width: "30vw", height: "20vh"}}>
                    <Row>
                        <Col>
                        <Form.Label>Provide some motivation for boost</Form.Label>
                        <Form.Control  as="textarea" id="reportMessage" style={{resize : "none"}} onChange={(event) => {setReportReason(event.target.value)}}></Form.Control>
                        </Col>
                    </Row><br></br>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={() => {sendBoostRequest(reportReason);close()}}>Submit</Button>
                        </Col>
                        <Col/>
                        <Col/>
                    </Row>
                </Container>
            </div>
            )}
            </Popup> 
                : ''}
            {adData.Reported && user.Role === 'Standard' ? <p style={{color :'orange'}}>This ad has been reported</p> : ''}
            {adData.Reported && user.Role === 'Administrator' ? <p style={{color :'orange'}}>Reported: {adData.Reported}</p> : ''}
            <Container>
            <br></br>
                <Row>

                </Row>
                <Row>
                    <Col>
                    <p><b>Model year</b> 
                    <Form.Control defaultValue={adData.ModelYear} as="input" type="number" min={0} disabled={adData.AuthorId !== user.ID}
                        id="yearInput" onChange={(event) => {setModelYear(event.target.value)}}></Form.Control>
                    </p>
                    <p><b>Engine volume in cc</b>
                    <Form.Control defaultValue={adData.EngineVolume} as="input" type="number" min={0} disabled={adData.AuthorId !== user.ID}
                        id="volumeInput" onChange={(event) => {setEngineVolume(event.target.value)}}></Form.Control>
                    </p>
                    <p><b>Drivetrain</b>    
                    <Form.Control as="select" id="drivetrainSelect" disabled={adData.AuthorId !== user.ID} value={adData?.Drivetrain} onChange={(event) => {setDrivetrain(event.target.value)}}>
                        <option value={"front wheel drive"}>FWD</option>
                        <option value={"rear wheel drive"}>RWD</option>
                        <option value={"all wheel drive"}>AWD</option>
                    </Form.Control>
                    </p>
                    <p><b>Fuel type</b>    
                    <Form.Control as="select" id="fuelSelect" disabled={adData.AuthorId !== user.ID} value={adData?.FuelType} onChange={(event) => {setFuel(event.target.value)}}>
                        {AdService.fuelType.map(f => {
                            return <option key={f} value={f}>{f}</option>
                        })}
                    </Form.Control></p>
                    <p><b>Body</b>  
                    <Form.Control as="select" id="bodySelect" disabled={adData.AuthorId !== user.ID} value={adData?.Body} onChange={(event) => {setBody(event.target.value)}}>
                        {AdService.bodyType.map(b => {
                            return <option key={b} value={b}>{b}</option>
                        })}
                    </Form.Control>
                    </p>
                    </Col>
                    <Col><b>Price in €</b>     
                    <Form.Control as="input" type="number" defaultValue={adData.AskingPrice?.toFixed(2)} disabled={adData.AuthorId !== user.ID} required step={0.01}  min={0} id="priceInput" onChange={(event) => {setAskingPrice(event.target.value)}}/>
                        <p><b>Mileage</b> {adData.Mileage} km</p>
                        <Form.Control as="textarea" id="descriptionInput" disabled={adData.AuthorId !== user.ID} defaultValue={adData.Description} style={{maxHeight: "30vh"}} onChange={(event) => {setDescription(event.target.value)}}/>
                    </Col>
                </Row><br></br>
                <Row>
                    <Col>
                        {(user.Role === 'Administrator' && adData.Reported)  || adData.AuthorId === user.ID ? 
                        <Button variant="danger" onClick={() => {
                            deleteAd()
                        }}>
                            Delete
                        </Button> : ''}
                        &nbsp;
                        {user.Role === 'Administrator' && !adData.Active ? 
                        <Button variant="outline-success" onClick={() => {
                            adData.Active = true
                            sendUpdate()
                            setTimeout(() => {
                                navigate('/ads')
                            }, 1000);
                        }}>
                            Approve
                        </Button> : ''}
                        &nbsp;
                        {user.Role === 'Standard' && adData.AuthorId === user.ID ?
                        <Button onClick={() => {
                            sendUpdate()
                        }}>
                            Update
                        </Button> : ''}
                        &nbsp;
                        {user.Role === 'Standard' && user.ID !== adData.AuthorId && !isUserSubscribed() ? 
                        <Button variant="outline-success" onClick={() => {subscribe()}}>
                            Subscribe
                        </Button> : ''}
                        {user.Role === 'Standard' && user.ID !== adData.AuthorId && isUserSubscribed() ? 
                        <Button variant="success" onClick={() => {subscribe()}}>
                            Unsubscribe
                        </Button> : ''}
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