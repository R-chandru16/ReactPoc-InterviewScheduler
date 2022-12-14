
import React, { Component } from "react";
import Sidebar from '../Sidebar';

import JobService from "../../Services/JobService";
// import '../css/Create.css';
import './../Job/Job.css';
// import '../../Job.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";



class UpdateLevel extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
            id:0,
            level:'',
            levelDes:'',
            errors:{}   
            
        }

        this.id=this.id.bind(this);

        this.level=this.level.bind(this);
      
        this.levelDes=this.levelDes.bind(this);
   
        this.UpdateInterviewLevel=this.UpdateInterviewLevel.bind(this);
        this.cancel=this.cancel.bind(this);

 
  
}    

componentDidMount(){


        console.log(this.props.match);
    JobService.GetInterviewLevelById(localStorage.getItem('id')).then((res)=>{
        let level=res.data;
        this.setState({
            id:localStorage.getItem('id')
            ,level: level.level,

            levelDes:level.levelDes
        });
    });
}

    UpdateInterviewLevel=(e)=>{
     
    
       e.preventDefault();
        let errors={};
       // var pattern=new RegExp( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}$/);
      // var patt=new RegExp(/\d$/);        
        let formvalidstatus=true;  
         
        if(this.state.level==""){
            
         formvalidstatus=false;
         errors["level"]="Please enter Level !";
        
        }       
        if((this.state.levelDes)==""){
          
            formvalidstatus=false;
            errors["levelDes"]="Please enter Level Description!";
        } 
       
          
      
  


      this.setState({
          errors:errors
          
      });
      if(formvalidstatus==true){
    
        let lev={id:parseInt(this.state.id),
            level:this.state.level,
                    
                    levelDes:this.state.levelDes,
                
                    };
        
                    console.log('lev=>'+lev.level+ " " + lev.levelDes
                     );
                    
                     console.log('lev=>'+JSON.stringify(lev));
                    JobService.UpdateInterviewLevel(lev.id,lev).then(res=>{
                        
                        window.location="/viewlevel";
                        localStorage.setItem('Updatestatus',true);
                       
                        alert('Interview Level Updated successfully')
                    });
                   

    }
   }

   id(event){
    this.setState({id:event.target.value});
 } 

     level(event){
        this.setState({level:event.target.value});
     }
    
     levelDes(event){
        this.setState({levelDes:event.target.value});
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
                <h2><strong>Update Interview Level</strong></h2>
               
                <input id="id" type="hidden" name="id" value={ this.state.id} onChange={this.id}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.id}</div>

                <label>Level</label>
                <input id="level" type="text" name="level"  value={ this.state.level} onChange={this.level}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.level}</div>
              <br></br>
                <label >Description</label>
                <input  id="levelDes" type="text"  name="levelDes" value={ this.state.levelDes} onChange={this.levelDes}></input><br></br>
                <div className="errorMsgJob">{this.state.errors.levelDes}</div>

                <br></br>

               
                <br></br>

                <button id="jobb" className="btn btn-success" onClick={(e)=>this.UpdateInterviewLevel(e)}>Update</button>
                <br></br>
                <br></br>
                <Link to={'/viewlevel'}><button className="btn btn-outline-dark" type="submit" onClick={()=>{window.location='/viewlevel'}}>Back</button>
            </Link> 
                <br></br>
              
             
            </form>
        </div>
            
        )
     }
}
export default UpdateLevel