import {Route, Routes} from 'react-router-dom'
import AllAds from './Components/ads/allAds';
import NewAd from './Components/ads/newAd';
import NewAds from './Components/ads/newAds';
import ReportedAds from './Components/ads/reportedAds';
import SingleAd from './Components/ads/singleAd';
import ReportedComments from './Components/comments/reportedComments';
import BasePage from './Pages/basePage'
import LoginPage from './Pages/loginPage'

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
                </Route>
                <Route path='/login' element={<LoginPage/>}/>
            </Routes>
        </div>
    );
}
 
export default App;