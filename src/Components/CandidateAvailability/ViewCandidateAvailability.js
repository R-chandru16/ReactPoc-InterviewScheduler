import React, { Component } from "react";
import Sidebar from '../Sidebar';
import CandidateService from "../../Services/CandidateService";
import '../css/View.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

 

 
class ViewCandidateAvailability extends React.Component{

     
    constructor(props){
        super(props)
        this.state={
            candidateavailabilities:[],
            currentPage:1,
            jobsPerPage:5
        }
        this.addCandidateAvailability=this.addCandidateAvailability.bind(this);
        this.editCandidateAvailability=this.editCandidateAvailability.bind(this);
        this.deleteCandidateAvailability=this.deleteCandidateAvailability.bind(this);
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
                    onClick:()=> this.deleteCandidateAvailability(id)
                },
                {
                    label:'Cancel',
                    onClick:()=>window.location='/viewcandidateavailability'
                }
            ]

          });
        
    }
    deleteCandidateAvailability(id){
        CandidateService.DeleteCandidateAvailability(id).then(res=>{
            this.setState({candidateavailabilities:this.state.candidateavailabilities.filter(candidateavailability=>candidateavailability.id!==id)});
        });
        window.location='/viewcandidateavailability';
        localStorage.setItem('Deletestatus',true);
       
    }
   

    editCandidateAvailability(id){
        
     localStorage.setItem('id',id);
      window.location=`/updatecandidateavailability/${id}`;
      
    }

  

    addCandidateAvailability(){
        window.location="/candidateavailability";
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
        CandidateService.GetAllCandidateAvailabilities().then((res)=>{
            this.setState({candidateavailabilities:res.data});
             
        this.displayToast(); 
        this.clearData();
        });
         
        
    }
    searchItems=(event)=>{
        let searchval=event.target.value.toLowerCase();
         
        let res=this.state.candidateavailabilities.filter(candidateavailability=>{ 
            return(((candidateavailability.candidateId.toString()).indexOf(searchval)!==-1)||
            ((candidateavailability.availableDate.toLowerCase()).indexOf(searchval)!==-1)||
            ((candidateavailability.availableTimeFrom.toString()).indexOf(searchval)!==-1)||
            ((candidateavailability.availableTimeTo.toString()).indexOf(searchval)!==-1))

        })
        console.log(res);
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
                candidateavailabilities:res
            })
        }
       
       
    }
    
 
    render(){
      
     const indexOfLastEmpolyee=this.state.currentPage * this.state.jobsPerPage;
     const indexOfFirstEmployee=indexOfLastEmpolyee-this.state.jobsPerPage;
     const currentEmployees=this.state.candidateavailabilities.slice(indexOfFirstEmployee,indexOfLastEmpolyee);
     const pageNumbers=[];
     
     for(let i=1;i<=Math.ceil(this.state.candidateavailabilities.length/this.state.jobsPerPage);i++){
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
                    <button className="btn btn-outline-success" type="submit" onClick={()=>{window.location='/candidateavailability'}}>Add Candidate Availability</button>
       
                </div>
            
                <br></br>
                <br></br>
                 <br></br>
                <h3>Candidate Availability Details</h3>
                <br></br>
                    <table className="table">
                       
                    <thead className="dark">
                     <tr>
                         <th>Candidate Name</th>
                         <th>Available Date</th>
                         <th>Available Time From</th>
                         <th>Available Time To</th>
                        
                        
                         <th></th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {
                     currentEmployees.map(items=>(
                         <tr key={items.id}>
                             <td>{items.candidate.name}</td>
                             <td>{items.availableDate}</td>
                             <td>{items.availableTimeFrom}</td>
                             <td>{items.availableTimeTo}</td>
                            
                             <td><button className="btn btn-primary" onClick={()=>this.editCandidateAvailability(items.id)}>Edit</button></td>
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
export default ViewCandidateAvailability









