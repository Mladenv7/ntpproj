import { useEffect, useState } from "react";
import AdService from "../../Services/adService";
import AdItem from "./adItem";

const BoostedAds = () => {

    const [boostedAdsData, setBoostedAdsData] = useState([])

    useEffect(() => {
        AdService.getBoostedAds(setBoostedAdsData)
    }, [])
    

    return ( 
        <div name="boostedAds" style={{height: "20vh", overflowY: "scroll", overflowX: "hidden"}}>
            {
                boostedAdsData?.map(ad => 
                    <AdItem key={ad.ID} color="lightblue" adData={ad}/>    
                )
            }
        </div>
    );
}
 
export default BoostedAds;