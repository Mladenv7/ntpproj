import {Container} from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AllAds from "./ads/allAds";
import SingleAd from "./ads/singleAd";

const Body = () => {
    return ( 
        <Container style={{height: "70vh"}}>
            <Routes>
                <Route path='ads' element={<AllAds/>}/>
                <Route path='ads/:id' element={<SingleAd/>}/>
            </Routes>
        </Container>
    );
}
 
export default Body;