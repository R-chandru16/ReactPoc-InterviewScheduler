import React, { Component } from "react";
import Sidebar from '../Sidebar';

import JobService from "../../Services/JobService";
// import '../css/Create.css';
import './Job.css';


import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";


class Job extends Component{
    constructor(props){
        super(props)
        this.state={
            jobId:'',
            jobRole:'',
           
        
            available:0,
            errors:{}   
            
        }
     
        this.jobId=this.jobId.bind(this);
      
        this.jobRole=this.jobRole.bind(this);
   
        this.available=this.available.bind(this);
        this.Addjob=this.Addjob.bind(this);
         
 
  
}    
    Addjob=(e)=>{
     
    
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

        
        if((this.state.jobRole)==""){
          
            formvalidstatus=false;
            errors["jobRole"]="Please enter your jobrole!";
        } 
        else if(!pat.test(this.state.jobRole)){
            
          formvalidstatus=false;
          errors["jobRole"]="Please enter only alphabets !";
         
         }   
       
          
      
      
      if((this.state.available)==0){
          
        formvalidstatus=false;
        errors["available"]="Please enter number of vacancies !";
        
    }


      this.setState({
          errors:errors
          
      });
      if(formvalidstatus==true){
    
        let jobc={jobId:this.state.jobId,
                    
                    jobRole:this.state.jobRole,
                
                      available:parseInt(this.state.available),
                    };
        
                    console.log('jobc=>'+jobc.jobId+ " " + jobc.jobRole
                     + " " + jobc.available);
                    
                     console.log('jobc=>'+JSON.stringify(jobc));
                    
                    JobService.Addjob(jobc).then(res=>{
                        
                        window.location="/viewjob";
                        localStorage.setItem('Jobstatus',true);
                       
                        alert('Job Added successfully')
                    });
                   

    }
   }

    
     jobId=(event)=>{
        this.setState({jobId:event.target.value});
     }
    
     jobRole=(event)=>{
        this.setState({jobRole:event.target.value});
     }
     
     available=(event)=>{
        this.setState({available:event.target.value});
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
                <h2><strong>Add Job</strong></h2>
        {/* <div className="content"> */}
                {/* <label>Job Id</label>
                <input id="jobId" type="text" name="jobId"  onChange={(e)=> this.jobId(e)}></input><br></br> */}
                {/* <div className="errorMsgJob">{this.state.errors.jobId}</div> */}
              <br></br>
                <label >Job Role</label>
                <input  id="jobRole" type="text"  name="jobRole" onChange={(e)=>this.jobRole(e)}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.jobRole}</div>

                <br></br>

                <label >Available</label>
                <input  id="available" type="number"  name="available" onChange={(e)=>this.available(e)}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.available}</div>
                <br></br>
                <br></br>
        {/* </div> */}

                <button id="jobb" className="btn btn-success" onClick={this.Addjob}>Create</button>
                <br></br>
                <br></br>
                <Link to={'/job'}><button className="btn btn-outline-dark" type="submit" onClick={()=>{window.location='/viewjob'}}>Back</button>
            </Link> 
                <br></br>
             
            </form>
        </div>
            
        )
     }
}
export default Job