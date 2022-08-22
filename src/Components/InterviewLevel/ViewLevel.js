import React, { Component } from "react";
import Sidebar from '../Sidebar';
import JobService from "../../Services/JobService";
import '../css/View.css';
import {toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

 

 
class ViewLevel extends React.Component{

     
    constructor(props){
        super(props)
        this.state={
            levels:[],
            currentPage:1,
            jobsPerPage:5
        }
        this.addLevel=this.addLevel.bind(this);
        this.editLevel=this.editLevel.bind(this);
        this.deleteLevel=this.deleteLevel.bind(this);
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
                    onClick:()=> this.deleteLevel(id)
                },
                {
                    label:'Cancel',
                    onClick:()=>window.location='/viewlevel'
                }
            ]

          });
        
    }
    deleteLevel(id){
        JobService.DeleteInterviewLevel(id).then(res=>{
            this.setState({levels:this.state.levels.filter(level=>level.id!==id)});
        });
        window.location='/viewlevel';
        localStorage.setItem('Deletestatus',true);
       
    }
   

    editLevel(id){
     localStorage.setItem('userid',id);
      window.location=`/updateinterview/${id}`;
      
    }
    addLevel(){
        window.location="/interview";
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
        JobService.GetAllInterviewLevels().then((res)=>{
            this.setState({levels:res.data});
             
        this.displayToast(); 
        this.clearData();
        });
         
        
    }
    searchItems=(event)=>{
        let searchval=event.target.value.toLowerCase();
         
        let res=this.state.levels.filter(level=>{ 
            return(((level.id.toString()).indexOf(searchval)!==-1)||
            ((level.level.toLowerCase()).indexOf(searchval)!==-1)||
            ((level.levelDes.toLowerCase()).indexOf(searchval)!==-1))

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
                levels:res
            })
        }
       
       
    }
    
 
    render(){
      
     const indexOfLastEmpolyee=this.state.currentPage * this.state.jobsPerPage;
     const indexOfFirstEmployee=indexOfLastEmpolyee-this.state.jobsPerPage;
     const currentEmployees=this.state.levels.slice(indexOfFirstEmployee,indexOfLastEmpolyee);
     const pageNumbers=[];
     
     for(let i=1;i<=Math.ceil(this.state.levels.length/this.state.jobsPerPage);i++){
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
                    <button className="btn btn-outline-success" type="submit" onClick={()=>{window.location='/interview'}}>Add Interview Level</button>
       
                </div>
                {/* <div className="searchbtn">
                       <input type="text" placeholder="Search here" onChange={(e)=>this.searchItems(e)}/>
                </div> */}
               .
                <br></br>
                <br></br>
                 <br></br>
                <h3>Interview Level Details</h3>
                <br></br>
                    <table className="table">
                       
                    <thead className="dark">
                     <tr>
                         <th>Level</th>
                         <th>Description</th>
                         <th></th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {
                     currentEmployees.map(items=>(
                         <tr key={items.id}>
                             <td>{items.level}</td>
                             <td>{items.levelDes}</td>
                             <td><button className="btn btn-primary" onClick={()=>this.editLevel(items.id)}>Edit</button></td>
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
export default ViewLevel









