/* App.js - Main Project file
 * 
 * Author : Michael Chamoures
 * Date : 7/31/17
 */ 


import React, { Component } from 'react';
import TaskManager from './TaskManager.js';
import TaskManagerNavbar from './TaskManagerNavbar.js';


class App extends Component {
  render() {

    var taskPanels = [
      {
        id : 0,
        title : "To Do",
        panelId : 0
      },{
        id : 1,
        title : "In Progress",
        panelId : 1
      },{
        id : 2,
        title : "Done",
        panelId : 2
      }
    ];

    var projectId = 0;

    return (
      <div >
        <div className='container' style={{ width : '100%'}}>
          <div style={{"paddingTop": "1rem"}}>
            <TaskManagerNavbar />
            <TaskManager 
              taskPanels={taskPanels}
              projectId={projectId}
            />
          </div>
        </div>
      </div>  
    );
  }
}

export default App;
