import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import UserService from "../../Services/userService";
import EmailService from "../../Services/emailService";


const RegistrationForm = () => {

    const [username, setUsername] = useState("")

    const [name, setName] = useState("")

    const [surname, setSurname] = useState("")

    const [password, setPassword] = useState("")

    const [repeatPassword, setRepeatPassword] = useState("")

    const [email, setEmail] = useState("")
    
    const [token, setToken] = useState("")

    const navigate = useNavigate()

    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Username : username,
            Name     : name,
            Surname  : surname,
            Password : password,
            Email    : email,
            Role : "Standard"
        })
    }

    const checkInputs = () => {
        let regex = new RegExp("[A-Za-z0-9]@[a-z]+\.[a-z]+");

        if(!password){toast.error("You need to provide a password!"); return false}
        if(password !== repeatPassword){toast.error("Passwords do not match!"); return false}
        if(!email || !regex.test(email)){toast.error("You need to provide an e-mail!"); return false}

        return true
    }

    const sendRegistrationData = () => {
        if(!checkInputs()) return

        toast.success("You have successfully registered!")
        toast.info("An email with activation link has been sent to your address.")

        UserService.generateActivationToken(email, setToken)
        UserService.registration(requestOptions)
        

        setTimeout(() => {
            navigate("/ads")
        }, 3000);
    }

    useEffect(() => {
        console.log(token);
        sendActivationEmail(token)
    }, [token])
    

    const sendActivationEmail = (token) => 
    {
        EmailService.sendEmailWithLink({
            method: "POST",
            headers: {},
            body: JSON.stringify({
                From    : "ntpproj.com",
                To      : email,
                Subject : "Activation link",
                Message : "To activate your account, follow ",
                Link : "http://localhost:3000/activation?token="+ token,
            })
        })
    }

    return (  
        <Container style={{width : "15vw"}}>
            <Row>
                <Col/>
                <Col>
                <h3 className="text-center">Registration</h3>
                </Col>
                <Col/>
            </Row>
            <Form>
                <Row>
                <Form.Control as={"input"} type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}}></Form.Control>
                </Row><br></br>
                <Row>
                <Form.Control as={"input"} type="text" placeholder="Name" onChange={(event) => {setName(event.target.value)}}></Form.Control>
                </Row><br></br>
                <Row>
                <Form.Control as={"input"} type="text" placeholder="Surname" onChange={(event) => {setSurname(event.target.value)}}></Form.Control>
                </Row><br></br>
                <Row>
                <Form.Control as={"input"} type="email" placeholder="E-mail" onChange={(event) => {setEmail(event.target.value)}}></Form.Control>
                </Row><br></br>
                <Row>
                <Form.Control as={"input"} type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}></Form.Control>
                </Row><br></br>
                <Row>
                <Form.Control as={"input"} type="password" placeholder="Repeat password" onChange={(event) => {setRepeatPassword(event.target.value)}}></Form.Control>
                </Row><br></br>
                <Row>
                    <Col/>
                    <Col xs={5}>   
                        <Button style={{width : "100%"}} onClick={() => {sendRegistrationData()}}>
                            Submit
                        </Button>
                    </Col>
                    <Col/>
                </Row>
            </Form>
            <ToastContainer autoClose={1000}/>
        </Container>
    );
}
 
export default RegistrationForm;