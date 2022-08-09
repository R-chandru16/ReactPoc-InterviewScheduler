import React, { Component } from 'react';
import { Routes } from 'react-router-dom';
import Sidebar from '../Sidebar';
import '../Dashboard.css';


class Candidate extends Component {

render() {
return (
    <div class="row">
        <div class="side">
        <Sidebar />
        </div>
        <div class="main">
<div class="row" className="mb-2 pageheading">
    
  <br></br>
<h3><strong>HR Candidate</strong></h3>
<br></br>

<div class="home-content">
        <div class="overview-boxes">
            <div class="box">
                <div class="right-side">
                    <div class="box-topic">Total Candidates</div>
                    <div class="number">9</div>
                    
                </div>
                <i class='bx bx-cart-alt cart'>
                    <i class="bi bi-person-circle"></i>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                </i>
            </div>
            <div class="box">
                <div class="right-side">
                    <div class="box-topic">Interviews Scheduled</div>
                    <div class="number">5</div>
                   
                </div>
                <i class='bx bx-cart cart three'>
                    <i class="bi bi-file-person"></i>


                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    </svg>
                </i>
            </div>
            <div class="box">
                <div class="right-side">
                    <div class="box-topic">Interviews Done</div>
                    <div class="number">3</div>
                   
                </div>
                <i class='bx bxs-cart-add cart two'>


                    <i class="bi bi-check-lg"></i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                    </svg>

                </i>
            </div>
            <div class="box">
                <div class="right-side">
                    <div class="box-topic">Pending Interviews</div>
                    <div class="number">2</div>
                  
                </div>
                <i class='bx bxs-cart-download cart four'>
                    <i class="bi bi-hourglass-split"></i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16">
                        <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                    </svg>
                </i>
            </div>
        </div>
      </div>

      <br />
    <p align="justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros,
        pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus.
        Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex,
        in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent
        per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut
        vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.
        Integer eu nibh at nisi ullamcorper sagittis id vel leo. Integer feugiat
        faucibus libero, at maximus nisl suscipit posuere. Morbi nec enim nunc.
        Phasellus bibendum turpis ut ipsum egestas, sed sollicitudin elit convallis.
        Cras pharetra mi tristique sapien vestibulum lobortis. Nam eget bibendum metus,
        non dictum mauris. Nulla at tellus sagittis, viverra est a, bibendum metus.
    </p>

</div>
</div>
</div>
);
}
}
export default Candidate;