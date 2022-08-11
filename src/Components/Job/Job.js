import React, { Component } from "react";


import JobService from "../../Services/JobService";
import './Job.css';

import 'react-toastify/dist/ReactToastify.css';


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
       // var pattern=new RegExp( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}$/);
      // var patt=new RegExp(/\d$/);        
        let formvalidstatus=true;  
         
        if(this.state.jobId==""){
            
         formvalidstatus=false;
         errors["jobId"]="Please enter your jobid !";
        
        }       
        if((this.state.jobRole)==""){
          
            formvalidstatus=false;
            errors["jobRole"]="Please enter your jobrole!";
        } 
       
          
      
      
      if((this.state.available)==0){
          
        formvalidstatus=false;
        errors["available"]="Please select the available !";
        
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
                        
                        window.location="/register";
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
                  
            <form className="addformjob">
                <h3>AddJob</h3><br></br>

                <label id="jobId" >JobId</label>
                <input  id="jobId" type="text" name="jobId"  onChange={(e)=> this.jobId(e)}></input><br></br>
                <div className="errorMsg">{this.state.errors.jobId}</div>
              
                <label id="jobRole">JobRole</label>
                <input  id="jobRole" type="text"  name="jobRole" onChange={(e)=>this.jobRole(e)}></input><br></br>
                <div className="errorMsg">{this.state.errors.jobRole}</div>


                <label id="available">Available</label>
                <input  id="available" type="number"  name="available" onChange={(e)=>this.available(e)}></input><br></br>
                <div className="errorMsg">{this.state.errors.available}</div>
              
                <button id="jobb" className="btn btn-success" onClick={this.Addjob}>AddJob</button>
                <br></br>
              
             
            </form>
        </div>
            
        )
     }
}
export default Job