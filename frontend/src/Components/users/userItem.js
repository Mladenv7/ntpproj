import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import EmailService from '../../Services/emailService'
import Popup from 'reactjs-popup';


const UserItem = ({userData, nrOfReports, banCallback}) => {

    const [banReason, setBanReason] = useState("")

    const sendBanEmail = () => {
        EmailService.sendEmail({
            method: "POST",
            headers: {},
            body: JSON.stringify({
                From    : "ntpproj.com",
                To      : userData.Email,
                Subject : "Ban notification",
                Message : "We are informing you that you have been banned for following reason: \n\n"+banReason
            })
        })
    }

    return (  
        <article>
            <Row><Col><h3>{userData.Username}</h3></Col>
                 <Col>{!userData.Banned ? <Popup trigger={<Button variant="danger" >Ban user</Button>}
                modal nested>    
                {close => (
                <div style={{backgroundColor : "white", border: "1px solid gray", padding: "5px"}}>
                    <Container style={{width: "30vw", height: "20vh"}}>
                        <Row>
                            <Col>
                            <Form.Label>Provide a reason for banning the user</Form.Label>
                            <Form.Control  as="textarea" id="reportMessage" style={{resize : "none"}} onChange={(event) => {setBanReason(event.target.value)}}></Form.Control>
                            </Col>
                        </Row><br></br>
                        <Row>
                            <Col>
                                <Button variant="primary" onClick={() => {banCallback(userData.Email);sendBanEmail()}}>Submit</Button>
                            </Col>
                            <Col/>
                            <Col/>
                        </Row>
                    </Container>
                </div>
                )}
                </Popup>  : ''}</Col>
            </Row>
            <Row><Col><h5>{userData.Name+" "+userData.Surname}</h5></Col></Row>
            <Row>
            <Col>
                <Row>
                    <Col><p><b>E-mail</b> {userData.Email}</p></Col><Col><Form.Label style={{color : "orange"}}>Reported comments: {nrOfReports ? nrOfReports : 0}</Form.Label></Col>
                </Row>
                <Row>
                <Col>
                    
                    <Form.Label>Banned</Form.Label><br></br>
                    <Form.Label>Activated</Form.Label>
                </Col>
                <Col>
                    <Form.Check type={"checkbox"} disabled defaultChecked={userData.Banned}  id={`bannedCheck`} label={``}/>
                    <Form.Check type={"checkbox"} disabled defaultChecked={userData.Active} id={`activeCheck`} label={``}/>
                </Col>
            
                </Row>
            </Col>
            </Row>
        </article>
    );
}
 
export default UserItem;