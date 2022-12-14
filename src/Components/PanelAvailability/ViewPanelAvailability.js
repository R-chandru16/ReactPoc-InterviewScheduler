import React, { Component } from "react";
import Sidebar from '../Sidebar';
import PanelService from "../../Services/PanelService";
import '../css/View.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

 

 
class ViewPanelAvailability extends React.Component{

     
    constructor(props){
        super(props)
        this.state={
            panelavailabilities:[],
            currentPage:1,
            jobsPerPage:5
        }
        this.addPanelAvailability=this.addPanelAvailability.bind(this);
        this.editPanelAvailability=this.editPanelAvailability.bind(this);
        this.deletePanelAvailability=this.deletePanelAvailability.bind(this);
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
                    onClick:()=> this.deletePanelAvailability(id)
                },
                {
                    label:'Cancel',
                    onClick:()=>window.location='/viewpanelavailability'
                }
            ]

          });
        
    }
    deletePanelAvailability(id){
        PanelService.DeletePanelAvailability(id).then(res=>{
            this.setState({panelavailabilities:this.state.panelavailabilities.filter(candidateavailability=>candidateavailability.id!==id)});
        });
        window.location='/viewpanelavailability';
        localStorage.setItem('Deletestatus',true);
       
    }
   

    editPanelAvailability(id){
        
     localStorage.setItem('id',id);
      window.location=`/updatepanelavailability/${id}`;
      
    }

  

    addPanelAvailability(){
        window.location="/panelavailability";
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
        PanelService.GetAllPanelAvailabilities().then((res)=>{
            this.setState({panelavailabilities:res.data});
             
        this.displayToast(); 
        this.clearData();
        });
         
        
    }
    searchItems=(event)=>{
        let searchval=event.target.value.toLowerCase();
         
        let res=this.state.panelavailabilities.filter(panelavailability=>{ 
            return(((panelavailability.panelId.toString()).indexOf(searchval)!==-1)||
            ((panelavailability.availableDate.toLowerCase()).indexOf(searchval)!==-1)||
            ((panelavailability.availableTimeFrom.toString()).indexOf(searchval)!==-1)||
            ((panelavailability.availableTimeTo.toString()).indexOf(searchval)!==-1))

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
                panelavailabilities:res
            })
        }
       
       
    }
    
 
    render(){
      
     const indexOfLastEmpolyee=this.state.currentPage * this.state.jobsPerPage;
     const indexOfFirstEmployee=indexOfLastEmpolyee-this.state.jobsPerPage;
     const currentEmployees=this.state.panelavailabilities.slice(indexOfFirstEmployee,indexOfLastEmpolyee);
     const pageNumbers=[];
     
     for(let i=1;i<=Math.ceil(this.state.panelavailabilities.length/this.state.jobsPerPage);i++){
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
                    <button className="btn btn-outline-success" type="submit" onClick={()=>{window.location='/panelavailability'}}>Add Panel Availability</button>
       
                </div>
            
                <br></br>
                <br></br>
                 <br></br>
                <h3>Panel Availability Details</h3>
                <br></br>
                    <table className="table">
                       
                    <thead className="dark">
                     <tr>
                         <th>Panel Name</th>
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
                             <td>{items.panel.name}</td>
                             <td>{items.availableDate}</td>
                             <td>{items.availableTimeFrom}</td>
                             <td>{items.availableTimeTo}</td>
                            
                             <td><button className="btn btn-primary" onClick={()=>this.editPanelAvailability(items.id)}>Edit</button></td>
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
export default ViewPanelAvailability









