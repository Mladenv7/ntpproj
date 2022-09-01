import {useEffect, useState} from 'react'
import AdService from "../../Services/adService";
import UserService from "../../Services/userService";
import CommentService from "../../Services/commentService";
import CommentItem from "../comments/commentItem"
import { Link } from 'react-router-dom';

const ReportedComments = () => {

    const [commentsData, setCommentsData] = useState([])

    const [adsData, setAdsData] = useState([])

    const [user, setUser] = useState(UserService.getLoggedIn())


    useEffect(() => {
        AdService.getAllAds(setAdsData)
        CommentService.getAllComments(setCommentsData)
    }, [])
    

    return (  
        <div style={{height: "60vh", overflowY: "scroll", overflowX: "hidden"}}>
            {
                commentsData?.map(comment => 
                    comment.Reported ? 
                    <>
                    <h4><Link to={"/ads/"+comment.AdId}>Go to ad</Link></h4>
                    <CommentItem key={comment.ID} comment={comment} user={user}/>
                    </>
                    : ''
                )
            }
        </div>
    );
}
 
export default ReportedComments;