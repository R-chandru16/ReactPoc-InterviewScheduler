import axios from 'axios';
import React, { useState,useEffect } from "react";
import Sidebar from '../Sidebar';
import './../Job/Job.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
// import swal from 'sweetalert';

function AddPanelAvailability(){
    const Panel_Baseurl="https://localhost:44348/api/Panel";


    const [panelavailabilitylist, setPanelList] = useState([]);
    const [selectedPanelId, setselectedPanelId] = useState(0);

    
    const [panelAvailabilityInput, setPanelAvailability] = useState({
        panelId : 0,
        availableDate : '',
        availableTimeFrom : '',
        availableTimeTo : '',
        


    });

    // const [errorlist, setError]=useState([]);

    const handleInput = (e) => {
        e.persist();
        setPanelAvailability({...panelAvailabilityInput, [e.target.name]:e.target.value});

    }

    const handlePanelId = (e) => {
      e.persist();
      setselectedPanelId(Number(e.target.value));
      console.log(e.target.value);

  }

  
    useEffect(()=>{
        axios.get(Panel_Baseurl + `/GetAllPanels` ).then(res=>{
           // if(res.data.status===200){
                console.log(res.data);

                setPanelList(res.data);

           // }
        })
    },[]);

   
       


    const submitPanelAvailability = (e) => {
     // debugger;
       // e.persist();

        const data = {
            panelId: selectedPanelId,
            availableDate: panelAvailabilityInput.availableDate,
            availableTimeFrom: panelAvailabilityInput.availableTimeFrom,
            availableTimeTo: panelAvailabilityInput.availableTimeTo,
           
        }

        console.log(data);

       // debugger;
        axios.post(Panel_Baseurl + "/AddPanelAvailability", data).then(res => {
         // debugger;
            if(res?.data?.status === 200){
                console.log(res.data);
                window.location="/viewpanelavailability";

                alert("Panel Availability added Successfully!");
                setselectedPanelId(null);
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

        <form className="addformjob" onSubmit={submitPanelAvailability} encType="multipart/form-data">

            <h2><strong>Add Panel Availability</strong></h2>

            <div class="column">
          {/* <br></br> */}
          <label >Panel Name</label>         
            <select name="panelId" onChange={(e)=>handlePanelId(e)} value={selectedPanelId} required="true" >
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

            <label >Available Date</label>
            <input  id="availableDate" type="date"  name="availableDate" onChange={handleInput} value={panelAvailabilityInput.availableDate} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.dob}</div> */}
            <br></br>

            <label >Available Time From</label>
            <input  id="availableTimeFrom" type="time"  name="availableTimeFrom" onChange={handleInput} value={panelAvailabilityInput.availableTimeFrom} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.address}</div> */}
            <br></br>

            <label >Available Time To</label>
            <input  id="availableTimeTo" type="time"  name="availableTimeTo" onChange={handleInput} value={panelAvailabilityInput.availableTimeTo} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.mobileno}</div> */}
            <br></br>

            
</div>

            <button id="jobb" className="btn btn-success" type="submit" onClick={()=>submitPanelAvailability}>Create</button>
            <br></br>
            <br></br>
            {/* <Link to={'/addcandidate'}><button className="btn btn-outline-dark" type="submit" >Back</button>
        </Link>  */}
            <br></br>

            <Link to={'/panelavailability'}><button className="btn btn-outline-dark" type="submit" onClick={()=>{window.location='/viewpanelavailability'}}>Back</button>
            </Link> 
                <br></br>
         
        </form>
        {/* </div> */}

    </div>
    )
}

         
 
  

    
    
export default AddPanelAvailability;

