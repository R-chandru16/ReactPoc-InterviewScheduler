
import React, { Component } from "react";
import Sidebar from '../Sidebar';

import JobService from "../../Services/JobService";
// import '../css/Create.css';

import './Job.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";



class UpdateJob extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:0,
            jobId:'',
            jobRole:'',
           
        
            available:0,
            errors:{}   
            
        }

        this.id=this.id.bind(this);

        this.jobId=this.jobId.bind(this);
      
        this.jobRole=this.jobRole.bind(this);
   
        this.available=this.available.bind(this);
        this.UpdateJob=this.UpdateJob.bind(this);
        this.cancel=this.cancel.bind(this);

 
  
}    

componentDidMount(){


        console.log(this.props.match);
    JobService.GetJobById(localStorage.getItem('id')).then((res)=>{
        let job=res.data;
        this.setState({
            id:localStorage.getItem('id')
            ,jobId: job.jobId,

            jobRole:job.jobRole,
            available: job.available
        });
    });
}

    UpdateJob=(e)=>{
     
    
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
    
        let jobc={id:parseInt(this.state.id),
            jobId:this.state.jobId,
                    
                    jobRole:this.state.jobRole,
                
                      available:parseInt(this.state.available),
                    };
        
                    console.log('jobc=>'+jobc.jobId+ " " + jobc.jobRole
                     + " " + jobc.available);
                    
                     console.log('jobc=>'+JSON.stringify(jobc));
                    
                    JobService.UpdateJob(jobc.id,jobc).then(res=>{
                        
                        window.location="/viewjob";
                        localStorage.setItem('Updatestatus',true);
                       
                        alert('Job Updated successfully')
                    });
                   

    }
   }

   id(event){
    this.setState({id:event.target.value});
 } 

     jobId(event){
        this.setState({jobId:event.target.value});
     }
    
     jobRole(event){
        this.setState({jobRole:event.target.value});
     }
     
     available(event){
        this.setState({available:event.target.value});
     }
     cancel(){
        alert( window.location.replace('http://localhost:3000/'))
    }

     render(){
        // console.log(this.props.match.params);
        return(
            <div>
                   <div class="side">
            <Sidebar />
        </div>
            <form className="addformjob">
                <h2><strong>Update Job</strong></h2>
                <label>Id</label>
                <input id="id"  name="id" value={ this.state.id} onChange={this.id}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.id}</div>

                <label>Job Id</label>
                <input id="jobId" type="text" name="jobId"  value={ this.state.jobId} onChange={this.jobId}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.jobId}</div>
              <br></br>
                <label >Job Role</label>
                <input  id="jobRole" type="text"  name="jobRole" value={ this.state.jobRole} onChange={this.jobRole}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.jobRole}</div>

                <br></br>

                <label >Available</label>
                <input  id="available" type="number"  name="available" value={ this.state.available} onChange={this.available}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.available}</div>
                <br></br>
                <br></br>

                <button id="jobb" className="btn btn-success" onClick={(e)=>this.UpdateJob(e)}>Update</button>
                <br></br>
                <br></br>
                <Link to={'/viewjob'}><button className="btn btn-outline-dark" type="submit" onClick={()=>{window.location='/viewjob'}}>Back</button>
            </Link> 
                <br></br>
              
             
            </form>
        </div>
            
        )
     }
}
export default UpdateJob