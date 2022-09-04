import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AdService from "../../Services/adService";
import UserService from "../../Services/userService";
import AdItem from "./adItem";
import AdSearchForm from "./adSearchForm";

const MyAds = () => {

    const [ads, setAds] = useState([])

    const [filteredAds, setFilteredAds] = useState([])

    const [user, setUser] = useState(UserService.getLoggedIn())

    useEffect(() => {
      AdService.getAllAds(setAds)
      AdService.getAllAds(setFilteredAds)
    }, [])
    
    const filterAds = (filterData) => {
      console.log(filterData);
      setFilteredAds(ads.filter(ad => {

        
        return (ad.AskingPrice >= filterData.PriceFrom && ad.AskingPrice <= filterData.PriceTo || ad.AskingPrice >= filterData.PriceFrom || ad.AskingPrice <= filterData.PriceTo) &&
               (ad.Mileage >= filterData.MileageFrom && ad.Mileage <= filterData.MileageTo || ad.Mileage >= filterData.MileageFrom || ad.Mileage <= filterData.MileageTo) &&
               (ad.Description.includes(filterData.Description) || !filterData.Description)
      }))
    }

    return ( 
        <Row>
        <Col xs={9}>
        <div style={{height: "60vh", overflowY: "scroll", overflowX: "hidden"}}>
            {
              filteredAds.map(ad => user.ID === ad.AuthorId ? <AdItem  key={ad.ID} adData={ad} /> : '')
            }
        </div>
        </Col>
        <Col>
        <AdSearchForm searchDataCallback={filterAds}/>
        </Col>
        </Row>
    );
}
 
export default MyAds;