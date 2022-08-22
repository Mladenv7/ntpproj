import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CommentService from "../../Services/commentService";
import CommentItem from "./commentItem";
import NewComment from "./newComment";

const CommentsOfAd = ({adId}) => {

    const [commentsData, setCommentsData] = useState([])

    useEffect(() => {
      CommentService.getCommentsOfAd(adId, setCommentsData)
    }, [])
    

    return (  
        <div name="comments">
            {
                commentsData.map(comment => {
                    return <CommentItem key={comment.ID} commentData={comment}/>
                })
            }
            <NewComment adId={adId}/>
        </div>
    );
}
 
export default CommentsOfAd;