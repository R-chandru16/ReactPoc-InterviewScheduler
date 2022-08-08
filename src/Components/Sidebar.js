import React, { Component } from 'react';
import './style.css';
import {NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser,FaUserAlt,FaMailBulk,FaLevelUpAlt } from "react-icons/fa";
class Sidebar extends Component {

render() {
return (
    <div class="area">
    <div class="s-layout">

<div class="s-layout__sidebar">
  <a class="s-sidebar__trigger" href="#0">
     <i class="fa fa-heart"></i>
  </a>

  <nav class="s-sidebar__nav">
     <ul>
       

      <li>
           <a class="s-sidebar__nav-link" href="#0">
              <i></i><em>candidate</em><FaUserAlt />
           </a>
        </li>

      <li>
           <a class="s-sidebar__nav-link" >
           
              <i></i><em><NavLink to="/register">Recruiter</NavLink></em><FaUserAlt />
           </a>
        </li>

      <li>
           <a class="s-sidebar__nav-link" href="#0">
              <i></i><em><NavLink to="/register">Panel</NavLink></em><FaUserAlt />
           </a>
        </li>
    

        <li>
           <a class="s-sidebar__nav-link" href="#0">
              <i></i><em>job</em><FaMailBulk />
           </a>
        </li>
        <li>
           <a class="s-sidebar__nav-link" href="#0">
              <i></i><em>Interview level</em><FaLevelUpAlt />
           </a>
        </li>
        <li>
           <a class="s-sidebar__nav-link" href="#0">
              <i></i><em>candidate Availability</em><FaLevelUpAlt />
           </a>
        </li>
        <li>
           <a class="s-sidebar__nav-link" href="#0">
              <i></i><em>schedule</em><FaUserAlt />
           </a>
        </li>

        <li>
           <a class="s-sidebar__nav-link" href="#0">
              <i></i><em>Interview status</em><FaUserAlt />
           </a>
        </li>
        <li>
           <a class="s-sidebar__nav-link" href="#0">
              <i></i><em>panel Availability</em><FaUserAlt />
           </a>
        </li>
     </ul>
  </nav>
</div>


<main class="s-layout__content">
  <h1>Full View, Please!</h1>
</main>
</div>
            </div>
            


);
}
}
export default Sidebar;