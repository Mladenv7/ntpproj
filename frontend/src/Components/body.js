import {Container} from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AllAds from "./ads/allAds";
import NewAd from "./ads/newAd";
import SingleAd from "./ads/singleAd";

const Body = () => {
    return ( 
        <Container style={{height: "70vh"}}>
            <Routes>
                <Route path='ads' element={<AllAds/>}/>
                <Route path='ads/:id' element={<SingleAd/>}/>
                <Route path='newAd' element={<NewAd/>}/>
            </Routes>
        </Container>
    );
}
 
export default Body;