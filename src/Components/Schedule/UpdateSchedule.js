import axios from 'axios';
import React, { useState,useEffect } from "react";
import Sidebar from '../Sidebar';
import './../Job/Job.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from "react-router-dom";
// import swal from 'sweetalert';

function UpdateSchedule(){

    const Schedule_Baseurl="https://localhost:44348/api/Schedule";
    const Job_Baseurl="https://localhost:44348/api/Jobs";
    const Candidate_Baseurl="https://localhost:44348/api/Candidate";
    const Panel_Baseurl="https://localhost:44348/api/Panel";



    const [levellist, setLevellist] = useState([]);
    const [joblist, setJoblist] = useState([]);
    const [candidateavailabilitylist, setCandidatelist] = useState([]);
    const [panelavailabilitylist, setPanelList] = useState([]);
    const [selectedLevelId, setselectedLevelId] = useState(0);
    const [selectedJobId, setselectedJobId] = useState(0); 
    const [selectedCandidateId, setselectedCandidateId] = useState(0);
    const [selectedPanelId, setselectedPanelId] = useState(0);




    const [scheduleInput, setSchedule] = useState({
        candidateId : 0,
        panelId : 0,
        levelId : 0,
        jobId : 0,
        date : '',
        timeFrom: '',
        timeTo : '',
    

    });

    // const [errorlist, setError]=useState([]);

    const handleInput = (e) => {
        e.persist();
        setSchedule({...scheduleInput, [e.target.name]:e.target.value});

    }

    const handleLevelId = (e) => {
      e.persist();
      setselectedLevelId(Number(e.target.value));
      console.log(e.target.value);

  }

  const handleJobId = (e) => {
    e.persist();
    setselectedJobId(Number(e.target.value));
    console.log(e.target.value);


}

const handleCandidateId = (e) => {
  e.persist();
  setselectedCandidateId(Number(e.target.value));
  console.log(e.target.value);

}

const handlePanelId = (e) => {
  e.persist();
  setselectedPanelId(Number(e.target.value));
  console.log(e.target.value);

}



    useEffect(()=>{
        axios.get(Job_Baseurl + `/GetAllInterviewLevels` ).then(res=>{
           // if(res.data.status===200){
                console.log(res.data);

                setLevellist(res.data);

           // }
        })
    },[]);

    useEffect(()=>{
        axios.get(Job_Baseurl + `/GetAllJobs` ).then(res=>{
           // if(res.data.status===200){
                console.log(res.data);

                setJoblist(res.data);

           // }
        })
    },[]);

    useEffect(()=>{
      axios.get(Candidate_Baseurl + `/GetAllCandidates` ).then(res=>{
         // if(res.data.status===200){
              console.log(res.data);

              setCandidatelist(res.data);

         // }
      })
  },[]);

  const {id} = useParams();

  useEffect(()=>{
    axios.get(Panel_Baseurl + `/GetAllPanels` ).then(res=>{
       // if(res.data.status===200){
            console.log(res.data);

            setPanelList(res.data);

       // }
    })

    axios.get(Schedule_Baseurl + `/GetScheduleById/${id}`).then(res=>{
        //if(res.data.status===200){
            //console.log(res.data);
            setSchedule(res.data);
            //alert("Candidate Updated Successfully");
        //}
       });

},[]);



    const updateSchedule = (e) => {
     // debugger;
       // e.persist();
        console.log(Schedule_Baseurl + `/AddSchedule`);

       
       // debugger;
        axios.put(`https://localhost:44348/api/Panel/UpdateSchedule/${id}`, scheduleInput).then(res => {
         // debugger;
            // if(res?.data?.status === 200){
                window.location="/viewschedule";

                alert("Interview Schedule updated Successfully!");
                setselectedLevelId(null);
                setselectedJobId(null);
                setselectedCandidateId(null);
                setselectedPanelId(null);

          //  }
          //   else{
          //       alert("Something went wrong!");
          //   }
        }).catch((err)=>{
            console.log(err)
        })


    }

    return(
        <div>
               <div class="side">
        <Sidebar />
    </div>
    {/* <div class="row"> */}

        <form className="addformjob" onSubmit={updateSchedule} encType="multipart/form-data">

            <h2><strong>Update Interview Schedule</strong></h2>

            <div class="column">
          {/* <br></br> */}
          <label >Candidate Name</label>         
            <select name="candidateId" onChange={(e)=>handleCandidateId(e)} value={scheduleInput.candidateId} required="true" >
              <option>
                  Select Candidate Name
              </option>
              {
                candidateavailabilitylist.map((item)=>{
                  return(
                    <option value={item.id} key={item.id}>{item.name}</option>
                  )
                })
              }
            </select>
            <br></br>
            <br></br>

            <label >Panel Name</label>         
            <select name="panelId" onChange={(e)=>handlePanelId(e)} value={scheduleInput.panelId} required="true" >
              <option>
                  Select Panel Name
              </option>
              {
                panelavailabilitylist.map((item)=>{
                  return(
                    <option value={item.id} key={item.id}>{item.name}</option>
                  )
                })
              }
            </select>
            <br></br>
            <br></br>

            <label >Level</label>         
            <select name="LevelId" onChange={(e)=>handleLevelId(e)} value={scheduleInput.levelId} required="true" >
              <option>
                  Select Level
              </option>
              {
                levellist.map((item)=>{
                  return(
                    <option value={item.id} key={item.id}>{item.level}</option>
                  )
                })
              }
            </select>


            {/* <div className="errorMsgJob">{errorlist.level_id}</div> */}
            <br></br>
            <br></br>

            <label >Job Role</label>
            <select name="JobId" onChange={(e)=>handleJobId(e)} value={scheduleInput.jobId} required="true">
              <option>
                  Select Job Role
              </option>
              {
                joblist.map((item)=>{
                  return(
                    <option value={item.id} key={item.id}>{item.jobRole}</option>
                  )
                })
              }
            </select>

            <br></br>
            <br></br>

            <label >Date</label>
            <input  id="date" type="date"  name="date" onChange={handleInput} value={scheduleInput.date} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.dob}</div> */}
            <br></br>

            <label >Time From</label>
            <input  id="timeFrom" type="time"  name="timeFrom" onChange={handleInput} value={scheduleInput.timeFrom} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.address}</div> */}
            <br></br>

            <label >Time To</label>
            <input  id="timeTo" type="time"  name="timeTo" onChange={handleInput} value={scheduleInput.timeTo} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.mobileno}</div> */}
            <br></br>

           
            <br></br>
    {/* </div> */}
    </div>
            <button id="jobb" className="btn btn-success" type="submit" onClick={()=>updateSchedule}>Create</button>
            <br></br>
            <br></br>
            {/* <Link to={'/addcandidate'}><button className="btn btn-outline-dark" type="submit" >Back</button>
        </Link>  */}
            <br></br>

            <Link to={'/schedule'}><button className="btn btn-outline-dark" type="submit" onClick={()=>{window.location='/viewschedule'}}>Back</button>
            </Link> 
                <br></br>
         
        </form>
        {/* </div> */}

    </div>
    )
}

         
 
  

    
    
export default UpdateSchedule;

