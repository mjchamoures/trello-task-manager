import React, { Component } from 'react';
import TaskManager from './TaskManager.js';
import './App.css';

class App extends Component {
  render() {

    var statusPanels = [
      {
        id : 0,
        title : "To Do",
        statusId : 0
      },{
        id : 1,
        title : "In Progress",
        statusId : 1
      },{
        id : 2,
        title : "Done",
        statusId : 2
      }
    ];

    var projectId = 0;

    return (
      <div >
        <div className='container' style={{ width : '100%'}}>
          <div style={{"paddingTop": "4rem"}}>
            <TaskManager 
              statusPanels={statusPanels}
              projectId={projectId}
            />
          </div>
        </div>
      </div>  
    );
  }
}

export default App;
