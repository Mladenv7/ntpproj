import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CommentService from "../../Services/commentService";

const CommentItem = ({comment, user}) => {

    const [commentData, setCommentData] = useState(comment)

    useEffect(() => {
      setCommentData(commentData)
    }, [commentData])
    

    const reportComment = () => {
        commentData.Reported = true
        setCommentData(JSON.parse(JSON.stringify(commentData)))

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData)
        }

        CommentService.updateComment(requestOptions)
    }

    const deleteComment = () => {
        commentData.DeletedAt = true
        setCommentData(JSON.parse(JSON.stringify(commentData)))

        let requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        }

        CommentService.deleteComment(commentData.ID, requestOptions)
    }


    return (  
        <>
        {!commentData.DeletedAt ?
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
                {commentData.Reported && user.Role === 'Administrator' ? 
                    <Button variant="danger" className="float-right" onClick={() => {deleteComment()}}>Delete</Button>
                : ''}
                {!commentData.Reported && user.Role === 'Standard' && user.ID !== commentData.AuthorId ? 
                    <Button variant="warning" className="float-right" onClick={() => {reportComment()}}>Report</Button>
                : ''}
                {commentData.Reported && user.Role === 'Standard' ? 
                     <p style={{color:"red"}}>This comment has been reported.</p>
                : ''}
                </Col>
            </Row>
            </Container>
            
            <textarea defaultValue={commentData.Message} disabled style={{width : "99%", resize : "none"}}></textarea>
        </div>
        : ''}
        </>
    );
}
 
export default CommentItem;