import React, { Component } from "react";
import Sidebar from '../Sidebar';

import CandidateService from "../../Services/CandidateService";
// import '../css/Create.css';
import './../Job/Job.css';


import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";


class Candidate extends Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            dob:'',
            address:'',
            mobileno:'',
            qualification:'',
            email:'',
            level_id:0,
            job_id:0,
            resume:'',           
            errors:{}   
            
        }
     
        this.name=this.name.bind(this);     
        this.dob=this.dob.bind(this);  
        this.address=this.address.bind(this);
        this.mobileno=this.mobileno.bind(this);
        this.qualification=this.qualification.bind(this);
        this.email=this.email.bind(this);
        this.level_id=this.level_id.bind(this);
        this.job_id=this.job_id.bind(this);
        this.resume=this.resume.bind(this);
        this.AddCandidate=this.AddCandidate.bind(this);
         
 
  
}    
    AddCandidate=(e)=>{
     
    
       e.preventDefault();
        let errors={};
       var pattern=new RegExp( /^[0-9a-zA-Z]+$/);
       var pat=new RegExp(/[a-zA-Z]/);
        let formvalidstatus=true;  
         
        // if(this.state.jobId==""){
            
        //  formvalidstatus=false;
        //  errors["jobId"]="Please enter your jobid !";
        
        // }      
        // else if(!pattern.test(this.state.jobId)){
            
        //   formvalidstatus=false;
        //   errors["jobId"]="Please enter only letters and numbers !";
         
        //  }   

        
        if((this.state.name)==""){
          
            formvalidstatus=false;
            errors["name"]="Please enter your name!";
        } 
        if((this.state.dob)==""){
            
          formvalidstatus=false;
          errors["dob"]="Please enter your DOB!";
         
        }   
        if((this.state.address)==""){
            
            formvalidstatus=false;
            errors["address"]="Please enter your Address!";
           
          }   
        
      if((this.state.mobileno)==""){
          
        formvalidstatus=false;
        errors["mobileno"]="Please enter Mobile Number !";
        
    }

    if((this.state.qualification)==""){
            
        formvalidstatus=false;
        errors["qualification"]="Please enter Qualification!";
       
      }   
      if((this.state.email)==""){
            
        formvalidstatus=false;
        errors["email"]="Please enter Email!";
       
      }   
      if((this.state.level_id)==0){
            
        formvalidstatus=false;
        errors["level_id"]="Please enter Level!";
       
      }   
      if((this.state.job_id)==0){
            
        formvalidstatus=false;
        errors["job_id"]="Please enter your Job Role!";
       
      }   
      if((this.state.resume)==""){
            
        formvalidstatus=false;
        errors["resume"]="Please upload Resume!";
       
      }   



      this.setState({
          errors:errors
          
      });
      if(formvalidstatus==true){
    
        let candidate={name:this.state.name,
                    
                    dob:this.state.dob,
                
                      address:this.state.address,
                      mobileno:this.state.mobileno,
                      qualification:this.state.qualification,
                      email:this.state.email,
                      level_id:parseInt(this.state.level_id),
                      job_id:parseInt(this.state.job_id),
                      resume:this.state.resume,

                    };
        
                    console.log('candidate=>'+candidate.name+ " " + candidate.dob
                     + " " + candidate.address + " " + candidate.mobileno + " " + candidate.qualification + " " + candidate.email + " " + candidate.level_id + " " + candidate.job_id + " " + candidate.resume);
                    
                     console.log('candidate=>'+JSON.stringify(candidate));
                    
                    CandidateService.AddCandidate(candidate).then(res=>{
                        
                        window.location="/addcandidate";
                        localStorage.setItem('Candidatestatus',true);
                       
                        alert('Candidate Added successfully')
                    });
                   

    }
   }

    
     name=(event)=>{
        this.setState({name:event.target.value});
     }
    
     dob=(event)=>{
        this.setState({dob:event.target.value});
     }
     
     address=(event)=>{
        this.setState({address:event.target.value});
     }
     mobileno=(event)=>{
        this.setState({mobileno:event.target.value});
     }
     qualification=(event)=>{
        this.setState({qualification:event.target.value});
     }
     email=(event)=>{
        this.setState({email:event.target.value});
     }
     level_id=(event)=>{
        this.setState({level_id:event.target.value});
     }
     job_id=(event)=>{
        this.setState({job_id:event.target.value});
     }
     resume=(event)=>{
        this.setState({resume:event.target.value});
     }
     cancel(){
        window.location="/";
     }

     render(){
        return(
            <div>
                   <div class="side">
            <Sidebar />
        </div>
            <form className="addformjob">
                <h2><strong>Add Candidate</strong></h2>
        
              {/* <br></br> */}
                <label >Name</label>
                <input  id="name" type="text"  name="name" onChange={(e)=>this.name(e)}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.name}</div>

                {/* <br></br> */}

                <label >DOB</label>
                <input  id="dob" type="date"  name="dob" onChange={(e)=>this.dob(e)}></input><br></br>
                {/* <div className="errorMsgJob">{this.state.errors.dob}</div> */}
                {/* <br></br> */}
                <label >Address</label>
                <input  id="address" type="text"  name="address" onChange={(e)=>this.address(e)}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.address}</div>

                {/* <br></br> */}
                <label >Mobile No.</label>
                <input  id="mobileno" type="text"  name="mobileno" onChange={(e)=>this.mobileno(e)}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.mobileno}</div>

                {/* <br></br> */}
                <label >Email</label>
                <input  id="email" type="text"  name="email" onChange={(e)=>this.email(e)}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.email}</div>

                {/* <br></br> */}
                <label >Level</label>
                <input  id="level_id" type="number"  name="level_id" onChange={(e)=>this.level_id(e)}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.level_id}</div>

                {/* <br></br> */}
                <label >Job Role</label>
                <input  id="job_id" type="number"  name="job_id" onChange={(e)=>this.job_id(e)}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.job_id}</div>

                {/* <br></br> */}
                <label >Resume</label>
                <input  id="resume" type="file"  name="resume" onChange={(e)=>this.resume(e)}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.resume}</div>

                {/* <br></br>

                <br></br> */}
        {/* </div> */}

                <button id="jobb" className="btn btn-success" onClick={this.AddCandidate}>Create</button>
                <br></br>
                <br></br>
                <Link to={'/addcandidate'}><button className="btn btn-outline-dark" type="submit" onClick={()=>{window.location='/addcandidate'}}>Back</button>
            </Link> 
                <br></br>
             
            </form>
        </div>
            
        )
     }
}
export default Candidate