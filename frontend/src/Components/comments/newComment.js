import { useEffect, useState } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";
import CommentService from "../../Services/commentService";

const NewComment = ({adId, callback, user}) => {

    const [message, setMessage] = useState("")

    const [rating, setRating] = useState(1)

    const sendComment = () => {
        
        let newComment = {
            ID: 0,
            Message: message,
            Rating: Number(rating),
            AdId: Number(adId),
            AuthorId: user.ID,
            AuthorUsername: user.Username,
        }

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        }

        CommentService.sendComment(requestOptions)
        callback(newComment)
        setMessage("")
    }

    useEffect(() => {
      setMessage(message)
    }, [message])
    

    return (  
       <div name="newComment">
           
            <Form>
                <Form.Group>
                    <Row>
                        <Col>
                        <Form.Label htmlFor="messageInput">New comment</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control className="float-right" style={{width : "100px", marginRight: "8pt"}} onChange={(event) => {setRating(event.target.value)}} as={"input"} type="number" min={1} max={5} placeholder="rating"></Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col>
                        <Form.Control id="messageInput" onChange={(event) => {setMessage(event.target.value)}} as={"textarea"} style={{width : "99%", resize : "none"}}></Form.Control>
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