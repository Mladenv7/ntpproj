import {Container} from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AllAds from "./ads/allAds";
import AllRequests from "./ads/allRequests";
import MyAds from "./ads/myAds";
import NewAd from "./ads/newAd";
import NewAds from "./ads/newAds";
import ReportedAds from "./ads/reportedAds";
import SingleAd from "./ads/singleAd";
import ReportedComments from "./comments/reportedComments";
import MostSubscribed from "./reports/mostSubscribed";
import MostVisited from "./reports/mostVisited";
import PopularManufacturers from "./reports/popularManufacturers";
import WorstUsers from "./reports/worstUsers";
import AllUsers from "./users/allUsers";


const Body = () => {
    return ( 
        <Container style={{height: "70vh"}}>
            <Routes>
                <Route path='ads' element={<AllAds/>}/>
                <Route path='ads/:id' element={<SingleAd/>}/>
                <Route path='newAd' element={<NewAd/>}/>
                <Route path='newAds' element={<NewAds/>}/>
                <Route path='reportedAds' element={<ReportedAds/>}/>
                <Route path='reportedComments' element={<ReportedComments/>}/>
                <Route path='myAds' element={<MyAds/>}/>
                <Route path='allUsers' element={<AllUsers/>}/>
                <Route path="allRequests" element={<AllRequests/>}/>
                <Route path="worstUsers" element={<WorstUsers/>}/>
                <Route path='mostSubscribed' element={<MostSubscribed/>}/>
                <Route path='mostVisited' element={<MostVisited/>}/>
                <Route path='popularManufacturers' element={<PopularManufacturers/>}/>
            </Routes>
        </Container>
    );
}
 
export default Body;