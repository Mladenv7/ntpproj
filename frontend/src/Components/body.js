import {Container} from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AllAds from "./ads/allAds";
import MyAds from "./ads/myAds";
import NewAd from "./ads/newAd";
import NewAds from "./ads/newAds";
import ReportedAds from "./ads/reportedAds";
import SingleAd from "./ads/singleAd";
import ReportedComments from "./comments/reportedComments";
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
            </Routes>
        </Container>
    );
}
 
export default Body;