import Footer from "../Components/footer";
import Header from "../Components/header";
import Body from "../Components/body";
import Container from 'react-bootstrap/Container';

const BaseLayout = () => {
    return (  
        <>
        <Header/> 
        <Body/>
        <Footer/>
        </>
    );
}
 
export default BaseLayout;