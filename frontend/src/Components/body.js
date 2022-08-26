import {Container} from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AllAds from "./ads/allAds";
import NewAd from "./ads/newAd";
import NewAds from "./ads/newAds";
import SingleAd from "./ads/singleAd";

const Body = () => {
    return ( 
        <Container style={{height: "70vh"}}>
            <Routes>
                <Route path='ads' element={<AllAds/>}/>
                <Route path='ads/:id' element={<SingleAd/>}/>
                <Route path='newAd' element={<NewAd/>}/>
                <Route path='newAds' element={<NewAds/>}/>
            </Routes>
        </Container>
    );
}
 
export default Body;