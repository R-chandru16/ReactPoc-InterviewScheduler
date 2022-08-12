import React, { Component } from "react";
import AuthService from "../Services/AuthService";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import {NavLink } from "react-router-dom";
import'./Login.css'
import { Alert } from "bootstrap";



class Login extends Component{
    
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            errors:{}        
               
            
        }
        this.username=this.username.bind(this);
        this.password=this.password.bind(this);
        this.login=this.login.bind(this);
        
    }
   
    
    login=(e)=>{
        
        e.preventDefault();
        let errors={};
       
        let formvalidstatus=true;  
          
        if(this.state.username=="") {
            
           formvalidstatus=false;
           errors["username"]="Please enter your username !";
        }
       
         if(this.state.password==""){
            formvalidstatus=false;
            errors["password"]="Please enter your password !";
        }
       
        //else{
        //     formvalidstatus=true;
        // }
        this.setState({
            errors:errors
        });
        if(formvalidstatus==true){
            let user={username:this.state.username,
                password:this.state.password};
                
                
                console.log('user=>'+JSON.stringify(user));
                AuthService.login(user).then(res=>{
                    
                     if(res['status']==200)
                    {
                        localStorage.setItem('useremailid',this.state.username);
                        localStorage.setItem('Loginsuccess',true); 
                        
                        window.location='/Dashboard';
                       
                        
                    }else{
                      
                           // toast('invalid username or password', { position: toast.POSITION.TOP_CENTER})
                           // toast('Default!', { position: toast.POSITION.TOP_LEFT })
                            // toast.success('failed!', {
                            //   position: toast.POSITION.TOP_CENTER,
                            //   autoClose: 1,
                        
                            
                            // })
                          alert('invalid username or password')
                            
                             
                        //  toast.show();        
                        // localStorage.removeItem('useremailid');
                        // window.location='/';
                    }
                    
                });
        }
        
    }


 

    username=(event)=>{
        
        this.setState({username:event.target.value});
       
        
       
    }
    password=(event)=>{
        this.setState({password:event.target.value});
    }

     

    render(){
        return(
            <div>
                
                <form className="addformlog" >
                <h3>Login</h3><br></br>
                <label id="username" >Username</label>
           
                <input  id="username" type="text" name="username"  value={this.state.username} onChange={(e)=> this.username(e)} ></input><br></br>
                <div className="errorMsgLogin">{this.state.errors.username}</div>
                 <label id="password">Password</label>
                <input  id="emppassw" type="password" name="password"    value={this.state.password}  onChange={(e)=>this.password(e)}></input><br></br>
                <div className="errorMsgLogin">{this.state.errors.password}</div>
      
                <button id="log" className="btn btn-success" onClick={this.login}>Login</button>
                <br></br>
                <NavLink to="/register">Not yet registered? Register Now</NavLink>
            </form>
           
            </div>
        )
    }
   
}
export default Login