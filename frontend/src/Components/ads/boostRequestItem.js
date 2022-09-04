import { Link } from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import AdService from '../../Services/adService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'


const BoostRequestItem = ({requestData, deleteCallback}) => {

    const [ad, setAd] = useState({})

    let requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    }

    const approveRequest = () => {
        ad.Boosted = true
        let requestOptionsAd = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ad)
        }
        
        AdService.updateAd(requestOptionsAd)
        AdService.deleteBoostRequest(requestOptions, requestData.AdId)
        
        deleteCallback()
        toast.success("Ad successfully boosted!")
    }

    const denyRequest = () => {
        AdService.deleteBoostRequest(requestOptions, requestData.AdId)
        deleteCallback()
        toast.success("Ad boost successfully denied!")
    }

    useEffect(() => {
        AdService.getSingleAd(requestData.AdId, setAd)
    }, [])
    

    return (  
        <article>
            <h4><Link to={"/ads/"+requestData.AdId}>Go to ad</Link></h4>
            <h5>{requestData.Username}</h5>
            <Form.Control as={"textarea"} style={{resize: "none", width: "95%"}} defaultValue={requestData.Request}></Form.Control><br></br>
            <Button variant='success' onClick={() => {approveRequest()}}>Approve</Button>&nbsp;
            <Button variant='danger' onClick={() => {denyRequest()}}>Deny</Button>
        </article>
    );
}
 
export default BoostRequestItem;