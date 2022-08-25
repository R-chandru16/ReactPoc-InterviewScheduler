import React, { Component } from "react";
import Sidebar from '../Sidebar';

import JobService from "../../Services/JobService";
// import '../css/Create.css';
//import '../Job.css';


import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";


class Interview extends Component{
    constructor(props){
        super(props)
        this.state={
            level: "",
            levelDes: "",
        
          
            errors:{}   
            
        }
     
        this.level=this.level.bind(this);
      
        this.levelDes=this.levelDes.bind(this);
   
       
        this.AddInterview=this.AddInterview.bind(this);
         
 
  
}    
    AddInterview=(e)=>{
     
    
       e.preventDefault();
        let errors={};
       var pattern=new RegExp( /^[0-9a-zA-Z]+$/);
       var pat=new RegExp(/[a-zA-Z]/);
        let formvalidstatus=true;  
         
        if(this.state.level==""){
            
         formvalidstatus=false;
         errors["level"]="Please enter Interview level !";
        
        }      
      
        
        if((this.state.levelDes)==""){
          
            formvalidstatus=false;
            errors["levelDes"]="Please enter level Description!";
        } 
      
       
          
      
     

      this.setState({
          errors:errors
          
      });
      if(formvalidstatus==true){
    
        let lev={level:this.state.level,
                    
                levelDes:this.state.levelDes,
                
                   
                    };
        
                    console.log('lev=>'+lev.level+ " " + lev.levelDes
                     + " " );
                    
                     console.log('lev=>'+JSON.stringify(lev));
                    
                    JobService.AddInterview(lev).then(res=>{
                        
                        window.location="/viewlevel";
                        localStorage.setItem('Interviewstatus',true);
                       
                        alert('InterviewLevel Added successfully')
                    });
                   

    }
   }

    
     level=(event)=>{
        this.setState({level:event.target.value});
     }
    
     levelDes=(event)=>{
        this.setState({levelDes:event.target.value});
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
                <h2><strong>Add Interview Level</strong></h2>
        {/* <div className="content"> */}
                <label>Level</label>
                <input id="level" type="text" name="level"  onChange={(e)=> this.level(e)}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.level}</div>
              <br></br>
                <label >Level Description</label>
                <input  id="jobRole" type="text"  name="jobRole" onChange={(e)=>this.levelDes(e)}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.levelDes}</div>

                <br></br>

                <br></br>
                <br></br>
        {/* </div> */}

                <button id="jobb" className="btn btn-success" onClick={this.AddInterview}>Create</button>
                <br></br>
                <br></br>
                <Link to={'/job'}><button className="btn btn-outline-dark" type="submit" onClick={()=>{window.location='/viewlevel'}}>Back</button>
            </Link> 
                <br></br>
             
            </form>
        </div>
            
        )
     }
}
export default Interview