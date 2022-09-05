import {Route, Routes} from 'react-router-dom'
import AllAds from './Components/ads/allAds';
import AllRequests from './Components/ads/allRequests';
import MyAds from './Components/ads/myAds';
import NewAd from './Components/ads/newAd';
import NewAds from './Components/ads/newAds';
import ReportedAds from './Components/ads/reportedAds';
import SingleAd from './Components/ads/singleAd';
import ReportedComments from './Components/comments/reportedComments';
import MostSubscribed from './Components/reports/mostSubscribed';
import MostVisited from './Components/reports/mostVisited';
import PopularManufacturers from './Components/reports/popularManufacturers';
import WorstUsers from './Components/reports/worstUsers';
import AllUsers from './Components/users/allUsers';
import BasePage from './Pages/basePage'
import LoginPage from './Pages/loginPage'
import RegistrationPage from './Pages/registrationPage';

const App = () => {
    return (  
        <div>
            <Routes>
                <Route path='*' element={<BasePage/>}>
                    <Route path='ads' element={<AllAds/>}/>
                    <Route path='ads/:id' element={<SingleAd/>}/>
                    <Route path='newAd' element={<NewAd/>}/>
                    <Route path='newAds' element={<NewAds/>}/>
                    <Route path='reportedAds' element={<ReportedAds/>}/>
                    <Route path='reportedComments' element={<ReportedComments/>}/>
                    <Route path='myAds' element={<MyAds/>}/>
                    <Route path='allUsers' element={<AllUsers/>}/>
                    <Route path="allRequests" element={<AllRequests/>}/>
                    <Route path="worstUsers" element={<WorstUsers/>}/>
                    <Route path='mostSubscribed' element={<MostSubscribed/>}/>
                    <Route path='mostVisited' element={<MostVisited/>}/>
                    <Route path='popularManufacturers' element={<PopularManufacturers/>}/>
                </Route>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegistrationPage/>}/>
            </Routes>
        </div>
    );
}
 
export default App;