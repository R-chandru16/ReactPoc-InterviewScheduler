import React, { Component } from "react";
import Sidebar from '../Sidebar';
import CandidateService from "../../Services/CandidateService";
import '../css/View.css';
import {toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

 

 
class ViewCandidate extends React.Component{

     
    constructor(props){
        super(props)
        this.state={
            candidates:[],
            currentPage:1,
            jobsPerPage:5
        }
        this.addCandidate=this.addCandidate.bind(this);
        this.editCandidate=this.editCandidate.bind(this);
        this.deleteCandidate=this.deleteCandidate.bind(this);
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
                    onClick:()=> this.deleteCandidate(id)
                },
                {
                    label:'Cancel',
                    onClick:()=>window.location='/viewcandidate'
                }
            ]

          });
        
    }
    deleteCandidate(id){
        CandidateService.DeleteCandidate(id).then(res=>{
            this.setState({candidates:this.state.candidates.filter(candidate=>candidate.id!==id)});
        });
        window.location='/viewcandidate';
        localStorage.setItem('Deletestatus',true);
       
    }
   

    editCandidate(id){
        
     localStorage.setItem('id',id);
      window.location=`/updatecandidate/${id}`;
      
    }

    // editLevel(id){
    //     JobService.GetInterviewLevelById(localStorage.getItem('id')).then((res)=>{
    //         let level=res.data;
    //         this.setState({
    //             id:localStorage.getItem('id')
    //             ,level: level.level,
    
    //             levelDes:level.levelDes
    //         });
    //     });
    // }

    addCandidate(){
        window.location="/addcandidate";
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
        CandidateService.GetAllCandidates().then((res)=>{
            this.setState({candidates:res.data});
             
        this.displayToast(); 
        this.clearData();
        });
         
        
    }
    searchItems=(event)=>{
        let searchval=event.target.value.toLowerCase();
         
        let res=this.state.candidates.filter(candidate=>{ 
            return(((candidate.id.toString()).indexOf(searchval)!==-1)||
            ((candidate.name.toLowerCase()).indexOf(searchval)!==-1)||
            ((candidate.dob.toLowerCase()).indexOf(searchval)!==-1)||
            ((candidate.address.toLowerCase()).indexOf(searchval)!==-1)||
            ((candidate.mobileno.toLowerCase()).indexOf(searchval)!==-1)||
            ((candidate.qualification.toLowerCase()).indexOf(searchval)!==-1)||
            ((candidate.email.toLowerCase()).indexOf(searchval)!==-1)||
            ((candidate.LevelId.toString()).indexOf(searchval)!==-1)||
            ((candidate.JobId.toString()).indexOf(searchval)!==-1)||

            ((candidate.resume.toLowerCase()).indexOf(searchval)!==-1))

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
                candidates:res
            })
        }
       
       
    }
    
 
    render(){
      
     const indexOfLastEmpolyee=this.state.currentPage * this.state.jobsPerPage;
     const indexOfFirstEmployee=indexOfLastEmpolyee-this.state.jobsPerPage;
     const currentEmployees=this.state.candidates.slice(indexOfFirstEmployee,indexOfLastEmpolyee);
     const pageNumbers=[];
     
     for(let i=1;i<=Math.ceil(this.state.candidates.length/this.state.jobsPerPage);i++){
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
                    <button className="btn btn-outline-success" type="submit" onClick={()=>{window.location='/addcandidate'}}>Add Candidate</button>
       
                </div>
                {/* <div className="searchbtn">
                       <input type="text" placeholder="Search here" onChange={(e)=>this.searchItems(e)}/>
                </div> */}
               .
                <br></br>
                <br></br>
                 <br></br>
                <h3>Candidate Details</h3>
                <br></br>
                    <table className="table">
                       
                    <thead className="dark">
                     <tr>
                         <th>Name</th>
                         <th>Mobile Number</th>
                         <th>Qualification</th>
                         <th>Email</th>
                         <th>Level</th>
                         <th>Job Role</th>
                        
                         <th></th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {
                     currentEmployees.map(items=>(
                         <tr key={items.id}>
                             <td>{items.name}</td>
                             <td>{items.mobileno}</td>
                             <td>{items.qualification}</td>
                             <td>{items.email}</td>
                             <td>{items.level.level}</td>
                             <td>{items.job.jobRole}</td>

                             <td><button className="btn btn-primary" onClick={()=>this.editCandidate(items.id)}>Edit</button></td>
                             <td><button className="btn btn-danger"  onClick={()=>this.deleteButton(items.id)}>Delete</button></td>
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
export default ViewCandidate









