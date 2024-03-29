import {Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import UserService from "../../Services/userService";

const LoginForm = () => {

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const [token, setToken] = useState("")

    let requestOptions = {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Email : email,
            Password : password
        })
    }

    const sendCredentials = () => {
        UserService.login(requestOptions, setToken)
    }

    useEffect(() => {
        if(token && token !== "Wrong credentials"){
            UserService.getUserFromToken(token)
            setTimeout(() => {
                let user = UserService.getLoggedIn()

                if(user.Banned){
                    toast.error("You are banned!")
                    return
                }
                if(!user.Active){
                    toast.info("This account is not active yet, please check your e-mail.")
                    return
                }

                navigate("/ads")
            }, 1000);
        }else if(token === "Wrong credentials"){
            toast.error("Wrong credentials!")
        }
    }, [token])
    

    return (  
        <Container style={{width : "15vw"}}>
            <Row>
                <Col/>
                <Col>
                <h3 className="text-center">Login</h3>
                </Col>
                <Col/>
            </Row>
            <Form>
                <Row>
                <Form.Control as={"input"} type="email" placeholder="E-mail" onChange={(event) => {setEmail(event.target.value)}}></Form.Control>
                </Row><br></br>
                <Row>
                <Form.Control as={"input"} type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}></Form.Control>
                </Row><br></br>
                <Row>
                    <Col/>
                    <Col xs={5}>   
                        <Button style={{width : "100%"}} onClick={() => {sendCredentials()}}>
                            Log in
                        </Button>
                    </Col>
                    <Col/>
                </Row><br></br>
                <Row>
                    <Col/>
                    <Col xs={9}>
                    <Link to={"/register"}>No account? Register here</Link>
                    </Col>
                    <Col/>
                </Row>
            </Form>
            <ToastContainer autoClose={1000}/>
        </Container>
    );
}
 
export default LoginForm;