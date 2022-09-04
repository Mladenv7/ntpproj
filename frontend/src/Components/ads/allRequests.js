import { useEffect, useState } from "react";
import AdService from "../../Services/adService";
import BoostRequestItem from "./boostRequestItem";

const AllRequests = () => {

    const [requestsData, setRequestsData] = useState([])
    
    useEffect(() => {
        AdService.getAllBoostRequests(setRequestsData)
    }, [])
    

    return ( 
        <div style={{height: "60vh", overflowY: "scroll", overflowX: "hidden"}}> 
            {requestsData?.map(request => {
                return <BoostRequestItem requestData={request} deleteCallback={() => {AdService.getAllBoostRequests(setRequestsData)}}/>
            })}
        </div>
    );
}
 
export default AllRequests;