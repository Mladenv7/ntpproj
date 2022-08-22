import { useState } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";
import CommentService from "../../Services/commentService";

const NewComment = ({adId}) => {

    const [message, setMessage] = useState("")

    const [rating, setRating] = useState(1)

    const sendComment = () => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Message: message,
                Rating: Number(rating),
                AdId: Number(adId),
            })
        }

        CommentService.sendComment(requestOptions)
    }

    return (  
       <div name="newComment">
           
            <Form>
                <Form.Group>
                    <Row>
                        <Col>
                        <Form.Label htmlFor="messageInput">New comment</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control onChange={(event) => {setRating(event.target.value)}} as={"input"} type="number" min={1} max={5} placeholder="rating"></Form.Control>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col>
                        <Form.Control id="messageInput" onChange={(event) => {setMessage(event.target.value)}} as={"textarea"} style={{width : "95%", resize : "none"}}></Form.Control>
                        </Col>
                    </Row><br></br>
                    <Row>
                        <Col>
                            <Button variant="success" onClick={() => {sendComment()}}>
                                Add comment
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
            
       </div>
    );
}
 
export default NewComment;