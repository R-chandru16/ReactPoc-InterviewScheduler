import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import JobService from "../../Services/JobService";
import {Link} from 'react-router-dom';
import '../Create.css';



class Job extends Component{

    constructor(props){
        super(props)
        this.state={
            JobID:'',
            JobRole:'',
           
            Available:0,
          
            errors:{}   
            
        }
     
        this.JobID=this.JobID.bind(this);
      
        this.JobRole=this.JobRole.bind(this);
        this.Available=this.Available.bind(this);
        this.saveJob=this.saveJob.bind(this);

 
  
}
    
saveJob=(e)=>{
     
    
        e.preventDefault();
        let errors={};
        var pattern=new RegExp( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}$/);
      // var patt=new RegExp(/\d$/);        
        let formvalidstatus=true;  
         
        if(this.state.JobID==""){
            
         formvalidstatus=false;
         errors["JobID"]="Please enter Job ID !";
        
        }       
        if((this.state.JobRole)==""){
          
            formvalidstatus=false;
            errors["JobRole"]="Please enter JobRole !";

        } else if(!pattern.test(this.state.JobRole)){
            formvalidstatus=false;
            errors["JobRole"]=" JobRole must include 4 characters, one upper case , one lower case and one numeric digit.";
          }
         
          
      
      
      if((this.state.Available)==""){
          
        formvalidstatus=false;
        errors["Available"]="Please enter Available Seats !";
        
    }


      this.setState({
          errors:errors
          
      });
      if(formvalidstatus==true){
        let job={JobID:this.state.JobID,
                    
                      JobRole:this.state.JobRole,
                      Available:this.state.Available,
                    };
                    console.log('job=>'+JSON.stringify(job));

                    JobService.addJob(job).then(res=>{
                        window.location="/job";
                        localStorage.setItem('Jobstatus',true);
                        
                        alert('Job added successfully')
                    });
                   

    }
   }

    
     JobID=(event)=>{
        this.setState({JobID:event.target.value});
     }
    
     JobRole=(event)=>{
        this.setState({JobRole:event.target.value});
     }
     
     Available=(event)=>{
        this.setState({Available:event.target.value});
     }
     cancel(){
        window.location="/Login";
     }

    render(){
        return(
            <div class="row">
                 <div class="side">
            <Sidebar />
        </div>
        <div class="main">
        <div class="row" className="mb-5 pageheading">

<div className="container">
        <h2 className="title">ADD JOB</h2>
</div>

<div className="container">

<form className="addformjob" >
    <div  className="text-danger"></div>
    <div className="form-group has-success">
        <label className="control-label col-sm-2" >Job ID</label>

        <div className="col-sm-8">

            <input  className="form-control" type="text" placeholder="Enter Job ID" onChange={(e)=> this.JobID(e)} />
            <div className="errorMsg">{this.state.errors.JobID}</div>
        </div>

    </div>
    <div className="form-group has-success">
        <label className="control-label col-sm-2" >Job Role</label>

        <div className="col-sm-8">

            <input  className="form-control" type="text" placeholder="Enter Job Role" onChange={(e)=> this.JobRole(e)} />
            <div className="errorMsg">{this.state.errors.JobRole}</div>
        </div>

    </div>
    <div className="form-group has-success">
        <label className="control-label col-sm-2" >Available Seats</label>
        <div className="col-sm-8">
            <input  className="form-control" type="number" placeholder="Enter Available Seats" onChange={(e)=> this.Available(e)} />

            <div className="errorMsg">{this.state.errors.Available}</div>
        </div>

    </div>
<br></br>
        <div className="row">

            {/* <div className="col-sm-6">
                <div className="form-group has-success">
                    <input className="btn btn-success" type="submit" value="Submit" onClick={this.saveJob} />
                </div>
            </div> */}

<button className="btn btn-warning buttonc" onClick={this.saveJob}>Create</button>
<Link to={'/'}><button className="btn btn-primary butc" type="submit" onClick={()=>{window.location='/dashboard'}}>Back</button>
            </Link> 


            <div className="col-sm-6">
                <div className="form-group has-success">
                    <a  className="btn btn-dark" >Back</a>
                </div>
            </div>


        </div>
</form>
</div>
        </div>

        </div>
        </div>



        );
    }
}

export default Job;