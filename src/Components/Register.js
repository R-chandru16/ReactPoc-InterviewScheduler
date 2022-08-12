import React, { Component } from "react";
import AuthService from "../Services/AuthService";
import'./Register.css'

import 'react-toastify/dist/ReactToastify.css';
import {NavLink } from "react-router-dom";

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
           
            confirmpassword:'',
            Rolename:'',
            errors:{}   
            
        }
     
        this.username=this.username.bind(this);
      
        this.password=this.password.bind(this);
        this.confirmpassword=this.confirmpassword.bind(this);
        this.Rolename=this.Rolename.bind(this);
        this.Register=this.Register.bind(this);
         
 
  
}
    
    Register=(e)=>{
     
    
        e.preventDefault();
        let errors={};
        var pattern=new RegExp( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}$/);
      // var patt=new RegExp(/\d$/);        
        let formvalidstatus=true;  
         
        if(this.state.username==""){
            
         formvalidstatus=false;
         errors["username"]="Please enter your name !";
        
        }       
        if((this.state.password)==""){
          
            formvalidstatus=false;
            errors["password"]="Please enter your password !";
        } else if(!pattern.test(this.state.password)){
            formvalidstatus=false;
            errors["password"]=" Password must include 4 characters, one upper case , one lower case and one numeric digit.";
          }
         if((this.state.confirmpassword)==""){
          
            formvalidstatus=false;
            errors["confirmpassword"]="Please enter your confirmpassword !";
        }
          
          if(this.state.password != this.state.confirmpassword){
            formvalidstatus=false;
            errors["confirmpassword"]="Passwords do not match !";
          }
          
      
      
      if((this.state.Rolename)==""){
          
        formvalidstatus=false;
        errors["Rolename"]="Please select the Role !";
        
    }


      this.setState({
          errors:errors
          
      });
      if(formvalidstatus==true){
        let user={username:this.state.username,
                    
                      password:this.state.password,
                      Rolename:this.state.Rolename,
                    };
                    console.log('user=>'+JSON.stringify(user));

                    AuthService.Register(user).then(res=>{
                        window.location="/";
                        localStorage.setItem('Registerstatus',true);
                        
                        alert('register success')
                    });
                   

    }
   }

    
     username=(event)=>{
        this.setState({username:event.target.value});
     }
    
     password=(event)=>{
        this.setState({password:event.target.value});
     }
     confirmpassword=(event)=>{
        this.setState({confirmpassword:event.target.value});
     }
     Rolename=(event)=>{
        this.setState({Rolename:event.target.value});
     }
     cancel(){
        window.location="/Login";
     }

     render(){
        return(
            <div>
                  
            <form className="addformreg">
                <h3>Register</h3><br></br>

                <label id="username" >UserName</label>
                <input  id="username" type="text" name="name"  onChange={(e)=> this.username(e)}></input><br></br>
                <div className="errorMsgReg">{this.state.errors.username}</div>
              
                <label id="password">Password</label>
                <input  id="password" type="password"  name="password" onChange={(e)=>this.password(e)}></input><br></br>
                <div className="errorMsgReg">{this.state.errors.password}</div>
                <label id="confirmpassword">Confirm Password</label>
                
                <input  id="confirmpassword" type="password"  name="confirmpassword" onChange={(e)=>this.confirmpassword(e)}></input><br></br>
                <div className="errorMsgReg">{this.state.errors.confirmpassword}</div>
                <label id="Rolename" >Rolename</label>
                <select onChange={(e)=>this.Rolename(e)} name="Rolename">
                    
                <option value=''>select</option>

                      <option value='HR'>HR</option>
                      <option value='Recruitor'>Recruiter</option>
                </select><br></br>
                <div className="errorMsgReg">{this.state.errors.Rolename}</div>
                <button id="reg" className="btn btn-success" onClick={this.Register}>Register</button>
                <br></br>
                <br></br>
                <NavLink to="/">Already have an Account? Login Now</NavLink>
             
            </form>
        </div>
            
        )
     }
}
export default Register