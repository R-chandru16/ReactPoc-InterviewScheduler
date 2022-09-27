import React, { Component } from "react";
import Sidebar from '../Sidebar';
import ScheduleService from "../../Services/ScheduleService";
import '../css/View.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

 

 
class ViewSchedule extends React.Component{

     
    constructor(props){
        super(props)
        this.state={
            schedules:[],
            currentPage:1,
            jobsPerPage:5
        }
        this.addSchedule=this.addSchedule.bind(this);
        this.editSchedule=this.editSchedule.bind(this);
        this.deleteSchedule=this.deleteSchedule.bind(this);
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
                    onClick:()=> this.deleteSchedule(id)
                },
                {
                    label:'Cancel',
                    onClick:()=>window.location='/viewschedule'
                }
            ]

          });
        
    }
    deleteSchedule(id){
        ScheduleService.DeleteSchedule(id).then(res=>{
            this.setState({schedules:this.state.schedules.filter(schedule=>schedule.id!==id)});
        });
        window.location='/viewschedule';
        localStorage.setItem('Deletestatus',true);
       
    }
   

    editSchedule(id){
        
     localStorage.setItem('id',id);
      window.location=`/updateschedule/${id}`;
      
    }

    

    addSchedule(){
        window.location="/addschedule";
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
        ScheduleService.GetAllSchedules().then((res)=>{
            this.setState({schedules:res.data});
             
        this.displayToast(); 
        this.clearData();
        });
         
        
    }
    searchItems=(event)=>{
        let searchval=event.target.value.toLowerCase();
         
        let res=this.state.schedules.filter(schedule=>{ 
            return(((schedule.id.toString()).indexOf(searchval)!==-1)||
            ((schedule.candidateId.toString()).indexOf(searchval)!==-1)||
            ((schedule.panelId.toString()).indexOf(searchval)!==-1)||
            ((schedule.levelId.toString()).indexOf(searchval)!==-1)||
            ((schedule.jobId.toString()).indexOf(searchval)!==-1)||
            ((schedule.date.toString()).indexOf(searchval)!==-1)||
            ((schedule.timeFrom.toString()).indexOf(searchval)!==-1)||
            ((schedule.timeTo.toString()).indexOf(searchval)!==-1))
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
                schedules:res
            })
        }
       
       
    }
    
 
    render(){
      
     const indexOfLastEmpolyee=this.state.currentPage * this.state.jobsPerPage;
     const indexOfFirstEmployee=indexOfLastEmpolyee-this.state.jobsPerPage;
     const currentEmployees=this.state.schedules.slice(indexOfFirstEmployee,indexOfLastEmpolyee);
     const pageNumbers=[];
     
     for(let i=1;i<=Math.ceil(this.state.schedules.length/this.state.jobsPerPage);i++){
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
                    <button className="btn btn-outline-success" type="submit" onClick={()=>{window.location='/schedule'}}>Add Schedule</button>
       
                </div>
                {/* <div className="searchbtn">
                       <input type="text" placeholder="Search here" onChange={(e)=>this.searchItems(e)}/>
                </div> */}
               .
                <br></br>
                <br></br>
                 <br></br>
                <h3>Interview Schedule Details</h3>
                <br></br>
                    <table className="table">
                       
                    <thead className="dark">
                     <tr>
                         <th>Candidate Name</th>
                         <th>Panel Name</th>
                         <th>Level</th>
                         <th>Job Role</th>
                         <th>Date</th>
                         <th>Time From</th>
                         <th>Time To</th>

                        
                         <th></th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {
                     currentEmployees.map(items=>(
                         <tr key={items.id}>
                             <td>{items.candidate.name}</td>
                             <td>{items.panel.name}</td>
                             <td>{items.level.level}</td>
                             <td>{items.job.jobRole}</td>
                             <td>{items.date}</td>
                             <td>{items.timeFrom}</td>
                             <td>{items.timeTo}</td>

                             

                             <td><button className="btn btn-primary" onClick={()=>this.editSchedule(items.id)}>Edit</button></td>
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
export default ViewSchedule









