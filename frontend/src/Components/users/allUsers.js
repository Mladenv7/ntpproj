import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CommentService from "../../Services/commentService";
import UserService from "../../Services/userService";
import UserItem from "./userItem";

const AllUsers = () => {


    const [usersData, setUsersData] = useState([])

    const [nrReports, setNrReports] = useState([])


    const banUser = (email) => {

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(email)
        }

        UserService.banUser(requestOptions)

        let updatedUsers = JSON.parse(JSON.stringify(usersData))
        updatedUsers.filter(user => user.Email === email).map(user => {user.Banned = true; return user})
        setUsersData(updatedUsers)
    }

    useEffect(() => {
      UserService.getAllUsers(setUsersData)
      CommentService.getNrReported(setNrReports)
    }, [])
    

    return (  
        <>
        <Row>
        <Col xs={9}>
        <div style={{height: "60vh", overflowY: "scroll", overflowX: "hidden"}}>
            {
              usersData.map(user => {
                if(user.ID === UserService.getLoggedIn().ID){
                    return
                }
                return <UserItem key={user.Username} userData={user} nrOfReports={nrReports[user.Username]} banCallback={banUser}/>
              })
            }
        </div>
        </Col>
        <Col>
        
        </Col>
        </Row>
        </>
    );
}
 
export default AllUsers;