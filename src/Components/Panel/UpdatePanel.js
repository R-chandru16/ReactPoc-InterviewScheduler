import axios from 'axios';
import React, { useState,useEffect } from "react";
import Sidebar from '../Sidebar';
import './../Job/Job.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from "react-router-dom";
// import swal from 'sweetalert';

function UpdatePanel(){
    const Job_Baseurl="https://localhost:44348/api/Jobs";
    const Panel_Baseurl="https://localhost:44348/api/Panel";


    const [levellist, setLevellist] = useState([]);
    const [joblist, setJoblist] = useState([]);
    const [selectedLevelId, setselectedLevelId] = useState(0);
    const [selectedJobId, setselectedJobId] = useState(0);




    const [panelInput, setPanel] = useState({
        name : '',
        email: '',

        mobileno : '',
        LevelId : 0,
        JobId : 0


    });

    // const [errorlist, setError]=useState([]);

    const handleInput = (e) => {
        e.persist();
        setPanel({...panelInput, [e.target.name]:e.target.value});

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

    useEffect(()=>{
        axios.get(Job_Baseurl + `/GetAllInterviewLevels` ).then(res=>{
           // if(res.data.status===200){
                console.log(res.data);

                setLevellist(res.data);

           // }
        })
    },[]);

    const {id} = useParams();

    useEffect(()=>{
        axios.get(Job_Baseurl + `/GetAllJobs` ).then(res=>{
           // if(res.data.status===200){
                console.log(res.data);

                setJoblist(res.data);

           // }
        })

        axios.get(Panel_Baseurl + `/GetPanelById/${id}`).then(res=>{
            //if(res.data.status===200){
                console.log(res.data);
                setPanel(res.data);
                //alert("Candidate Updated Successfully");
            //}
           });

    },[]);
        
   

    const updatePanel = () => {
     // debugger;
       // e.persist();
       
        // const data = {
        //     name: panelInput.name,
        //     email: panelInput.email,

        //     mobileno: panelInput.mobileno,
        //     LevelId: selectedLevelId,
        //     JobId: selectedJobId,

        // }

        // console.log(data);

       // debugger;
        axios.put(Panel_Baseurl + `/UpdatePanel/${id}`, panelInput).then(res => {
         // debugger;
            if(res?.data?.status === 200){
                console.log(res.data);
                window.location="/viewpanel";

                alert("Panel added Successfully!");
                setselectedLevelId(null);
                setselectedJobId(null);
           }
            else{
                alert("Something went wrong!");
            }
        }).catch((err)=>{
            console.log(err)
        })


    }

    return(
        <div>
               <div class="side">
        <Sidebar />
    </div>
        <form className="addformjob" encType="multipart/form-data">
            <h2><strong>Update Panel</strong></h2>
    
          {/* <br></br> */}
            <label >Name</label>
            <input  id="name" type="text"  name="name" onChange={handleInput} value={panelInput.name} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.name}</div> */}
            <br></br>

        
            <label >Email</label>
            <input  id="email" type="text"  name="email" onChange={handleInput} value={panelInput.email} required="true" ></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.email}</div> */}
            <br></br>

            <label >Mobile No.</label>
            <input  id="mobileno" type="text"  name="mobileno" onChange={handleInput} value={panelInput.mobileno} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.mobileno}</div> */}
            <br></br>

            <label >Level</label>         
            <select name="LevelId" onChange={(e)=>handleLevelId(e)} value={panelInput.levelId} required="true" >
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

{/* <input  id="level_id" type="number"  name="level_id"  >1</input><br></br> */}

            {/* <div className="errorMsgJob">{errorlist.level_id}</div> */}
            <br></br>
            <br></br>

            <label >Job Role</label>
            <select name="JobId" onChange={(e)=>handleJobId(e)} value={panelInput.jobId} required="true">
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
    {/* </div> */}

            <button id="jobb" className="btn btn-success" type="submit" onClick={()=>updatePanel()}>Update</button>
            <br></br>
            <br></br>
            {/* <Link to={'/addcandidate'}><button className="btn btn-outline-dark" type="submit" >Back</button>
        </Link>  */}
            <br></br>

            <Link to={'/panel'}><button className="btn btn-outline-dark" type="submit" onClick={()=>{window.location='/viewpanel'}}>Back</button>
            </Link> 
                <br></br>
         
        </form>
    </div>
    )
}
  
export default UpdatePanel;

