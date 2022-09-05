import { useEffect, useState } from 'react';
import ReportService from '../../Services/reportService';
import AdService from '../../Services/adService';
import AdItem from '../ads/adItem'



const MostVisited = () => {

    const [adsData, setAdsData] = useState([])

    const [visits, setVisits] = useState([])

    useEffect(() => {
        AdService.getAllAds(setAdsData)
        ReportService.getMostVisited(setVisits)
    }, [])
    

    return (  
        <>
        <h3>Most visited ads</h3>
        <div style={{height: "60vh", overflowY: "scroll", overflowX: "hidden"}}>
            {visits?.map(visit => {
                return <>
                    <AdItem key={visit[0]} adData={adsData.find(ad => ad.ID === visit[0])}/>
                    <hr></hr>
                    <h5># of visits {visit[1]}</h5>
                    <br></br>
                </>
            })}
        </div>
        </>
    );
}
 
export default MostVisited;