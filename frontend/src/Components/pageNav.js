import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

const PageNav = ({pageNumbers, sendActiveCallback}) => {

    const [activePage, setActivePage] = useState(pageNumbers[0]-1)

    const [firstVisible, setFirstVisible] = useState(0)

    const [lastVisible, setLastVisible] = useState(6)

    useEffect(() => {
        sendActiveCallback(activePage)
    },[activePage])

    return (  
        <Pagination>
            <Pagination.First onClick={() => {setActivePage(pageNumbers[0]-1)}}/>
            <Pagination.Prev onClick={() => {setActivePage(activePage === 0 ? 0 : activePage-1)}}/>
            <Pagination.Item onClick={() => {
                if(firstVisible > 2){
                    setFirstVisible(firstVisible-3)
                    setLastVisible(lastVisible-3)
                }else{
                    setFirstVisible(0)
                    setLastVisible(6)
                }
            }}>&lt;</Pagination.Item>
            {pageNumbers.map(pageNr => {
                if(pageNr-1 >= firstVisible && pageNr-1 <= lastVisible)
                return  <Pagination.Item key={pageNr} active={activePage === pageNr-1} onClick={() => {setActivePage(pageNr-1)}}>{pageNr}</Pagination.Item>
            })}
            <Pagination.Item onClick={() => {
                 if(lastVisible < pageNumbers.length-3){
                    setFirstVisible(firstVisible+3)
                    setLastVisible(lastVisible+3)
                }else{ 
                    setFirstVisible(pageNumbers.length-7)
                    setLastVisible(pageNumbers.length-1)
                }
            }}>&gt;</Pagination.Item>
            <Pagination.Next onClick={() => {setActivePage(activePage === pageNumbers.length-1 ? pageNumbers.length-1 : activePage+1)}}/>
            <Pagination.Last onClick={() => {setActivePage(pageNumbers[pageNumbers.length-1]-1)}}/>
        </Pagination>
    );
}
 
export default PageNav;