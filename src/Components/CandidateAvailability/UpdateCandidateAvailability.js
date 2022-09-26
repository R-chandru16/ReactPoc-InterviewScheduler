import axios from 'axios';
import React, { useState,useEffect } from "react";
import Sidebar from '../Sidebar';
import './../Job/Job.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from "react-router-dom";
// import swal from 'sweetalert';

function UpdateCandidateAvailability(){
    const Candidate_Baseurl="https://localhost:44348/api/Candidate";


    const [candidateavailabilitylist, setCandidatelist] = useState([]);
    const [selectedCandidateId, setselectedCandidateId] = useState(0);

    
    const [candidateAvailabilityInput, setCandidateAvailability] = useState({
        candidateId : 0,
        availableDate : '',
        availableTimeFrom : '',
        availableTimeTo : '',
        


    });

    // const [errorlist, setError]=useState([]);

    const handleInput = (e) => {
        e.persist();
        setCandidateAvailability({...candidateAvailabilityInput, [e.target.name]:e.target.value});

    }

    const handleCandidateId = (e) => {
      e.persist();
      setselectedCandidateId(Number(e.target.value));
      console.log(e.target.value);

  }

  const {id} = useParams();
  
    useEffect(()=>{
        axios.get(Candidate_Baseurl + `/GetAllCandidates` ).then(res=>{
           // if(res.data.status===200){
                console.log(res.data);

                setCandidatelist(res.data);

           // }
        })

        axios.get(Candidate_Baseurl + `/GetCandidateAvailabilityById/${id}`).then(res=>{
            //if(res.data.status===200){
                //console.log(res.data);
                setCandidateAvailability(res.data);
                //alert("Candidate Updated Successfully");
            //}
           });

    },[]);

   
       


    const submitCandidateAvailability = (e) => {
     // debugger;
       // e.persist();

       // debugger;
        axios.put(`https://localhost:44348/api/Candidate/UpdateCandidateAvailability/${id}`, candidateAvailabilityInput).then(res => {
         // debugger;
            if(res?.data?.status === 200){
                console.log(res.data);
                window.location="/viewcandidateavailability";

                alert("Candidate Availability updated Successfully!");
                setselectedCandidateId(null);
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
    {/* <div class="row"> */}

        <form className="addformjob" onSubmit={submitCandidateAvailability} encType="multipart/form-data">

            <h2><strong>Update Candidate Availability</strong></h2>

            <div class="column">
          {/* <br></br> */}
          <label >Candidate Name</label>         
            <select name="candidateId" onChange={(e)=>handleCandidateId(e)} value={candidateAvailabilityInput.candidateId} required="true" disabled="true">
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

            <label >Available Date</label>
            <input  id="availableDate" type="date"  name="availableDate" onChange={handleInput} value={candidateAvailabilityInput.availableDate} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.dob}</div> */}
            <br></br>

            <label >Available Time From</label>
            <input  id="availableTimeFrom" type="time"  name="availableTimeFrom" onChange={handleInput} value={candidateAvailabilityInput.availableTimeFrom} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.address}</div> */}
            <br></br>

            <label >Available Time To</label>
            <input  id="availableTimeTo" type="time"  name="availableTimeTo" onChange={handleInput} value={candidateAvailabilityInput.availableTimeTo} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.mobileno}</div> */}
            <br></br>

            
</div>

            <button id="jobb" className="btn btn-success" type="submit" onClick={()=>submitCandidateAvailability}>Update</button>
            <br></br>
            <br></br>
            {/* <Link to={'/addcandidate'}><button className="btn btn-outline-dark" type="submit" >Back</button>
        </Link>  */}
            <br></br>

            <Link to={'/updatecandidateavailability'}><button className="btn btn-outline-dark" type="submit" onClick={()=>{window.location='/viewcandidateavailability'}}>Back</button>
            </Link> 
                <br></br>
         
        </form>
        {/* </div> */}

    </div>
    )
}

         
 
  

    
    
export default UpdateCandidateAvailability;

