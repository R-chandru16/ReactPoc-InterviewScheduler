import React, { Component } from "react";
import Sidebar from '../Sidebar';
import JobService from "../../Services/JobService";
import '../css/View.css';
import {toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

 

 
class ViewJob extends React.Component{

     
    constructor(props){
        super(props)
        this.state={
            jobs:[],
            currentPage:1,
            jobsPerPage:5
        }
        this.addJob=this.addJob.bind(this);
        this.editJob=this.editJob.bind(this);
        this.deleteJob=this.deleteJob.bind(this);
        this.deleteButton=this.deleteButton.bind(this);
        this.searchItems=this.searchItems.bind(this);
        
    }
    deleteButton(id)
    {
        confirmAlert({
            title:'Delete Confirmation',
            message:'Are you sure you want to delete this ?',
            buttons:[
                {
                    label:'Delete',
                    className:'but1',
                    onClick:()=> this.deleteJob(id)
                },
                {
                    label:'Cancel',
                    onClick:()=>window.location='/viewjob'
                }
            ]

          });
        
    }
    deleteJob(id){
        JobService.DeleteJob(id).then(res=>{
            this.setState({jobs:this.state.jobs.filter(job=>job.id!==id)});
        });
        window.location='/viewjob';
        localStorage.setItem('Deletestatus',true);
       
    }
   

    editJob(id){
     localStorage.setItem('userid',id);
      window.location='/updatejob';
      
    }
    addJob(){
        window.location="/addjob";
    }
    displayToast=()=>{
        if(localStorage.getItem('Deletestatus'))  {
            toast('Deleted Successfully',{
                position:toast.POSITION.BOTTOM_CENTER,
                type:toast.TYPE.SUCCESS,
                toastId:'del'
             })      
             
           
          
           }
           if(localStorage.getItem('Resgisterstatus'))  {
                toast('Added Successfully',{
                    position:toast.POSITION.BOTTOM_CENTER,
                    type:toast.TYPE.SUCCESS,
                    toastId:'add',

                 })      
                 
                
            
                  
               }
               if(localStorage.getItem('Updatestatus'))  {
                toast('Updated Successfully ',{
                    position:toast.POSITION.BOTTOM_CENTER,
                    type:toast.TYPE.SUCCESS,
                    toastId:'update',
                 })      
                   
                 
            
                 
               }
               
    }
    clearData=()=>{
        localStorage.removeItem('Resgisterstatus');
        localStorage.removeItem('Deletestatus');
        localStorage.removeItem('Updatestatus');
    }
 
    componentDidMount(){
       
        JobService.GetAllJobs().then((res)=>{
            this.setState({jobs:res.data});
             
        this.displayToast(); 
        this.clearData();
        });
         
        
    }
    searchItems=(event)=>{
        let searchval=event.target.value.toLowerCase();
         
        let res=this.state.jobs.filter(job=>{ 
            return(((job.Id.toString()).indexOf(searchval)!==-1)||
            ((job.jobId.toLowerCase()).indexOf(searchval)!==-1)||
            ((job.jobRole.toLowerCase()).indexOf(searchval)!==-1)||
            ((job.available.toString()).indexOf(searchval)!==-1))

        })
        if(res==""||searchval==""){
           
           if(res==""){
            toast("Searched value not found",
            {
                position:toast.POSITION.BOTTOM_CENTER,
                type: toast.TYPE.WARNING,
                toastId:'search',
                autoClose:1000,
                onClose:function(){
                  window.location.reload();
                }
                
            })
        
           }
           else{
            window.location.reload();
           }
           
          
            
        }
        else{
            this.setState({
                jobs:res
            })
        }
       
       
    }
    
 
    render(){
      
     const indexOfLastEmpolyee=this.state.currentPage * this.state.jobsPerPage;
     const indexOfFirstEmployee=indexOfLastEmpolyee-this.state.jobsPerPage;
     const currentEmployees=this.state.jobs.slice(indexOfFirstEmployee,indexOfLastEmpolyee);
     const pageNumbers=[];
     
     for(let i=1;i<=Math.ceil(this.state.jobs.length/this.state.jobsPerPage);i++){
        pageNumbers.push(i);
     }
    const setPage=(pageNum)=>{
        this.setState({currentPage:pageNum})
    }

        return(
            <div className="container">

<div class="side">
            <Sidebar />
        </div>
               
                <div className="addbtn">
                    {/* <button className="add" onClick={this.addJob}>Add Job</button> */}
                    <Link to={'/'}><button className="btn btn-outline-success" type="submit" onClick={()=>{window.location='/job'}}>Add Job</button>
            </Link>
                </div>
                <div className="addbtn">
                       <input type="text" placeholder="Search here" onChange={(e)=>this.searchItems(e)}/>
                </div>
               
                <br></br>
                <br></br>
                 <br></br>
                <h3>Job Details</h3>
                <br></br>
                    <table className="table">
                       
                    <thead className="dark">
                     <tr>
                         {/* <th>Id</th> */}
                         <th>Job Id</th>
                         <th>Job Role</th>
                         <th>Available</th>
                         <th></th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {
                     currentEmployees.map(items=>(
                         <tr key={items.Id}>
                             {/* <td>{items.Id}</td> */}
                             <td>{items.jobId}</td>
                             <td>{items.jobRole}</td>
                             <td>{items.available}</td>
                             <td><button className="btn btn-primary" onClick={()=>this.editJob(items.Id)}>Edit</button></td>
                             <td><button className="btn btn-danger"  onClick={()=>this.deleteButton(items.Id)}>Delete</button></td>
                         </tr>
                     ))}
                 </tbody>
                    </table>
                    <div className="pagination">
                     {
                        pageNumbers.map((pageNum,index)=>(
                            <span key={index}   onClick={()=>{setPage(pageNum)}}>
                                {pageNum}
                            </span>
                        ))
                     }
                    </div>
                
                </div>
               
        )
    }
}
export default ViewJob