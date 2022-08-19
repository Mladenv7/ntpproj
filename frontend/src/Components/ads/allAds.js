import {useEffect, useState} from 'react'
import { Col, Container, Pagination, Row } from 'react-bootstrap'
import AdService from '../../Services/adService'
import PageNav from '../pageNav'
import AdItem from './adItem'
import { useSearchParams } from 'react-router-dom';
  

const AllAds = () => {

    const [ads, setAds] = useState([])

    const [pageNumbers, setPageNumbers] = useState([])

    const [totalPages, setTotalPages] = useState([])

    const [searchParams, setSearchParams] = useSearchParams();

    const getPage = (pageNr) => {
        setSearchParams({page: String(pageNr)});
        AdService.getAdsPage(setAds, pageNr);
    }

    useEffect(() => {
        AdService.getAdsPage(setAds, 0)
        AdService.getTotalPages(setTotalPages)
        setPageNumbers(Array(totalPages).fill().map((d, i) => i + 1))
    }, [])

    return (  
        <>
        <div name="adArticles">
            {ads.map(ad => {
                return <AdItem key={ad.ID} adData={ad}/>
            })}
        </div>

        <Container>
            <Row>
                <Col/>
                <Col>
                    {pageNumbers.length > 0 ? 
                        <PageNav pageNumbers={pageNumbers} sendActiveCallback={getPage}/> : ""
                    }
                </Col>
                <Col/>
            </Row>
        </Container>
        </>
    );
}
 
export default AllAds;