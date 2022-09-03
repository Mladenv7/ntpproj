import { Button, Col, Form, Row } from "react-bootstrap";

const UserItem = ({userData, nrOfReports, banCallback}) => {
    return (  
        <article>
            <Row><Col><h3>{userData.Username}</h3></Col>
                 <Col>{!userData.Banned ? <Button variant="danger" onClick={() => {banCallback(userData.Email)}}>Ban</Button> : ''}</Col>
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