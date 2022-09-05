import { useEffect, useState } from 'react'
import ReportService from '../../Services/reportService'
import AdSubscribeCount from './adSubscribeCount'

const MostSubscribed = () => {

    const [adsData, setAdsData] = useState([])

    useEffect(() => {
        ReportService.getMostSubscribed(setAdsData)
    }, [])
    

    return (  
        <>
        <h4>Most currently subscribed ads</h4><br></br>
        <div style={{height: "60vh", overflowY: "scroll", overflowX: "hidden"}}>
            {
                adsData?.map(ad => {
                    return <><AdSubscribeCount key={ad.ID} adData={ad}/><br></br></>
                })
            }
        </div>
        </>
    );
}
 
export default MostSubscribed;