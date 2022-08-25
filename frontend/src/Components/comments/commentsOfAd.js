import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CommentService from "../../Services/commentService";
import UserService from "../../Services/userService";
import CommentItem from "./commentItem";
import NewComment from "./newComment";

const CommentsOfAd = ({adId}) => {

    const [user, setUser] = useState(UserService.getLoggedIn())

    const [commentsData, setCommentsData] = useState([])

    const refreshComments = (newComment) => {
        setCommentsData([...commentsData, newComment])
    }

    useEffect(() => {
      CommentService.getCommentsOfAd(adId, setCommentsData)
    }, [])


    useEffect(() => {
        setCommentsData(commentsData)
    }, [commentsData])
    
    

    return (  
        <div name="comments">
            {
                commentsData.map(comment => {
                    return <CommentItem key={comment.ID} comment={comment} user={user}/>
                })
            }
            {user.Role === 'Standard' ?
            <NewComment adId={adId} user={user} callback={refreshComments}/>    
            : ''}
        </div>
    );
}
 
export default CommentsOfAd;