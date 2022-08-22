import { Button, Col, Row } from "react-bootstrap";
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
            <Row>
                <Col>
                <p>By {commentData.AuthorUsername}</p>
                </Col>
                <Col>
                <p>Rating: {commentData.Rating}</p>
                </Col>
                <Col>
                {commentData.Reported ? 
                    <Button variant="danger" onClick={() => {deleteComment()}}>Delete</Button>
                : <Button variant="warning" onClick={() => {reportComment()}}>Report</Button>}
                </Col>
            </Row>
            <textarea defaultValue={commentData.Message} disabled style={{width : "95%", resize : "none"}}></textarea>
        </div>
    );
}
 
export default CommentItem;