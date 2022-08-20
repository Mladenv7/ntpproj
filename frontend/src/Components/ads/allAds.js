import {useEffect, useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AdService from '../../Services/adService'
import PageNav from '../pageNav'
import AdItem from './adItem'
import { useSearchParams } from 'react-router-dom';
import AdSearchForm from './adSearchForm'
  

const AllAds = () => {

    const [ads, setAds] = useState([])

    const [pageNumbers, setPageNumbers] = useState([])

    const [totalPages, setTotalPages] = useState([])

    const [urlParams, setUrlParams] = useSearchParams();

    const [bodyParams, setBodyParams] = useState({priceTo : 99999999, mileageTo : 99999999})

    const getPage = (pageNr) => {
        setUrlParams({page: String(pageNr)});
        AdService.getAdsPage(setAds, pageNr, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyParams)
        });
    }

    const getSearchResults = (searchData) => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchData)
        }
        setBodyParams(searchData)

        AdService.getAdsPage(setAds, 0, requestOptions)
        AdService.getTotalPages(setTotalPages, setPageNumbers, requestOptions)
    }

    useEffect(() => {
        AdService.getAdsPage(setAds, 0,  {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyParams)
        })
        AdService.getTotalPages(setTotalPages, setPageNumbers,  {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyParams)
        })
    }, [])

    return (  
        <div style={{height: "60vh"}}>
        
            <Row>
                <Col xs={9}>
                <div name="adArticles"  >
                    {ads.map(ad => {
                        return <AdItem key={ad.ID} adData={ad}/>
                    })}
                </div>
                </Col>
                <Col>
                    <AdSearchForm searchDataCallback={getSearchResults}/>
                </Col>
            </Row>
        
        <Container>
            <Row>
                <Col/>
                <Col>
                    {totalPages > 1 ? 
                        <PageNav pageNumbers={pageNumbers} sendActiveCallback={getPage}/> : ""
                    }
                </Col>
                <Col/>
            </Row>
        </Container>
        </div>
    );
}
 
export default AllAds;