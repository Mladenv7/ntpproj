import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import ReportService from '../../Services/reportService';

const WorstUsers = () => {

    const [userData, setUserData] = useState([])

    useEffect(() => {
        ReportService.getWorstUsers(setUserData)
    }, [])
    

    return (  
        <>
        <h4>Users with most reported comments</h4>
        <div style={{height: "60vh", overflowY: "scroll", overflowX: "hidden"}}>
            <Table striped bordered hover >
                <thead>
                <th>Username</th>
                <th># of reported comments</th>
                </thead>
                <tbody>
                    {userData?.map(user => {
                        return <tr><td>{user[0]}</td><td>{user[1]}</td></tr>
                    })}
                </tbody>
            </Table>
        </div>
        </>
    );
}
 
export default WorstUsers;