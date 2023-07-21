import "./App.css";
import { useState, useEffect } from "react";
import Navbar from './components/Header/Navbar'
import Side from "./components/SideMenu/Side";
import PageContent from "./components/pages/PageContent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "./Context";
import Landing from './components/LandingPage/Landing';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ForgotPwd from "./components/ForgotPwd/ForgotPwd";
import Token from './components/Token/Token';
import Confirmation from './components/Confirmation/Confirmation'
import {RouteGuard} from './RouteGuard';
import { useLocation } from "react-router-dom";
import {Compile} from './Compile';
// import ParentChangePsw from './components/pages/SettingsPage/PopUps/ParentChangePsw';
import { ParentResetSuccess } from "./components/ResetPassword/ParentResetSuccess";
import ChangedPsw from "./components/pages/SettingsPage/PopUps/ChangedPsw";


function App() {
  const route  = useLocation()
  console.log(route, 'This')
  const [loggedIn, setLoggedIn] = useState(false);
  
  // const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (newPhoto) => {
    setPhoto(newPhoto);
  };



  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    if (token.join('').length === 4) {
      localStorage.setItem('token', token);
      setLoggedIn(true);
      toast.success('Login successful', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
  };

  const handleLogout = () => {
    console.log("logout")
    localStorage.removeItem('token');
    setLoggedIn(false);
    // Redirect the user to the login page
    window.location.href = '/login';
  };


  return (
    <div className="App">
      <Context>
      <ToastContainer />

     
      {/* {!['/login','/signup'].includes(route.pathname) && (<> <Navbar handleLogout={handleLogout}  photo={photo}/>   </>)} */}
      {!['/login','/signup', '/', '/token', '/forgotpwd', '/confirmation', '/settings/security/change-password', '/resetpassword'].includes(route.pathname) && (<> <Compile /> </>)}
      
      
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route exact path='/dashboard/*' element={<RouteGuard><Compile/></RouteGuard>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/forgotpwd" element={<ForgotPwd/>}/>
        <Route exact path="/token" element={<Token handleLogin={handleLogin}/>}/>
        <Route  path="/confirmation" element={<Confirmation/>}/>
        <Route exact path='/settings/security/change-password' element={<ChangedPsw/>}/>
        <Route  path="/resetpassword" element={<ParentResetSuccess/>}/>
        </Routes>
        
        </Context>
    </div>
       

  );
}

export default App;

// {loggedIn ? (
//   <Context>
//   <div className="App">
// <Navbar handleLogout={handleLogout}  photo={photo}/>
// <div className="sideandpage">
//   <Side />
//   <PageContent>
//   <Routes>
//   <Route exact path='/dashboard' element={<Dashboard/>}/>
//   <Route exact path='/loans' element={<LoanTab/>}/>
//   <Route exact path='/profile' element={<Profile/>}/>
//   <Route exact path='/messages/user' element={<UserMsg/>}/>
//   <Route exact path='/messages' element={<Messages/>}/>
//   <Route exact path='/notifications' element={<Notifications/>}/>
//   <Route exact path='/settings' element={<Settings/>}/>
//   <Route exact path='/clients' element={<Clients/>}/>
//   <Route exact path="/settings/profile" element={<ProfileSettings photo={photo}/>} />
//   <Route exact path="/reports" element={<Report/>} />
//   <Route
//     exact
//     path="/settings/userpermission"
//     element={<AllUserPermission/>}
//   />
//   <Route exact path="/settings/notification" element={<Notification/>} />
//   <Route exact path="/settings/security" element={<Security/>} />
//   <Route exact path='/support' element={<Support/>}/>
//   <Route exact path='/support/faq' element={<Faq/>}/>
//   <Route exact path='/loans/overview/general' element={<LoanOverview/>}/>
//   <Route exact path='/loans/overview/loan-contract' element={<LoansContract/>}/>
//   <Route exact path='/clients/overview/general' element={<Overview/>}/>
//   <Route exact path='/clients/overview/-details' element={<LoanDetails/>}/>
//   <Route exact path='/clients/overview/risk-score' element={<RiskScore/>}/>
//   <Route exact path='/clients/overview/documents' element={<Documents/>}/>
//   </Routes>
//   </PageContent>
// </div>
//  </div>
//  </Context>
// ):(
//   <Routes>
//   <Route exact path="/" element={<Landing/>}/>
//   <Route exact path="/login" element={<Login/>}/>
//   <Route exact path="/signup" element={<Signup/>}/>
//   <Route exact path="/forgotpwd" element={<ForgotPwd/>}/>
//   <Route exact path="/token" element={<Token handleLogin={handleLogin}/>}/>
//   <Route  path="/confirmation" element={<Confirmation/>}/>
//   </Routes>
//   )
// }