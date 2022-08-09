import React, { Component } from 'react';
import Sidebar from '../Sidebar';


class Job extends Component{
    render(){
        return(
            <div class="row">
                 <div class="side">
            <Sidebar />
        </div>
        <div class="main">
        <div class="row" className="mb-5 pageheading">

<div className="container">
        <h2 className="title">ADD JOB</h2>
</div>

<div className="container">

<form className="form-horizontal" >
    <div  className="text-danger"></div>
    <div className="form-group has-success">
        <label className="control-label col-sm-2" >Job ID</label>

        <div className="col-sm-8">

            <input  className="form-control" type="text" placeholder="Enter Job ID" />
            <span  className="text-danger"></span>
        </div>

    </div>
    <div className="form-group has-success">
        <label className="control-label col-sm-2" >Job Role</label>

        <div className="col-sm-8">

            <input  className="form-control" type="text" placeholder="Enter Job Role" />
            <span  className="text-danger"></span>
        </div>

    </div>
    <div className="form-group has-success">
        <label className="control-label col-sm-2" >Available Seats</label>
        <div className="col-sm-8">
            <input  className="form-control" type="number" placeholder="Enter Available Seats" />

            <span  className="text-danger"></span>
        </div>

    </div>
<br></br>
        <div className="row">

            <div className="col-sm-6">
                <div className="form-group has-success">
                    <input className="btn btn-success" type="submit" value="Submit" />
                </div>
            </div>


            <div className="col-sm-6">
                <div className="form-group has-success">
                    <a  className="btn btn-dark" >Back</a>
                </div>
            </div>


        </div>
</form>
</div>
        </div>
        </div>
        </div>



        );
    }
}

export default Job;