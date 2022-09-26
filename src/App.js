
import './App.css';

import { BrowserRouter ,Route,Routes,Link} from 'react-router-dom';
import Register from './Components/Register';


import pic from "./images/kanini.webp";
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Job from './Components/Job/Job';
import ViewJob from './Components/Job/ViewJob';
import UpdateJob from './Components/Job/UpdateJob';

import Interview from './Components/InterviewLevel/AddInterview';

import { useState } from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Components/Sidebar';
import Candidate from './Components/Candidate/Candidate';
import Panel from './Components/Panel/Panel';
import ViewLevel from './Components/InterviewLevel/ViewLevel';
import UpdateLevel from './Components/InterviewLevel/UpdateLevel';
import ViewCandidate from './Components/Candidate/ViewCandidate';
import UpdateCandidate from './Components/Candidate/UpdateCandidate';
import ViewPanel from './Components/Panel/ViewPanel';
import UpdatePanel from './Components/Panel/UpdatePanel';
import CandidateAvailability from './Components/CandidateAvailability/CandidateAvailability';
import ViewCandidateAvailability from './Components/CandidateAvailability/ViewCandidateAvailability';
import UpdateCandidateAvailability from './Components/CandidateAvailability/UpdateCandidateAvailability';



 toast.configure();


function App() {
 const [log,setLog]=useState(localStorage.getItem('Loginsuccess'));
  const Logout=()=>{
    localStorage.removeItem('Loginsuccess');
    localStorage.removeItem('Registerstatus');
    localStorage.removeItem('Deletestatus');
    localStorage.removeItem('Updatestatus');
    localStorage.removeItem('Jobstatus');

    window.location.reload();
    window.location="/";
  }
  return (
    
    <div className="App">
    <BrowserRouter>
    
    <div className="App">
    <div className="nav">
      
      {!log &&(
        
        <>
         <ul>
                    <li className="logo"><img src={pic}></img></li>
                   
                    
                    
                   
                </ul>
        </>
       
      )}
      {log  &&(
        
        <>
         
           <ul>          
                    <li className="logo"><img src={pic}></img></li>
                  
                   
                    <Link to={"/"} className='logo1'><li className='logo2' onClick={Logout}>Logout</li>
                    </Link>
                    <li className='logo2' >Hello {localStorage.getItem('useremailid')} !</li>
                  
                   

                   
                </ul>
        </>
      )}
    
      </div>
                
            
     <Routes>
    
      <Route path="/register" element={<Register/>}></Route>
     
      <Route path='/' element={<Login/>}></Route>

      <Route path='/Dashboard' element={<Dashboard/>}></Route>

      <Route path='/addcandidate' element={<Candidate/>}></Route>
      <Route path='/viewpanel' element={<ViewPanel/>}></Route>
      <Route path='/panel' element={<Panel/>}></Route>
      <Route path='/updatepanel/:id' element={<UpdatePanel/>}></Route>





      <Route path='/side' element={<Sidebar/>}></Route>

      <Route path='/job' element={<Job/>}></Route>
      <Route path='/viewjob' element={<ViewJob/>}></Route>
      <Route path='/updatejob/:id' element={<UpdateJob/>}></Route>
      
      <Route path='/interview' element={<Interview/>}></Route>
      <Route path='/updatelevel/:id' element={<UpdateLevel/>}></Route>
      <Route path='/viewlevel' element={<ViewLevel/>}></Route>
      <Route path='/viewcandidate' element={<ViewCandidate/>}></Route>

      <Route path='/updatecandidate/:id' element={<UpdateCandidate/>}></Route>
      <Route path='/candidateavailability' element={<CandidateAvailability/>}></Route>
      <Route path='/viewcandidateavailability' element={<ViewCandidateAvailability/>}></Route>
      <Route path='/updatecandidateavailability/:id' element={<UpdateCandidateAvailability/>}></Route>



      




      
      
      
     </Routes>
        
     
     </div>
    
     
    </BrowserRouter>
    
    <footer class="footer" >
    <div className="footer-copyright text-center py-2">
       &copy;   InterviewScheduler
      
    </div>
                        {/* <center>
                            &nbsp;   &nbsp; &nbsp; &nbsp;  &copy;   InterviewScheduler

                        </center> */}

                    </footer>
                    
    </div>
    );

 }
 
 

export default App;
