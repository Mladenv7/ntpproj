import { useEffect, useState } from "react";
import { Button, Col, Form, FormLabel, Row, Stack } from "react-bootstrap";

const AdSearchForm = ({searchDataCallback}) => {

    const [priceFrom, setPriceFrom] = useState()

    const [priceTo, setPriceTo] = useState(99999999)

    const [mileageFrom, setMileageFrom] = useState()

    const [mileageTo, setMileageTo] = useState(99999999)

    const [description, setDescription] = useState()

    const [sort, setSort] = useState()

    useEffect(() => {
        if(mileageTo === 0) setMileageTo(99999999)
        if(priceTo === 0) setPriceTo(99999999)
    }, [mileageTo, priceTo])
    
 
    return ( 
        <Stack>
            <FormLabel>Mileage&nbsp;</FormLabel>
            <Row>
                <Col>
                    <Form.Control className="me-auto" type='number' min={0} placeholder="From" onChange={(event) => {setMileageFrom(Number(event.target.value))}}/><br></br>
                </Col>
                <Col>
                    <Form.Control className="me-auto" type='number' min={0} placeholder="To" onChange={(event) => {setMileageTo(Number(event.target.value))}}/><br></br>
                </Col>
            </Row>
            <FormLabel>Asking price&nbsp;</FormLabel>
            <Row>
                <Col>
                    <Form.Control className="me-auto" type='number' min={0} placeholder="From" onChange={(event) => {setPriceFrom(Number(event.target.value))}}/><br></br>
                </Col>
                <Col>
                    <Form.Control className="me-auto" type='number' min={0} placeholder="To" onChange={(event) => {setPriceTo(Number(event.target.value))}}/><br></br>
                </Col>
            </Row>
            <Form.Control className="me-auto" placeholder="Description" onChange={(event) => {setDescription(event.target.value)}}/><br></br>
            <Row>
                <Col>
                    <FormLabel>Sort&nbsp;</FormLabel>
                </Col>
                <Col>
                    <Form.Select aria-label="Default select example" onChange={(event) => {setSort(event.target.value)}}>
                    <option value={""}>Clear sort</option>
                    <option value={"mileage"}>By mileage</option>
                    <option value={"asking_price"}>By price</option>
                    </Form.Select>
                </Col>
            </Row><br></br>
            <Button style={{width : "100%"}} onClick={() => {
                searchDataCallback({
                    PriceFrom : priceFrom,
                    PriceTo : priceTo,
                    MileageFrom : mileageFrom,
                    MileageTo : mileageTo,
                    Description : description,
                    Sort : sort
                })
            }}>Apply filter</Button>
        </Stack>
    );
}
 
export default AdSearchForm;