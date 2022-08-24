import { Button, Col, Container, Row } from "react-bootstrap";
import CommentService from "../../Services/commentService";

const CommentItem = ({commentData}) => {

    const reportComment = () => {
        commentData.Reported = true

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData)
        }

        CommentService.updateComment(requestOptions)
    }

    const deleteComment = () => {
        let requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        }

        CommentService.deleteComment(commentData.ID, requestOptions)
    }


    return (  
        <div name="commentItem">
            <Container>
            <Row>
                <Col>
                <p>By {commentData.AuthorUsername}</p>
                </Col>
                <Col>
                <p>Rating: {commentData.Rating}</p>
                </Col>
                <Col>
                {commentData.Reported ? 
                    <Button variant="danger" className="float-right" onClick={() => {deleteComment()}}>Delete</Button>
                : <Button variant="warning" className="float-right" onClick={() => {reportComment()}}>Report</Button>}
                </Col>
            </Row>
            </Container>
            
            <textarea defaultValue={commentData.Message} disabled style={{width : "99%", resize : "none"}}></textarea>
        </div>
    );
}
 
export default CommentItem;