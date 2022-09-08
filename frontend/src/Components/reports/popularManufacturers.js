import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReportService from "../../Services/reportService";

const PopularManufacturers = () => {

    const [manufacturers, setManufacturers] = useState([])

    useEffect(() => {
        ReportService.getPopularManufacturers(setManufacturers)
    }, [])
    

    return (  
        <>
        <h3>Most popular manufacturers</h3>
        <div style={{height: "60vh", overflowY: "scroll", overflowX: "hidden"}}>
            <Table striped bordered hover >
                <thead>
                    <th>
                        Manufacturer
                    </th>
                    <th>
                        # of ads  
                    </th>
                </thead>
                <tbody>
                    {
                        manufacturers?.map(m => {
                            return <tr>
                                <td>{m[0]}</td><td>{m[1]}</td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
        </>
    );
}
 
export default PopularManufacturers;