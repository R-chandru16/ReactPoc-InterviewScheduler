import axios from 'axios';
import React, { useState,useEffect} from "react";
import Sidebar from '../Sidebar';
import './../Job/Job.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams  } from "react-router-dom";
import CandidateService from "../../Services/CandidateService";

// import swal from 'sweetalert';

function UpdateCandidate(){
    const Job_Baseurl="https://localhost:44348/api/Jobs";
    const Candidate_Baseurl="https://localhost:44348/api/Candidate";


    const [levellist, setLevellist] = useState([]);
    const [joblist, setJoblist] = useState([]);
    const [selectedLevelId, setselectedLevelId] = useState(0);
    const [selectedJobId, setselectedJobId] = useState(0);





    const [candidateInput, setCandidate] = useState({
        //id: 0,
        name : '',
        dob : '',
        address : '',
        mobileno : '',
        qualification : '',
        email: '',
        LevelId : 0,
        JobId : 0,
        resume : '',


    });

    // const [errorlist, setError]=useState([]);

    const handleInput = (e) => {
      //debugger;
      console.log({...candidateInput, [e.target.name]:e.target.value})

        e.persist();
        setCandidate({...candidateInput, [e.target.name]:e.target.value});

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
        });
    },[]);

    const {id} = useParams();

    useEffect(()=>{
        axios.get(Job_Baseurl + `/GetAllJobs` ).then(res=>{
           // if(res.data.status===200){
                console.log(res.data);

                setJoblist(res.data);

           // }

            
        })

   axios.get(Candidate_Baseurl + `/GetCandidateById/${id}`).then(res=>{
    //if(res.data.status===200){
        //console.log(res.data);
        setCandidate(res.data);
        //alert("Candidate Updated Successfully");
    //}
   });

    },[]);

   
  
       
    
 


  //   useEffect(()=>{


  //    // console.log(this.props.match.id);
  //      // const candidate_id = props.match.params.id;
  //      const {id} = useParams();
  //          console.log(id);
  //          axios.get(Candidate_Baseurl + `/GetCandidateById/${id}`).then(res=>{
  //           // if(res.data.status===200){
  //               console.log(res.data);
  //               setCandidate(res.data);
  //           // }
  //          });
  // },[]);


 





//   useEffect(()=>{

   
//         //console.log(this.props.match);
//         CandidateService.GetCandidateById(localStorage.getItem('id')).then(res=>{
//           //console.log(res);
//           let job=res.data;
//           this.setState({
//               id:localStorage.getItem('id')
//               ,name: job.name,
  
//               dob:job.dob,
//               address:job.address,
//               mobileno:job.mobileno,
//               qualification:job.qualification,
//               email:job.email,
//               LevelId:job.LevelId,
//               JobId:job.JobId,
//               resume:job.resume

//           });
//       });

//       //alert(this.state.id);
//       //alert(localStorage.getItem('id'));
// });





        
    // const updateCandidate = (e)=>{
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('name', candidateInput.name);
    //     formData.append('dob', candidateInput.dob);
    //     formData.append('address', candidateInput.address);
    //     formData.append('mobileno', candidateInput.mobileno);
    //     formData.append('qualification', candidateInput.qualification);
    //     formData.append('email', candidateInput.email);
    //     formData.append('level_id', candidateInput.level_id);
    //     formData.append('job_id', candidateInput.job_id);
    //     formData.append('resume', candidateInput.resume);


    //     axios.post(Candidate_Baseurl + `/AddCandidate`, formData).then(res=>{
    //         if(res.data.status===200){
    //             alert("Candidate added Successfully!");
    //             // swal("Success", res.data.message,"success");
    //             // setError([]);
    //         }
    //         else{
    //             // swal("All fields are mandatory","","error");
    //             // setError(res.data.errors);
    //             alert("Something went wrong!");

    //         }
    //     }
    //     )
    // }

  


    const updateCandidate = () => {
      console.log(candidateInput)
     // debugger;
       // e.persist();

        // const data = {
        //     name: candidateInput.name,
        //     dob: candidateInput.dob,
        //     address: candidateInput.address,
        //     mobileno: candidateInput.mobileno,
        //     qualification: candidateInput.qualification,
        //     email: candidateInput.email,
        //     LevelId: selectedLevelId,
        //     JobId: selectedJobId,
        //     resume: candidateInput.resume,

        // }

        // const data = candidateInput;

        // console.log(data);

       // debugger;
        axios.put(`https://localhost:44348/api/Candidate/UpdateCandidate/${id}`, candidateInput).then(res => {
         // debugger;
            // if(res?.data?.status === 200){
                console.log(res.data);
                window.location="/viewcandidate";

                alert("Candidate updated Successfully!");
                setselectedLevelId(null);
                setselectedJobId(null);
          //  }
          //   else{
          //       alert("Something went wrong!");
          //   }
        }).catch((err)=>{
            // console.log(err)
        })


    }

    return(
        <div>
               <div class="side">
        <Sidebar />
    </div>
    
        <form className="addformjob" encType="multipart/form-data">
            <h2><strong>Update Candidate</strong></h2>
    
          {/* <br></br> */}
            <label >Name</label>
            <input  id="name" type="text"  name="name" onChange={handleInput} value={candidateInput.name} required={true}></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.name}</div> */}
            <br></br>

            <label >DOB</label>
            <input  id="dob" type="datetime"  name="dob" onChange={handleInput} value={candidateInput.dob.toString()} ></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.dob}</div> */}
            <br></br>

            <label >Address</label>
            <input  id="address" type="text"  name="address" onChange={handleInput} value={candidateInput.address} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.address}</div> */}
            <br></br>

            <label >Mobile No.</label>
            <input  id="mobileno" type="text"  name="mobileno" onChange={handleInput} value={candidateInput.mobileno} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.mobileno}</div> */}
            <br></br>

            <label >Qualification</label>
            <input  id="qualification" type="text"  name="qualification" onChange={handleInput} value={candidateInput.qualification} required="true"></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.qualification}</div> */}
            <br></br>

            <label >Email</label>
            <input  id="email" type="text"  name="email" onChange={handleInput} value={candidateInput.email} required="true" ></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.email}</div> */}
            <br></br>

            <label >Level</label>         
            {/* <select name="LevelId" onChange={(e)=>handleLevelId(e)} value={selectedLevelId} required="true" > */}
            <select name="LevelId" onChange={(e)=>handleLevelId(e)} value={candidateInput.levelId} required="true" >

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
            {/* <select name="JobId" onChange={(e)=>handleJobId(e)} value={selectedJobId} required="true"> */}
            <select name="LevelId" onChange={(e)=>handleLevelId(e)} value={candidateInput.jobId} required="true" >

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

{/* <input  id="job_id" type="number"  name="job_id"  >2</input><br></br> */}

            {/* <div className="errorMsgJob">{errorlist.job_id}</div> */}
            <br></br>
            {/* <label >Resume</label> */}
            <input  id="resume" type="file"  name="resume" onChange={handleInput} value={candidateInput.resume} hidden></input><br></br>
            {/* <div className="errorMsgJob">{errorlist.resume}</div> */}

            {/* <br></br> */}

            <br></br>
    {/* </div> */}

            <button id="jobb" className="btn btn-success" type="submit" onClick={()=>updateCandidate()}>Update</button>
            <br></br>
            <br></br>
            {/* <Link to={'/addcandidate'}><button className="btn btn-outline-dark" type="submit" >Back</button>
        </Link>  */}
            <br></br>

            <Link to={'/addcandidate'}><button className="btn btn-outline-dark" type="submit" onClick={()=>{window.location='/viewcandidate'}}>Back</button>
            </Link> 
                <br></br>
         
        </form>
    </div>
    )
}

         
 
  

    
    
export default UpdateCandidate;

